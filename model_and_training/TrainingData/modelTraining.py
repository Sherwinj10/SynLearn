import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder
import pickle
import json

# ── Load training data ────────────────────────────────────────────────────────
df = pd.read_csv('TrainingData/training_data.csv')

FEATURE_COLS = [c for c in df.columns if c != 'syndrome_label']
X = df[FEATURE_COLS].values
y = df['syndrome_label'].values

print(f"Dataset : {X.shape[0]} rows, {X.shape[1]} features, {len(set(y))} classes\n")

# ── Encode labels ─────────────────────────────────────────────────────────────
le = LabelEncoder()
y_enc = le.fit_transform(y)

# ── Train / test split ────────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y_enc, test_size=0.2, random_state=42, stratify=y_enc
)
print(f"Train : {len(X_train)} rows")
print(f"Test  : {len(X_test)} rows\n")

# ── Train Random Forest ───────────────────────────────────────────────────────
print("Training Random Forest...")
rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    min_samples_leaf=2,
    class_weight='balanced',    # handles any class imbalance
    random_state=42,
    n_jobs=-1
)
rf.fit(X_train, y_train)
print("Done.\n")

# ── Cross-validation ──────────────────────────────────────────────────────────
cv_scores = cross_val_score(rf, X, y_enc, cv=5, scoring='accuracy', n_jobs=-1)
print(f"5-fold CV accuracy : {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")

# ── Test set evaluation ───────────────────────────────────────────────────────
y_pred = rf.predict(X_test)
test_acc = (y_pred == y_test).mean()
print(f"Test set accuracy  : {test_acc:.3f}\n")

# Per-class report
print("Per-class performance:")
report = classification_report(
    y_test, y_pred,
    target_names=le.classes_,
    zero_division=0
)
print(report)

# ── Feature importance ────────────────────────────────────────────────────────
importances = pd.Series(rf.feature_importances_, index=FEATURE_COLS)
importances = importances.sort_values(ascending=False)
print("\nTop 15 most important features:")
for feat, imp in importances.head(15).items():
    bar = '█' * int(imp * 300)
    print(f"  {feat:<42} {imp:.4f}  {bar}")

# ── Prediction function ───────────────────────────────────────────────────────
def predict_syndrome(symptom_dict: dict, top_n: int = 3) -> dict:
    """
    Given a dict of {feature_name: 0 or 1},
    returns predicted syndrome, confidence score, and top-N closest matches.

    Unknown features are treated as 0.
    Use -1 for unknown/unrecorded features if needed.
    """
    # Build input vector
    vector = np.array([symptom_dict.get(f, 0) for f in FEATURE_COLS]).reshape(1, -1)

    # Get class probabilities
    proba = rf.predict_proba(vector)[0]

    # Top-N predictions
    top_indices = np.argsort(proba)[::-1][:top_n]
    top_syndromes = [
        {
            'syndrome': le.classes_[i],
            'confidence': round(float(proba[i]) * 100, 1)
        }
        for i in top_indices
    ]

    # Matched features for the top prediction
    top_class = le.classes_[top_indices[0]]

    return {
        'predicted_syndrome': top_class,
        'confidence': round(float(proba[top_indices[0]]) * 100, 1),
        'top_matches': top_syndromes,
        'input_features_active': [f for f in FEATURE_COLS if symptom_dict.get(f, 0) == 1]
    }

# ── Test predictions ──────────────────────────────────────────────────────────
print("\n" + "="*60)
print("SAMPLE PREDICTIONS")
print("="*60)

test_cases = [
    {
        'label': 'Pierre Robin Sequence (textbook)',
        'symptoms': {
            'cleft_palate': 1,
            'glossoptosis': 1,
            'feeding_problems': 1,
            'micrognathia': 1,
        }
    },
    {
        'label': 'Treacher Collins (textbook)',
        'symptoms': {
            'facial_asymmetry': 1,
            'ear_anomaly': 1,
            'hearing_loss': 1,
            'micrognathia': 1,
            'eye_anomaly': 1,
        }
    },
    {
        'label': 'Crouzon (textbook)',
        'symptoms': {
            'craniosynostosis': 1,
            'midface_hypoplasia': 1,
            'eye_anomaly': 1,
        }
    },
    {
        'label': 'Ambiguous — only cleft palate + hearing loss',
        'symptoms': {
            'cleft_palate': 1,
            'hearing_loss': 1,
        }
    },
]

for case in test_cases:
    result = predict_syndrome(case['symptoms'])
    print(f"\nInput  : {case['label']}")
    print(f"Active : {result['input_features_active']}")
    print(f"  → 1st: {result['top_matches'][0]['syndrome']:<40} {result['top_matches'][0]['confidence']}%")
    print(f"  → 2nd: {result['top_matches'][1]['syndrome']:<40} {result['top_matches'][1]['confidence']}%")
    print(f"  → 3rd: {result['top_matches'][2]['syndrome']:<40} {result['top_matches'][2]['confidence']}%")

# ── Save model + metadata ─────────────────────────────────────────────────────
with open('syndlearn_model.pkl', 'wb') as f:
    pickle.dump({'model': rf, 'label_encoder': le, 'features': FEATURE_COLS}, f)

# Save feature list as JSON for frontend use
with open('syndlearn_features.json', 'w') as f:
    json.dump(FEATURE_COLS, f, indent=2)

print("\n\n✅ Saved: syndlearn_model.pkl      (model + encoder + feature list)")
print("✅ Saved: syndlearn_features.json  (feature list for API/frontend)")
