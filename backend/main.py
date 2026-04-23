from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import PredictRequest, PredictResponse, SyndromeMatch
from model import predict, FEATURES, CLASSES

app = FastAPI(
    title="SynLearn API",
    description="AI-powered craniofacial syndrome prediction backend",
    version="1.0.0",
)

# ── CORS — allow Next.js dev server ──────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://synlearn-frontend.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Health ────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "syndromes": len(CLASSES),
        "features": len(FEATURES),
    }


# ── Features list ─────────────────────────────────────────────────────────────
@app.get("/features")
def get_features():
    return {"features": FEATURES, "total": len(FEATURES)}


# ── Syndromes list ────────────────────────────────────────────────────────────
@app.get("/syndromes")
def get_syndromes():
    return {"syndromes": CLASSES, "total": len(CLASSES)}


# ── Predict ───────────────────────────────────────────────────────────────────
@app.post("/predict", response_model=PredictResponse)
def predict_endpoint(body: PredictRequest):
    if not body.features:
        raise HTTPException(status_code=400, detail="At least one feature must be provided.")

    # Validate feature names
    unknown = [k for k in body.features if k not in FEATURES]
    if unknown:
        raise HTTPException(
            status_code=422,
            detail=f"Unknown features: {unknown}. Valid features: {FEATURES}",
        )

    result = predict(body.features, top_n=body.top_n)

    return PredictResponse(
        predicted_syndrome=result["predicted_syndrome"],
        confidence=result["confidence"],
        top_matches=[SyndromeMatch(**m) for m in result["top_matches"]],
        all_scores=[SyndromeMatch(**m) for m in result["all_scores"]],
        active_features=result["active_features"],
        total_features_used=result["total_features_used"],
    )
