import uvicorn
import os
import sys

# Ensure project root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"Starting Nexora FastAPI Server on http://localhost:{port} ...")
    uvicorn.run("backend.main:app", host=host, port=port, reload=True)
