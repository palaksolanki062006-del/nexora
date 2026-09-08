from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SkillItem(BaseModel):
    name: str
    level: str = "Intermediate"
    score: int = 75

class ExperienceItem(BaseModel):
    title: str
    organization: str
    period: str
    type: str = "Internship"
    description: str = ""

class PrimaryFinancialGoal(BaseModel):
    title: str = "Higher Education / Master's Prep Fund"
    targetAmount: float = 150000
    currentAmount: float = 42000
    monthlyContribution: float = 4000
    targetDate: str = "2027-06-30"

class EmergencyFundGoal(BaseModel):
    targetAmount: float = 30000
    currentAmount: float = 18000

class FinancialGoals(BaseModel):
    enabled: bool = True
    monthlyIncome: float = 12000
    monthlyExpenses: float = 7000
    monthlySavings: float = 5000
    primaryGoal: Optional[PrimaryFinancialGoal] = None
    emergencyFund: Optional[EmergencyFundGoal] = None

class Preferences(BaseModel):
    income: int = 75
    stability: int = 85
    impact: int = 95
    flexibility: int = 60
    learning: int = 90
    entrepreneurship: int = 40
    workLifeBalance: int = 70

class UserProfile(BaseModel):
    id: str
    name: str
    avatar: Optional[str] = None
    college: str = ""
    degree: str = ""
    year: str = ""
    academicGpa: str = ""
    bio: str = ""
    availableHours: int = 10
    preferredLocation: str = ""
    remoteOnly: bool = False
    timeline: str = "Next 6-12 Months"
    skills: List[SkillItem] = []
    experience: List[ExperienceItem] = []
    targetCareers: List[str] = []
    preferences: Preferences = Field(default_factory=Preferences)
    financialGoals: FinancialGoals = Field(default_factory=FinancialGoals)

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    year: Optional[str] = None
    academicGpa: Optional[str] = None
    bio: Optional[str] = None
    availableHours: Optional[int] = None
    preferredLocation: Optional[str] = None
    remoteOnly: Optional[bool] = None
    timeline: Optional[str] = None
    skills: Optional[List[SkillItem]] = None
    experience: Optional[List[ExperienceItem]] = None
    targetCareers: Optional[List[str]] = None
    preferences: Optional[Preferences] = None
    financialGoals: Optional[FinancialGoals] = None
