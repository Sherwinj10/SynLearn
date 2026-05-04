import pickle
import numpy as np

# ── Load model ────────────────────────────────────────────────────────────────
with open('syndlearn_model.pkl', 'rb') as f:
    bundle = pickle.load(f)

model   = bundle['model']
le      = bundle['label_encoder']
features = bundle['features']

# ── Predict function ──────────────────────────────────────────────────────────
def predict(symptoms: dict, top_n: int = 3):
    """
    Pass a dict with feature names as keys, 1 = present, 0 = absent.
    Any feature you don't mention defaults to 0.
    """
    vector = np.array([symptoms.get(f, 0) for f in features]).reshape(1, -1)
    proba  = model.predict_proba(vector)[0]

    top_indices = np.argsort(proba)[::-1][:top_n]

    print(f"\nFeatures you entered : {[f for f in features if symptoms.get(f, 0) == 1]}")
    print(f"\nResults:")
    for rank, i in enumerate(top_indices, 1):
        conf = round(float(proba[i]) * 100, 1)
        bar  = '█' * int(conf / 3)
        print(f"  {rank}. {le.classes_[i]:<42} {conf:5.1f}%  {bar}")

# ── Print all available features so you know what to pass ────────────────────
# print("Available features you can set to 1:")
# for i, f in enumerate(features, 1):
#     print(f"  {i:2}. {f}")

# ────────────────────────────────────────────────────────────────────────────
# EDIT THIS DICT — set features to 1 that your patient has, leave out the rest
# ────────────────────────────────────────────────────────────────────────────
my_symptoms = {
    'midface_hypoplasia'    : 1,
    'craniosynostosis'    : 1,
    'eye_anomaly': 1
}

predict(my_symptoms)
