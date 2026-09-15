import asyncio
import sys
import os

# Set UTF-8 encoding for Windows standard output
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from backend.database import connect_to_mongo, get_db, close_mongo_connection
    from backend.seed_data import seed_database_if_empty
except ModuleNotFoundError:
    from database import connect_to_mongo, get_db, close_mongo_connection
    from seed_data import seed_database_if_empty


async def test_mongo():
    print("Connecting to MongoDB Atlas...")
    await connect_to_mongo()
    db = get_db()
    if db is None:
        print("[ERROR] Could not get database instance.")
        return False
    
    print("[SUCCESS] Connected to MongoDB Atlas! Now seeding database...")
    await seed_database_if_empty()
    
    collections = await db.list_collection_names()
    print("[SUCCESS] MongoDB Collections found:", collections)
    
    opp_count = await db["opportunities"].count_documents({})
    user_count = await db["personas"].count_documents({})
    app_count = await db["applications"].count_documents({})
    weekly_count = await db["weekly_plan"].count_documents({})
    career_count = await db["careers"].count_documents({})
    
    print("Database Statistics in MongoDB Atlas:")
    print(f"   * Personas: {user_count}")
    print(f"   * Opportunities: {opp_count}")
    print(f"   * Applications: {app_count}")
    print(f"   * Weekly Tasks: {weekly_count}")
    print(f"   * Career Paths: {career_count}")
    
    await close_mongo_connection()
    return True

if __name__ == "__main__":
    asyncio.run(test_mongo())
