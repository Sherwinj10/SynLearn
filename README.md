---
title: SynLearn
emoji: 🧬
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
---

# SynLearn V2

SynLearn is an AI-powered diagnostic tool for identifying craniofacial syndromes. 

This repository contains both the **Next.js Frontend** and the **FastAPI Backend (Random Forest Model)** built into a single Docker container for seamless deployment on Hugging Face Spaces.

## Architecture
- **Frontend**: Next.js 14, Framer Motion, accessible via port 7860.
- **Backend**: FastAPI, `uvicorn`, scikit-learn, exposes local port 8000.
- **AI Model**: Pre-trained Random Forest model for syndrome prediction.

## Local Development
Requires Node JS and Python 3.

**⚠️ Important Setup Step:** 
The pre-trained Random Forest model (`syndlearn_model.pkl`) is 125MB and is hosted in GitHub Releases to keep the repository lightning fast. 
**Before running the backend, you must:**
1. Go to the [Releases](../../releases) tab on the right side of the GitHub repository page.
2. Download the `syndlearn_model.pkl` file attached to the latest release.
3. Place the file directly inside the `backend/` directory.

```bash
# Start Backend (Make sure syndlearn_model.pkl is inside the folder!)
cd backend
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000

# Start Frontend
cd frontend
npm install
npm run dev
```
