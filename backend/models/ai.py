from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class ChatAction(BaseModel):
    label: str
    actionType: str  # navigate, addToWeekly, markApplied, openModal
    payload: Optional[Dict[str, Any]] = None

class ChatMessage(BaseModel):
    id: Optional[str] = None
    sender: str  # user, ai
    text: str
    time: Optional[str] = None
    suggestions: Optional[List[str]] = []
    actions: Optional[List[ChatAction]] = []

class ChatRequest(BaseModel):
    message: str
    personaId: Optional[str] = "persona-aarav"
    currentScreen: Optional[str] = "dashboard"
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    suggestions: List[str] = []
    actions: List[ChatAction] = []
