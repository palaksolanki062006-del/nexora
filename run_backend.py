import uvicorn
import os
import sys

# Ensure project root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    reload = os.getenv("RELOAD", "false").lower() == "true"
    print(f"Starting Nexora FastAPI Server on {host}:{port} (reload={reload})...")
    uvicorn.run("backend.main:app", host=host, port=port, reload=reload)

