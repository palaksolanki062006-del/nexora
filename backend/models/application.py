from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class Application(BaseModel):
    id: str
    opportunityId: str
    organization: str
    position: str
    stage: str = "Saved"  # Saved, Considering, Applied, Assessment, Interview, Selected, Rejected, Withdrawn
    deadline: str = ""
    appliedDate: Optional[str] = None
    interviewDate: Optional[str] = None
    notes: str = ""
    matchScore: int = 85
    documents: List[str] = []
    created_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ApplicationCreate(BaseModel):
    opportunityId: str
    organization: str
    position: str
    stage: str = "Saved"
    deadline: str = ""
    matchScore: int = 85
    notes: Optional[str] = ""
    documents: Optional[List[str]] = []

class ApplicationStageUpdate(BaseModel):
    stage: str
    appliedDate: Optional[str] = None
    interviewDate: Optional[str] = None

class ApplicationNotesUpdate(BaseModel):
    notes: str
