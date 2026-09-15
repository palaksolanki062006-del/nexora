from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
import time
try:
    from backend.database import get_collection
    from backend.models.application import (
        Application,
        ApplicationCreate,
        ApplicationStageUpdate,
        ApplicationNotesUpdate
    )
except ModuleNotFoundError:
    from database import get_collection
    from models.application import (
        Application,
        ApplicationCreate,
        ApplicationStageUpdate,
        ApplicationNotesUpdate
    )
import logging


router = APIRouter(prefix="/api/applications", tags=["Applications"])
logger = logging.getLogger("nexora_applications")

@router.get("", response_model=List[Application])
async def get_applications(stage: Optional[str] = Query(None)):
    """Retrieve all job/fellowship/internship applications."""
    col = get_collection("applications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    query = {}
    if stage and stage.lower() != "all":
        query["stage"] = stage

    cursor = col.find(query, {"_id": 0})
    apps = await cursor.to_list(length=200)
    return apps

@router.post("", response_model=Application)
async def create_application(payload: ApplicationCreate):
    """Add a new application to the tracker."""
    col = get_collection("applications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    existing = await col.find_one({"opportunityId": payload.opportunityId}, {"_id": 0})
    if existing:
        return existing

    app_id = f"app-{int(time.time() * 1000)}"
    now_iso = datetime.utcnow().isoformat()
    applied_date = now_iso.split("T")[0] if payload.stage == "Applied" else None

    new_app = {
        "id": app_id,
        "opportunityId": payload.opportunityId,
        "organization": payload.organization,
        "position": payload.position,
        "stage": payload.stage,
        "deadline": payload.deadline,
        "appliedDate": applied_date,
        "interviewDate": None,
        "notes": payload.notes or f"Added to tracker on {now_iso.split('T')[0]}",
        "matchScore": payload.matchScore,
        "documents": payload.documents or [],
        "created_at": now_iso,
        "updated_at": now_iso
    }

    await col.insert_one(new_app)
    created = await col.find_one({"id": app_id}, {"_id": 0})
    return created

@router.put("/{app_id}/stage", response_model=Application)
async def update_stage(app_id: str, payload: ApplicationStageUpdate):
    """Update stage transition for an application."""
    col = get_collection("applications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    now_iso = datetime.utcnow().isoformat()
    update_data = {
        "stage": payload.stage,
        "updated_at": now_iso
    }
    if payload.appliedDate:
        update_data["appliedDate"] = payload.appliedDate
    elif payload.stage == "Applied":
        update_data["appliedDate"] = now_iso.split("T")[0]

    if payload.interviewDate:
        update_data["interviewDate"] = payload.interviewDate

    result = await col.update_one({"id": app_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")

    updated = await col.find_one({"id": app_id}, {"_id": 0})
    return updated

@router.put("/{app_id}/notes", response_model=Application)
async def update_notes(app_id: str, payload: ApplicationNotesUpdate):
    """Update notes and preparation log for an application."""
    col = get_collection("applications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    now_iso = datetime.utcnow().isoformat()
    result = await col.update_one({"id": app_id}, {"$set": {"notes": payload.notes, "updated_at": now_iso}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")

    updated = await col.find_one({"id": app_id}, {"_id": 0})
    return updated

@router.delete("/{app_id}")
async def delete_application(app_id: str):
    """Remove application from tracker."""
    col = get_collection("applications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    result = await col.delete_one({"id": app_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"status": "success", "message": "Application deleted"}
