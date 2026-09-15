from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
try:
    from backend.database import get_collection
    from backend.models.profile import UserProfile, UserProfileUpdate
except ModuleNotFoundError:
    from database import get_collection
    from models.profile import UserProfile, UserProfileUpdate
import logging


router = APIRouter(prefix="/api/profiles", tags=["Profiles"])
logger = logging.getLogger("nexora_profiles")

# In-memory fallback if Mongo is connecting
ACTIVE_PERSONA_ID = "persona-aarav"

@router.get("/presets", response_model=List[UserProfile])
async def list_persona_presets():
    """Retrieve all available persona presets."""
    col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    cursor = col.find({}, {"_id": 0})
    personas = await cursor.to_list(length=10)
    return personas

@router.get("/current", response_model=UserProfile)
async def get_current_profile(persona_id: Optional[str] = Query(None)):
    """Retrieve the currently selected user profile."""
    col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    target_id = persona_id or ACTIVE_PERSONA_ID
    profile = await col.find_one({"id": target_id}, {"_id": 0})
    if not profile:
        # Fallback to first available persona
        profile = await col.find_one({}, {"_id": 0})
        if not profile:
            raise HTTPException(status_code=404, detail="No profile found")
    return profile

@router.get("/{persona_id}", response_model=UserProfile)
async def get_profile_by_id(persona_id: str):
    """Retrieve a specific profile by ID."""
    col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    profile = await col.find_one({"id": persona_id}, {"_id": 0})
    if not profile:
        raise HTTPException(status_code=404, detail=f"Profile with id '{persona_id}' not found")
    return profile

@router.put("/{persona_id}", response_model=UserProfile)
async def update_profile(persona_id: str, updates: UserProfileUpdate):
    """Update profile attributes and persist changes to MongoDB."""
    col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    update_dict = updates.model_dump(exclude_unset=True)
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = await col.update_one({"id": persona_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")

    updated_profile = await col.find_one({"id": persona_id}, {"_id": 0})
    return updated_profile

@router.post("/switch/{persona_id}", response_model=UserProfile)
async def switch_persona(persona_id: str):
    """Set the active persona."""
    global ACTIVE_PERSONA_ID
    col = get_collection("personas")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    profile = await col.find_one({"id": persona_id}, {"_id": 0})
    if not profile:
        raise HTTPException(status_code=404, detail=f"Persona '{persona_id}' not found")

    ACTIVE_PERSONA_ID = persona_id
    return profile
