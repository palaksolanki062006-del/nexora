from fastapi import APIRouter, HTTPException
from typing import List
try:
    from backend.database import get_collection
    from backend.models.notification import NotificationItem
except ModuleNotFoundError:
    from database import get_collection
    from models.notification import NotificationItem
import logging


router = APIRouter(prefix="/api/notifications", tags=["Notifications"])
logger = logging.getLogger("nexora_notifications")

@router.get("", response_model=List[NotificationItem])
async def get_notifications():
    """Retrieve all notifications for the user."""
    col = get_collection("notifications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    cursor = col.find({}, {"_id": 0})
    notifs = await cursor.to_list(length=50)
    return notifs

@router.post("/{notif_id}/read", response_model=NotificationItem)
async def mark_notification_as_read(notif_id: str):
    """Mark a notification as read."""
    col = get_collection("notifications")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    result = await col.update_one({"id": notif_id}, {"$set": {"read": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")

    updated = await col.find_one({"id": notif_id}, {"_id": 0})
    return updated

@router.get("/unread-count")
async def get_unread_count():
    """Get count of unread alerts."""
    col = get_collection("notifications")
    if col is None:
        return {"unread": 0}

    count = await col.count_documents({"read": False})
    return {"unread": count}
