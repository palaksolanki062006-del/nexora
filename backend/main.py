import os
import sys
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Ensure project root and backend dir are in sys.path for all environments
_current_dir = os.path.dirname(os.path.abspath(__file__))
_parent_dir = os.path.dirname(_current_dir)
for p in [_parent_dir, _current_dir]:
    if p not in sys.path:
        sys.path.insert(0, p)

# Load env variables
load_dotenv(os.path.join(_current_dir, ".env"))
load_dotenv(os.path.join(_parent_dir, ".env"))

# Import database & seed helpers
try:
    from backend.database import connect_to_mongo, close_mongo_connection, get_db
    from backend.seed_data import seed_database_if_empty
    from backend.routes.profiles import router as profiles_router
    from backend.routes.opportunities import router as opportunities_router
    from backend.routes.applications import router as applications_router
    from backend.routes.weekly_plan import router as weekly_plan_router
    from backend.routes.careers import router as careers_router
    from backend.routes.notifications import router as notifications_router
    from backend.routes.billing import router as billing_router
    from backend.routes.ai_assistant import router as ai_router
    from backend.routes.admin import router as admin_router
except ModuleNotFoundError:
    from database import connect_to_mongo, close_mongo_connection, get_db
    from seed_data import seed_database_if_empty
    from routes.profiles import router as profiles_router
    from routes.opportunities import router as opportunities_router
    from routes.applications import router as applications_router
    from routes.weekly_plan import router as weekly_plan_router
    from routes.careers import router as careers_router
    from routes.notifications import router as notifications_router
    from routes.billing import router as billing_router
    from routes.ai_assistant import router as ai_router
    from routes.admin import router as admin_router


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("nexora_main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown events."""
    logger.info("[STARTUP] Starting Nexora Backend Server...")
    await connect_to_mongo()
    await seed_database_if_empty()
    yield
    logger.info("[SHUTDOWN] Shutting down Nexora Backend Server...")
    await close_mongo_connection()

app = FastAPI(
    title="NEXORA AI Backend API",
    description="High-performance FastAPI backend with MongoDB Atlas for Nexora AI Career & Opportunity Navigator",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
cors_origins_env = os.getenv("CORS_ORIGINS", "*")
origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
if not origins or "*" in origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(profiles_router)
app.include_router(opportunities_router)
app.include_router(applications_router)
app.include_router(weekly_plan_router)
app.include_router(careers_router)
app.include_router(notifications_router)
app.include_router(billing_router)
app.include_router(ai_router)
app.include_router(admin_router)

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint to verify backend and MongoDB connection."""
    db = get_db()
    mongo_status = "connected" if db is not None else "disconnected"
    return {
        "status": "healthy",
        "service": "Nexora AI Backend API",
        "database": mongo_status,
        "framework": "FastAPI",
        "version": "1.0.0"
    }

@app.get("/", tags=["Health"])
async def root():
    """API welcome endpoint."""
    return {
        "message": "Welcome to Nexora AI Opportunity & Career Navigator API",
        "docs": "/docs",
        "health": "/health"
    }
