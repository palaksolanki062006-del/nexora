from typing import Optional
from pydantic import BaseModel

class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    timestamp: str = "Just now"
    read: bool = False
    type: str = "info"  # urgent, info, success, warning
    actionTarget: Optional[str] = "dashboard"
    targetId: Optional[str] = None

class NotificationReadUpdate(BaseModel):
    read: bool = True
