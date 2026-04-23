from pydantic import BaseModel
from typing import Dict, List

class PredictRequest(BaseModel):
    features: Dict[str, int]   # { "cleft_palate": 1, "micrognathia": 1, ... }
    top_n: int = 5

class SyndromeMatch(BaseModel):
    rank: int
    syndrome: str
    confidence: float           # 0–100

class PredictResponse(BaseModel):
    predicted_syndrome: str
    confidence: float
    top_matches: List[SyndromeMatch]
    all_scores: List[SyndromeMatch]   # all 34 sorted by confidence
    active_features: List[str]
    total_features_used: int
