import pickle
import numpy as np
import warnings
import os

# Resolve model path relative to this file
MODEL_PATH = os.path.join(os.path.dirname(__file__), "syndlearn_model_136F.pkl")

print(f"DEBUG: Attempting to load model from: {os.path.abspath(MODEL_PATH)}")
if not os.path.exists(MODEL_PATH):
    print(f"CRITICAL: Model file NOT found at {MODEL_PATH}")
    # Fallback to check parent directory just in case
    LOCAL_PATH = os.path.join(os.path.dirname(__file__), "..", "syndlearn_model_136F.pkl")
    if os.path.exists(LOCAL_PATH):
        MODEL_PATH = LOCAL_PATH
        print("DEBUG: Found model locally in parent directory/")

# Suppress sklearn version mismatch warning (1.7.2 trained → 1.6.1 runtime)
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    with open(MODEL_PATH, "rb") as f:
        _bundle = pickle.load(f)

model: object   = _bundle["model"]
le              = _bundle["label_encoder"]
FEATURES: list  = _bundle["features"]
CLASSES: list   = list(le.classes_)


def predict(symptom_dict: dict, top_n: int = 5) -> dict:
    """
    symptom_dict: { feature_name: 0 | 1 }  — missing keys default to 0
    Returns full prediction payload.
    """
    vector = np.array(
        [symptom_dict.get(f, 0) for f in FEATURES], dtype=float
    ).reshape(1, -1)

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        proba = model.predict_proba(vector)[0]

    # All scores sorted descending
    sorted_idx = np.argsort(proba)[::-1]
    all_scores = [
        {
            "rank": rank + 1,
            "syndrome": CLASSES[i],
            "confidence": round(float(proba[i]) * 100, 1),
        }
        for rank, i in enumerate(sorted_idx)
    ]

    top_matches = all_scores[:top_n]
    best = all_scores[0]
    active = [f for f in FEATURES if symptom_dict.get(f, 0) == 1]

    return {
        "predicted_syndrome": best["syndrome"],
        "confidence": best["confidence"],
        "top_matches": top_matches,
        "all_scores": all_scores,
        "active_features": active,
        "total_features_used": len(active),
    }
