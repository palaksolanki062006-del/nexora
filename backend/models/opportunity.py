from typing import List, Optional
from pydantic import BaseModel, Field

class Opportunity(BaseModel):
    id: str
    title: str
    organization: str
    category: str = "Internships"
    type: str = "Internship"
    matchScore: int = 85
    deadline: str
    daysLeft: int = 14
    location: str = "Delhi NCR"
    isRemote: bool = False
    stipend: str = "Competitive"
    verifiedSource: bool = True
    sourceUrl: str = "https://example.com"
    tags: List[str] = []
    targetCareerIds: List[str] = []
    eligibility: str = ""
    description: str = ""
    requiredSkills: List[str] = []
    documentsRequired: List[str] = []
    estimatedTimeMinutes: int = 30
    whyRecommended: str = ""
    expectedValue: str = ""
    skillMatchPercent: int = 80
    careerAlignmentPercent: int = 85
    eligibilityPercent: int = 90
    timeFeasibilityPercent: int = 85
    opportunityQualityPercent: int = 90

class OpportunityRejectRequest(BaseModel):
    opportunityId: str
    reason: Optional[str] = ""

class OpportunityFilterQuery(BaseModel):
    category: Optional[str] = None
    targetCareer: Optional[str] = None
    isRemote: Optional[bool] = None
    search: Optional[str] = None
    minScore: Optional[int] = None
