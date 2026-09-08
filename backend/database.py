import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import logging

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

logger = logging.getLogger("nexora_db")

MONGODB_URL = os.getenv(
    "MONGODB_URL",
    "mongodb+srv://aparnasolanki2466_db_user:j9VFWubZro23x7Uu@cluster0.umugm92.mongodb.net/?appName=Cluster0"
)
DB_NAME = os.getenv("DB_NAME", "nexora_db")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    """Establish async connection to MongoDB Atlas."""
    try:
        logger.info(f"Connecting to MongoDB Atlas database: {DB_NAME}...")
        db_instance.client = AsyncIOMotorClient(
            MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=5000
        )
        db_instance.db = db_instance.client[DB_NAME]
        # Verify connection
        await db_instance.client.admin.command('ping')
        logger.info("[SUCCESS] Connected to MongoDB Atlas successfully.")
        
        # Ensure indexes
        await init_indexes()
    except Exception as e:
        logger.error(f"[ERROR] Failed to connect to MongoDB: {e}")
        pass

async def close_mongo_connection():
    """Close MongoDB connection gracefully."""
    if db_instance.client is not None:
        logger.info("Closing MongoDB connection...")
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_db():
    """Return database instance."""
    return db_instance.db

def get_collection(collection_name: str):
    """Return specific MongoDB collection."""
    if db_instance.db is None:
        return None
    return db_instance.db[collection_name]

async def init_indexes():
    """Create essential MongoDB indexes."""
    if db_instance.db is None:
        return
    try:
        # Opportunities indexes
        opps = db_instance.db["opportunities"]
        await opps.create_index("id", unique=True)
        await opps.create_index("category")
        await opps.create_index("targetCareerIds")
        
        # Applications indexes
        apps = db_instance.db["applications"]
        await apps.create_index("id", unique=True)
        await apps.create_index("opportunityId")
        
        # Weekly plan indexes
        weekly = db_instance.db["weekly_plan"]
        await weekly.create_index("id", unique=True)
        
        # Personas indexes
        personas = db_instance.db["personas"]
        await personas.create_index("id", unique=True)

        logger.info("[SUCCESS] MongoDB indexes initialized successfully.")
    except Exception as e:
        logger.warning(f"[NOTICE] Index initialization: {e}")
