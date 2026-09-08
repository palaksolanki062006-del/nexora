from typing import Optional
from pydantic import BaseModel, Field

class WeeklyTask(BaseModel):
    id: str
    type: str = "TOP PRIORITY"  # TOP PRIORITY, SKILL, CAREER, FINANCE, DEADLINE
    categoryBadge: str = "Application"
    title: str
    deadline: str = ""
    estimatedHours: float = 1.5
    completed: bool = False
    opportunityId: Optional[str] = None
    tagline: str = ""
    priorityRank: int = 1

class WeeklyTaskCreate(BaseModel):
    type: str = "TOP PRIORITY"
    categoryBadge: str = "Application"
    title: str
    deadline: str = ""
    estimatedHours: float = 1.5
    opportunityId: Optional[str] = None
    tagline: str = ""
    priorityRank: Optional[int] = None

class WeeklyTaskUpdate(BaseModel):
    title: Optional[str] = None
    deadline: Optional[str] = None
    completed: Optional[bool] = None
    estimatedHours: Optional[float] = None
    tagline: Optional[str] = None
    priorityRank: Optional[int] = None
