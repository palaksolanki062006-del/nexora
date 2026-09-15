from fastapi import APIRouter, HTTPException
try:
    from backend.database import get_collection
    from backend.models.ai import ChatRequest, ChatResponse, ChatAction
except ModuleNotFoundError:
    from database import get_collection
    from models.ai import ChatRequest, ChatResponse, ChatAction
import logging


router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])
logger = logging.getLogger("nexora_ai")

@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(req: ChatRequest):
    """Context-aware AI reasoning engine providing tailored advice and navigational actions."""
    personas_col = get_collection("personas")
    opps_col = get_collection("opportunities")
    apps_col = get_collection("applications")

    profile = None
    if personas_col is not None:
        profile = await personas_col.find_one({"id": req.personaId or "persona-aarav"}, {"_id": 0})
    if not profile:
        profile = {
            "name": "User",
            "degree": "Economics & Public Policy",
            "year": "3rd Year",
            "availableHours": 10,
            "skills": [{"name": "Policy Analysis", "score": 90}],
            "targetCareers": ["policy-analyst", "rbi-grade-b"]
        }

    top_opp = None
    if opps_col is not None:
        top_opp = await opps_col.find_one({}, {"_id": 0})
    if not top_opp:
        top_opp = {
            "id": "opp-001",
            "title": "Policy Research Fellowship",
            "organization": "Centre for Policy Research (CPR)",
            "matchScore": 94,
            "deadline": "2026-08-28",
            "daysLeft": 4,
            "estimatedTimeMinutes": 25
        }

    apps_count = 0
    if apps_col is not None:
        apps_count = await apps_col.count_documents({})

    query = req.message.lower()
    first_name = profile.get("name", "there").split(" ")[0]

    # Rule-based dynamic reasoning based on context
    if any(w in query for w in ["focus", "what should i do", "next", "priority"]):
        reply = (
            f"Based on your profile as a **{profile.get('year', 'Final Year')} {profile.get('degree', 'Student')}** "
            f"with **{profile.get('availableHours', 10)}h/week** capacity, your highest-ROI move right now is:\n\n"
            f"1. **{top_opp.get('title')}** ({top_opp.get('matchScore')}% Match) at **{top_opp.get('organization')}**.\n"
            f"   *Deadline: {top_opp.get('deadline')} ({top_opp.get('daysLeft', 4)} days remaining)*\n"
            f"2. Complete your 2-hour high-leverage skill module to close your econometrics/data gap.\n"
            f"3. Keep your weekly study time under {profile.get('availableHours', 10)} hours to maintain consistent pace."
        )
        actions = [
            ChatAction(label="View Next Best Action", actionType="navigate", payload={"screen": "next-best-action"}),
            ChatAction(label="Add to Weekly Plan", actionType="addToWeekly", payload={"opportunityId": top_opp.get("id")})
        ]
        suggestions = ["Why did you recommend this fellowship?", "Build my weekly plan", "Compare RBI Grade B vs UPSC"]

    elif any(w in query for w in ["why", "recommend", "how did you pick"]):
        target_str = ", ".join([c.replace("-", " ").title() for c in profile.get("targetCareers", [])])
        skills_str = " & ".join([s.get("name") for s in profile.get("skills", [])[:2]])
        reply = (
            f"I prioritized **{top_opp.get('title')}** at **{top_opp.get('organization')}** for 3 key reasons:\n\n"
            f"- **Career Alignment (96%)**: Aligns directly with your target goals in *{target_str}*.\n"
            f"- **Skill Proof (92%)**: Leverages your strengths in {skills_str} while giving you an official publication credential.\n"
            f"- **Urgency & Feasibility**: Closes in **{top_opp.get('daysLeft', 4)} days**, requiring only ~{top_opp.get('estimatedTimeMinutes', 25)} minutes to submit."
        )
        actions = [
            ChatAction(label="Open Opportunity Explorer", actionType="navigate", payload={"screen": "opportunities"})
        ]
        suggestions = ["What skills am I missing?", "What should I focus on this month?"]

    elif any(w in query for w in ["skill", "missing", "gap"]):
        top_skills = [s.get("name") for s in profile.get("skills", []) if s.get("score", 0) >= 75]
        reply = (
            f"Analyzing your current profile vs target career requirements:\n\n"
            f"✅ **Verified Strengths**: {', '.join(top_skills)}.\n"
            f"⚠️ **Primary Qualification Gap**: **Stata / Empirical Econometric Modeling** and **Timed Speed Quantitative Aptitude**.\n\n"
            f"*Recommendation*: Enroll in the 4-week ISI Econometrics sprint or solve 1 previous year paper this weekend."
        )
        actions = [
            ChatAction(label="View ISI Course in Explorer", actionType="navigate", payload={"screen": "opportunities"})
        ]
        suggestions = ["Build my weekly plan", "Compare RBI Grade B vs UPSC"]

    elif any(w in query for w in ["compare", "rbi", "upsc", "mba"]):
        reply = (
            f"Comparing **RBI Grade B** vs **UPSC Civil Services** for your profile:\n\n"
            f"- **RBI Grade B (89% Fit)**: 800-1,200 hrs prep effort, ₹18L-24L CTC, 5/5 job stability, strong synergy with your economics syllabus.\n"
            f"- **UPSC (82% Fit)**: 2,500+ hrs prep over 2-3 years, extreme competition (<0.2% pass rate), high opportunity cost.\n\n"
            f"*Nexora Verdict*: RBI Grade B currently offers higher immediate feasibility given your 6-12 month timeline."
        )
        actions = [
            ChatAction(label="Open Side-by-Side Comparison Matrix", actionType="navigate", payload={"screen": "career-compare"})
        ]
        suggestions = ["What should I do this month?", "Why did you recommend this fellowship?"]

    elif any(w in query for w in ["rebuild", "weekly plan", "schedule"]):
        reply = (
            f"I have recalculated your weekly schedule against your **{profile.get('availableHours', 10)} available hours**. "
            f"I balanced 1 urgent application, 1 skill diagnostic module, 1 career experiment, and 1 finance savings habit."
        )
        actions = [
            ChatAction(label="Apply Rebuilt Plan", actionType="rebuildWeekly", payload={})
        ]
        suggestions = ["View my applications tracker", "What should I focus on next?"]

    else:
        reply = (
            f"I've analyzed your profile and active tracker ({apps_count} applications). "
            f"For your target in **{profile.get('degree', 'Higher Studies')}**, staying disciplined with high-match deadlines "
            f"is your optimal path. How else can I guide you?"
        )
        actions = [
            ChatAction(label="Explore Opportunities", actionType="navigate", payload={"screen": "opportunities"})
        ]
        suggestions = ["What should I focus on this month?", "Why did you recommend this fellowship?", "What skills am I missing?"]

    return ChatResponse(reply=reply, suggestions=suggestions, actions=actions)
