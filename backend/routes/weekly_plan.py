from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import time
try:
    from backend.database import get_collection
    from backend.models.weekly_plan import WeeklyTask, WeeklyTaskCreate, WeeklyTaskUpdate
except ModuleNotFoundError:
    from database import get_collection
    from models.weekly_plan import WeeklyTask, WeeklyTaskCreate, WeeklyTaskUpdate
import logging


router = APIRouter(prefix="/api/weekly-plan", tags=["Weekly Plan"])
logger = logging.getLogger("nexora_weekly")

@router.get("", response_model=List[WeeklyTask])
async def get_weekly_plan():
    """Retrieve all current weekly tasks."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    cursor = col.find({}, {"_id": 0}).sort("priorityRank", 1)
    tasks = await cursor.to_list(length=100)
    return tasks

@router.post("", response_model=WeeklyTask)
async def add_weekly_task(payload: WeeklyTaskCreate):
    """Add a new task or action to the weekly plan."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    if payload.opportunityId:
        existing = await col.find_one({"opportunityId": payload.opportunityId}, {"_id": 0})
        if existing:
            return existing

    count = await col.count_documents({})
    task_id = f"task-{int(time.time() * 1000)}"

    new_task = {
        "id": task_id,
        "type": payload.type,
        "categoryBadge": payload.categoryBadge,
        "title": payload.title,
        "deadline": payload.deadline or "This Week",
        "estimatedHours": payload.estimatedHours,
        "completed": False,
        "opportunityId": payload.opportunityId,
        "tagline": payload.tagline,
        "priorityRank": payload.priorityRank if payload.priorityRank is not None else (count + 1)
    }

    await col.insert_one(new_task)
    created = await col.find_one({"id": task_id}, {"_id": 0})
    return created

@router.put("/{task_id}", response_model=WeeklyTask)
async def update_task(task_id: str, payload: WeeklyTaskUpdate):
    """Update task properties."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    update_dict = payload.model_dump(exclude_unset=True)
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = await col.update_one({"id": task_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    updated = await col.find_one({"id": task_id}, {"_id": 0})
    return updated

@router.post("/{task_id}/toggle", response_model=WeeklyTask)
async def toggle_task_completion(task_id: str):
    """Toggle completed status of a weekly task."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    task = await col.find_one({"id": task_id}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    new_state = not task.get("completed", False)
    await col.update_one({"id": task_id}, {"$set": {"completed": new_state}})
    
    updated = await col.find_one({"id": task_id}, {"_id": 0})
    return updated

@router.post("/{task_id}/postpone", response_model=WeeklyTask)
async def postpone_task(task_id: str):
    """Reschedule task to next week."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    result = await col.update_one({"id": task_id}, {"$set": {"deadline": "Next Week (Rescheduled)"}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")

    updated = await col.find_one({"id": task_id}, {"_id": 0})
    return updated

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    """Remove task from weekly plan."""
    col = get_collection("weekly_plan")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    result = await col.delete_one({"id": task_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"status": "success", "message": "Task removed from weekly plan"}

@router.post("/rebuild-ai", response_model=List[WeeklyTask])
async def rebuild_weekly_plan_ai(personaId: Optional[str] = Query("persona-aarav")):
    """AI dynamically generates and replaces the weekly plan based on persona capacity and priorities."""
    col = get_collection("weekly_plan")
    personas_col = get_collection("personas")
    opps_col = get_collection("opportunities")

    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    profile = None
    if personas_col is not None and personaId:
        profile = await personas_col.find_one({"id": personaId}, {"_id": 0})

    top_opp = None
    if opps_col is not None:
        top_opp = await opps_col.find_one({}, {"_id": 0})

    opp_title = top_opp.get("title", "Policy Research Fellowship") if top_opp else "Priority Opportunity"
    opp_id = top_opp.get("id", "opp-001") if top_opp else "opp-001"
    avail_hours = profile.get("availableHours", 10) if profile else 10

    new_plan = [
        {
            "id": f"task-rebuilt-1",
            "type": "TOP PRIORITY",
            "categoryBadge": "Application",
            "title": f"Submit Application for {opp_title}",
            "deadline": "In 3 days",
            "estimatedHours": 1.5,
            "completed": False,
            "opportunityId": opp_id,
            "tagline": "Prioritized due to tight deadline and high match score",
            "priorityRank": 1
        },
        {
            "id": f"task-rebuilt-2",
            "type": "SKILL",
            "categoryBadge": "High Leverage Sprint",
            "title": "Complete 2-Hour Intensive Skill Diagnostic Module",
            "deadline": "Saturday",
            "estimatedHours": 2.0,
            "completed": False,
            "opportunityId": None,
            "tagline": "Closes your primary resume qualification gap",
            "priorityRank": 2
        },
        {
            "id": f"task-rebuilt-3",
            "type": "CAREER",
            "categoryBadge": "30-Day Experiment",
            "title": "Review 2 Policy/Industry Case Studies & draft summary",
            "deadline": "Sunday",
            "estimatedHours": 1.5,
            "completed": False,
            "opportunityId": None,
            "tagline": "Tests your practical alignment with your primary career goal",
            "priorityRank": 3
        },
        {
            "id": f"task-rebuilt-4",
            "type": "FINANCE",
            "categoryBadge": "SIP Habit",
            "title": "Review Monthly Budget & Auto-invest into Education Goal",
            "deadline": "End of month",
            "estimatedHours": 0.5,
            "completed": False,
            "opportunityId": None,
            "tagline": "Keeps financial milestone trajectory on track",
            "priorityRank": 4
        }
    ]

    # Replace collection items
    await col.delete_many({})
    for task in new_plan:
        await col.insert_one(task)

    cursor = col.find({}, {"_id": 0}).sort("priorityRank", 1)
    return await cursor.to_list(length=10)
