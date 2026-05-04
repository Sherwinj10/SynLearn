import pandas as pd
import numpy as np

SAMPLES_PER_SYNDROME = 500
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)

# ── Load weight matrix ────────────────────────────────────────────────────────
raw = pd.read_csv('step3_comprehensive_weights.csv')
feature_names = raw.columns[1:].tolist()
data = raw.set_index('syndrome')
data = data.apply(pd.to_numeric, errors='coerce').fillna(0.0)

print(f"Loaded {len(data)} syndromes, {len(feature_names)} features")

# ── Generate synthetic patients ───────────────────────────────────────────────
records = []

for syndrome, weight_row in data.iterrows():
    for i in range(SAMPLES_PER_SYNDROME):
        patient = {'syndrome_label': syndrome, 'source': 'synthetic'}
        for feature in feature_names:
            prob = weight_row[feature]
            if prob == 0.0:
                patient[feature] = 0
            else:
                # Bernoulli draw: 1 with probability=prob, 0 otherwise
                patient[feature] = int(np.random.random() < prob)
        records.append(patient)

df = pd.DataFrame(records)

# ── Sanity checks ─────────────────────────────────────────────────────────────
print(f"\nOutput shape : {df.shape}")
print(f"Total rows   : {len(df)}  ({len(data)} syndromes × {SAMPLES_PER_SYNDROME} patients)")

# Class balance
counts = df['syndrome_label'].value_counts()
print(f"\nClass balance — all should be {SAMPLES_PER_SYNDROME}:")
if counts.nunique() == 1:
    print(f"  ✅ Perfectly balanced — {counts.iloc[0]} rows per syndrome")
else:
    print(counts.to_string())

# Feature density per syndrome — catch anything that looks wrong
print(f"\nAvg features active per patient per syndrome:")
feature_cols = feature_names
for syn in data.index:
    subset = df[df['syndrome_label'] == syn][feature_cols]
    avg = subset.sum(axis=1).mean()
    mn  = subset.sum(axis=1).min()
    mx  = subset.sum(axis=1).max()
    print(f"  {syn:<40}  avg={avg:.1f}  min={mn}  max={mx}")

# ── Save ──────────────────────────────────────────────────────────────────────
# Drop source column for the training file
training = df.drop(columns=['source'])
training.to_csv('training_data.csv', index=False)

# Keep source column in full version for traceability
df.to_csv('training_data_with_source.csv', index=False)

print("\n✅ Saved: training_data.csv          (for model training)")
print("✅ Saved: training_data_with_source.csv  (for debugging)")
