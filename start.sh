#!/bin/bash

# Exit on error
set -e

echo "Starting SynLearn V2 Platform..."

# 1. Start FastAPI backend in the background
echo "-> Booting Backend (FastAPI)..."
cd $HOME/app/backend
# Bind to localhost internally
uvicorn main:app --host 127.0.0.1 --port 8000 &

# Wait a few seconds to let backend initialize
sleep 3

# 2. Start Next.js frontend in the foreground
echo "-> Booting Frontend (Next.js)..."
cd $HOME/app/frontend
# Bind to 0.0.0.0 on port 7860 to be accessible to Hugging Face ingress
export PORT=7860
export HOST=0.0.0.0
npm start
