from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.database import get_collection
from backend.models.career import CareerPath, CareerComparisonRequest
import logging

router = APIRouter(prefix="/api/careers", tags=["Careers"])
logger = logging.getLogger("nexora_careers")

@router.get("", response_model=List[CareerPath])
async def list_career_paths():
    """Retrieve all available career paths with trajectories and experiments."""
    col = get_collection("careers")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    cursor = col.find({}, {"_id": 0})
    careers = await cursor.to_list(length=50)
    return careers

@router.get("/{career_id}", response_model=CareerPath)
async def get_career_path(career_id: str):
    """Retrieve specific career path roadmap by ID."""
    col = get_collection("careers")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    career = await col.find_one({"id": career_id}, {"_id": 0})
    if not career:
        raise HTTPException(status_code=404, detail=f"Career path '{career_id}' not found")
    return career

@router.post("/compare", response_model=List[CareerPath])
async def compare_careers(payload: CareerComparisonRequest):
    """Retrieve multi-career matrix dataset for side-by-side comparison."""
    col = get_collection("careers")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    cursor = col.find({"id": {"$in": payload.careerIds}}, {"_id": 0})
    careers = await cursor.to_list(length=10)
    return careers
