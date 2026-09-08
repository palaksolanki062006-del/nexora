from typing import List, Optional
from pydantic import BaseModel

class CareerExperiment(BaseModel):
    title: str
    description: str
    timeNeeded: str
    impact: str

class CareerPath(BaseModel):
    id: str
    title: str
    category: str
    icon: str
    tagline: str
    fitScore: int = 85
    eligibility: str = ""
    skillsRequired: List[str] = []
    prepEffort: str = ""
    timeline: str = ""
    startingSalary: str = ""
    careerCeiling: str = ""
    cost: str = ""
    opportunityCost: str = ""
    stability: int = 4
    flexibility: int = 4
    trajectory: str = ""
    whyAligned: str = ""
    skillGap: List[str] = []
    recommendedExperiments: List[CareerExperiment] = []

class CareerComparisonRequest(BaseModel):
    careerIds: List[str]
