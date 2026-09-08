from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.database import get_collection
from backend.models.opportunity import Opportunity, OpportunityRejectRequest
import logging

router = APIRouter(prefix="/api/opportunities", tags=["Opportunities"])
logger = logging.getLogger("nexora_opportunities")

def calculate_dynamic_match_score(opp: dict, user_profile: dict) -> dict:
    """Calculate personalized multi-factor match score based on user skills, target careers, and preferences."""
    if not user_profile:
        return opp

    user_skills = [s.get("name", "").lower() for s in user_profile.get("skills", [])]
    required = opp.get("requiredSkills", [])
    
    # 1. Skill Match Weighting (35%)
    if required:
        matches = sum(1 for req in required if any(req.lower() in us or us in req.lower() for us in user_skills))
        skill_score = round((matches / len(required)) * 100)
    else:
        skill_score = 80

    # 2. Career Alignment Weighting (35%)
    user_careers = user_profile.get("targetCareers", [])
    target_opp_careers = opp.get("targetCareerIds", [])
    is_aligned = any(c in user_careers for c in target_opp_careers)
    career_score = 95 if is_aligned else 65

    # 3. Location / Remote Feasibility (15%)
    loc_score = 85
    user_remote = user_profile.get("remoteOnly", False)
    if user_remote and opp.get("isRemote", False):
        loc_score = 100
    elif user_remote and not opp.get("isRemote", False):
        loc_score = 40
    elif "delhi" in opp.get("location", "").lower() and "delhi" in user_profile.get("preferredLocation", "").lower():
        loc_score = 95

    # 4. Time Feasibility (15%)
    avail_hours = user_profile.get("availableHours", 10)
    time_score = 92 if avail_hours >= 10 else (80 if avail_hours >= 5 else 65)

    composite = min(99, round(
        (skill_score * 0.35) +
        (career_score * 0.35) +
        (loc_score * 0.15) +
        (time_score * 0.15)
    ))

    result = dict(opp)
    result["matchScore"] = composite
    result["skillMatchPercent"] = skill_score
    result["careerAlignmentPercent"] = career_score
    result["timeFeasibilityPercent"] = time_score
    return result

@router.get("", response_model=List[Opportunity])
async def get_opportunities(
    category: Optional[str] = Query(None),
    targetCareer: Optional[str] = Query(None),
    isRemote: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    personaId: Optional[str] = Query("persona-aarav"),
    minScore: Optional[int] = Query(None)
):
    """Retrieve filtered, searched, and personalized ranked opportunities."""
    col = get_collection("opportunities")
    personas_col = get_collection("personas")
    feedback_col = get_collection("rejected_opportunities")
    
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    # Fetch persona profile for dynamic score calculation
    user_profile = None
    if personaId and personas_col is not None:
        user_profile = await personas_col.find_one({"id": personaId}, {"_id": 0})

    # Fetch rejected opportunity IDs for this persona
    rejected_ids = set()
    if feedback_col is not None and personaId:
        rejected_cursor = feedback_col.find({"personaId": personaId}, {"_id": 0, "opportunityId": 1})
        async for doc in rejected_cursor:
            rejected_ids.add(doc.get("opportunityId"))

    query = {}
    if category and category.lower() != "all":
        query["category"] = category
    if targetCareer and targetCareer.lower() != "all":
        query["targetCareerIds"] = targetCareer
    if isRemote is not None:
        query["isRemote"] = isRemote
    if search and search.strip():
        term = search.strip()
        query["$or"] = [
            {"title": {"$regex": term, "$options": "i"}},
            {"organization": {"$regex": term, "$options": "i"}},
            {"tags": {"$regex": term, "$options": "i"}},
            {"description": {"$regex": term, "$options": "i"}}
        ]

    cursor = col.find(query, {"_id": 0})
    opps = await cursor.to_list(length=200)

    # Filter out rejected
    valid_opps = [o for o in opps if o.get("id") not in rejected_ids]

    # Re-calculate dynamic personalized scores
    scored_opps = [calculate_dynamic_match_score(o, user_profile) for o in valid_opps]

    if minScore is not None:
        scored_opps = [o for o in scored_opps if o.get("matchScore", 0) >= minScore]

    # Sort descending by matchScore
    scored_opps.sort(key=lambda x: x.get("matchScore", 0), reverse=True)
    return scored_opps

@router.get("/next-best-action", response_model=Opportunity)
async def get_next_best_action(personaId: Optional[str] = Query("persona-aarav")):
    """Get the #1 highest-ranked opportunity action for the current persona."""
    opps = await get_opportunities(personaId=personaId)
    if not opps:
        raise HTTPException(status_code=404, detail="No available recommendations found")
    return opps[0]

@router.get("/{opp_id}", response_model=Opportunity)
async def get_opportunity_by_id(opp_id: str, personaId: Optional[str] = Query(None)):
    """Retrieve details for a single opportunity."""
    col = get_collection("opportunities")
    personas_col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    opp = await col.find_one({"id": opp_id}, {"_id": 0})
    if not opp:
        raise HTTPException(status_code=404, detail=f"Opportunity '{opp_id}' not found")

    user_profile = None
    if personaId and personas_col is not None:
        user_profile = await personas_col.find_one({"id": personaId}, {"_id": 0})

    return calculate_dynamic_match_score(opp, user_profile)

@router.post("/reject")
async def mark_opportunity_not_relevant(payload: OpportunityRejectRequest, personaId: Optional[str] = Query("persona-aarav")):
    """Record that an opportunity is not relevant for the user to adapt AI recommendations."""
    col = get_collection("rejected_opportunities")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    record = {
        "personaId": personaId,
        "opportunityId": payload.opportunityId,
        "reason": payload.reason or ""
    }
    await col.update_one(
        {"personaId": personaId, "opportunityId": payload.opportunityId},
        {"$set": record},
        upsert=True
    )
    return {"status": "success", "message": "Opportunity marked as not relevant. Recommendation model updated."}
