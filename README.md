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

```bash
# Start Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000

# Start Frontend
cd frontend
npm install
npm run dev
```
