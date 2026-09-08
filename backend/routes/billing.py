from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import random
from backend.database import get_collection
from backend.models.billing import InvoiceItem, SubscriptionUpgradeRequest, SubscriptionStatus
import logging

router = APIRouter(prefix="/api/billing", tags=["Billing & Pro Subscription"])
logger = logging.getLogger("nexora_billing")

# Pro subscription state (in a production system, this could also live in the user document)
PRO_STATE = {"isPro": True, "plan": "Nexora Pro (Annual)"}

@router.get("/status", response_model=SubscriptionStatus)
async def get_subscription_status():
    """Retrieve current subscription tier status."""
    return SubscriptionStatus(
        isProUser=PRO_STATE["isPro"],
        plan=PRO_STATE["plan"],
        activeUntil="2027-08-01" if PRO_STATE["isPro"] else None
    )

@router.get("/invoices", response_model=List[InvoiceItem])
async def list_invoices():
    """Retrieve all payment receipts and invoices."""
    col = get_collection("invoices")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    cursor = col.find({}, {"_id": 0})
    invoices = await cursor.to_list(length=50)
    return invoices

@router.post("/upgrade", response_model=InvoiceItem)
async def upgrade_to_pro(payload: SubscriptionUpgradeRequest):
    """Simulate upgrading to Nexora Pro plan and creating invoice in MongoDB."""
    col = get_collection("invoices")
    if col is None:
        raise HTTPException(status_code=503, detail="Database not available")

    PRO_STATE["isPro"] = True
    PRO_STATE["plan"] = payload.planName

    now = datetime.now()
    inv_id = f"INV-{now.year}-{random.randint(1000, 9999)}"
    inv_date = now.strftime("%d %b %Y")
    amount = "₹3,999" if "Annual" in payload.planName else "₹499"

    new_invoice = {
        "id": inv_id,
        "date": inv_date,
        "plan": payload.planName,
        "amount": amount,
        "status": "Paid",
        "downloadUrl": "#invoice-pdf"
    }

    await col.insert_one(new_invoice)
    created = await col.find_one({"id": inv_id}, {"_id": 0})
    return created

@router.post("/cancel")
async def cancel_pro():
    """Cancel Pro subscription."""
    PRO_STATE["isPro"] = False
    PRO_STATE["plan"] = "Nexora Free"
    return {"status": "success", "message": "Subscription downgraded to Free tier"}
