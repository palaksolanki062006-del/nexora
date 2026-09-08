import httpx
import sys

# Set UTF-8 encoding for Windows standard output
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

BASE_URL = "http://localhost:8000"

def test_api():
    print("Testing FastAPI endpoints against MongoDB...")
    with httpx.Client(base_url=BASE_URL, timeout=10.0) as client:
        # 1. Health
        res = client.get("/health")
        print(f"1. /health -> {res.status_code} : {res.json()}")
        assert res.status_code == 200, "Health check failed"

        # 2. Profiles Presets
        res = client.get("/api/profiles/presets")
        presets = res.json()
        print(f"2. /api/profiles/presets -> {res.status_code} : Found {len(presets)} personas ({[p['name'] for p in presets]})")
        assert res.status_code == 200 and len(presets) >= 3

        # 3. Opportunities
        res = client.get("/api/opportunities?personaId=persona-aarav")
        opps = res.json()
        print(f"3. /api/opportunities -> {res.status_code} : Retrieved {len(opps)} opportunities. Top action: '{opps[0]['title']}' ({opps[0]['matchScore']}% match)")
        assert res.status_code == 200 and len(opps) > 0

        # 4. Applications Tracker
        res = client.get("/api/applications")
        apps = res.json()
        print(f"4. /api/applications -> {res.status_code} : Retrieved {len(apps)} active applications")
        assert res.status_code == 200

        # 5. Weekly Plan
        res = client.get("/api/weekly-plan")
        tasks = res.json()
        print(f"5. /api/weekly-plan -> {res.status_code} : Retrieved {len(tasks)} weekly plan actions")
        assert res.status_code == 200

        # 6. Career Paths
        res = client.get("/api/careers")
        careers = res.json()
        print(f"6. /api/careers -> {res.status_code} : Retrieved {len(careers)} career paths")
        assert res.status_code == 200

        # 7. AI Chat Assistant
        res = client.post("/api/ai/chat", json={
            "message": "What should I focus on this week?",
            "personaId": "persona-aarav",
            "currentScreen": "dashboard"
        })
        ai_res = res.json()
        print(f"7. /api/ai/chat -> {res.status_code}")
        print(f"   AI Reply: {ai_res['reply'][:120]}...")
        print(f"   Actions: {[a['label'] for a in ai_res['actions']]}")
        assert res.status_code == 200

        # 8. Admin Metrics
        res = client.get("/api/admin/metrics")
        metrics = res.json()
        print(f"8. /api/admin/metrics -> {res.status_code} : {metrics}")
        assert res.status_code == 200

    print("\n[ALL TESTS PASSED] FastAPI + MongoDB backend is fully operational and healthy!")

if __name__ == "__main__":
    test_api()
