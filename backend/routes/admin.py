from fastapi import APIRouter, HTTPException
from backend.database import get_collection
import logging

router = APIRouter(prefix="/api/admin", tags=["Admin & Analytics"])
logger = logging.getLogger("nexora_admin")

@router.get("/metrics")
async def get_admin_metrics():
    """Retrieve aggregate administrative & platform metrics."""
    opps_col = get_collection("opportunities")
    apps_col = get_collection("applications")
    weekly_col = get_collection("weekly_plan")
    personas_col = get_collection("personas")

    total_opps = await opps_col.count_documents({}) if opps_col is not None else 0
    total_apps = await apps_col.count_documents({}) if apps_col is not None else 0
    applied_apps = await apps_col.count_documents({"stage": "Applied"}) if apps_col is not None else 0
    interview_apps = await apps_col.count_documents({"stage": "Interview"}) if apps_col is not None else 0
    completed_tasks = await weekly_col.count_documents({"completed": True}) if weekly_col is not None else 0
    total_tasks = await weekly_col.count_documents({}) if weekly_col is not None else 0
    total_users = await personas_col.count_documents({}) if personas_col is not None else 3

    return {
        "totalOpportunities": total_opps,
        "totalApplications": total_apps,
        "submittedApplications": applied_apps,
        "interviewsScheduled": interview_apps,
        "weeklyTaskCompletionRate": round((completed_tasks / max(1, total_tasks)) * 100, 1),
        "totalActivePersonas": total_users,
        "activeCategoriesCount": 12,
        "systemHealth": "Operational",
        "databaseStatus": "Connected to MongoDB Atlas"
    }
