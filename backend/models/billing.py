from typing import Optional
from pydantic import BaseModel

class InvoiceItem(BaseModel):
    id: str
    date: str
    plan: str
    amount: str
    status: str = "Paid"
    downloadUrl: str = "#invoice-pdf"

class SubscriptionUpgradeRequest(BaseModel):
    planName: str = "Nexora Pro (Annual)"
    billingCycle: str = "Annual"

class SubscriptionStatus(BaseModel):
    isProUser: bool
    plan: str = "Nexora Free"
    activeUntil: Optional[str] = None
