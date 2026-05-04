import json

features = json.load(open("/Users/sherwinj/VSCode/synlearn-v2/backend/syndlearn_features_136.json"))

def label_it(name):
    return name.replace("_", " ").title()

groups = {
    "Oral / Dental": [],
    "Facial Structure": [],
    "Eyes / Vision": [],
    "Ears / Hearing": [],
    "Speech / Language": [],
    "Airway / Feeding": [],
    "Cardiac": [],
    "Neurological": [],
    "Limbs / Skeletal": [],
    "Growth / Endocrine": [],
    "Other / Organs": [],
}

for f in features:
    if any(k in f for k in ["cleft", "palate", "uvula", "lip", "teeth", "enamel", "tongue", "gloss", "mouth", "stomia", "oral"]):
        groups["Oral / Dental"].append(f)
    elif any(k in f for k in ["face", "facial", "gnathia", "maxill", "midface", "malar", "nose", "nasal", "philtrum"]):
        groups["Facial Structure"].append(f)
    elif any(k in f for k in ["eye", "vision", "visual", "retin", "strabismus", "ptosis", "palpebral", "epicanthal", "coloboma", "telorism", "ophthalmos", "proptosis", "optic"]):
        groups["Eyes / Vision"].append(f)
    elif any(k in f for k in ["ear", "hearing", "auricular", "tia", "deaf"]):
        groups["Ears / Hearing"].append(f)
    elif any(k in f for k in ["speech", "language", "nasality", "articul", "delay", "disorder"]):
        if "developmental_delay" in f:
            groups["Neurological"].append(f)
        else:
            groups["Speech / Language"].append(f)
    elif any(k in f for k in ["airway", "feeding", "swallow", "respirat", "aspiration", "pneumonia", "trache", "stenosis", "cry"]):
        groups["Airway / Feeding"].append(f)
    elif any(k in f for k in ["cardiac", "heart", "septal", "conotruncal", "aneurysm", "aort"]):
        groups["Cardiac"].append(f)
    elif any(k in f for k in ["brain", "encephal", "hydrocephalus", "corpus_callosum", "seizure", "hypotonia", "cephaly", "craniosynostosis", "intellectual", "cognitive", "behavior", "psych", "learn", "anxiety", "schizophrenia", "bipolar", "hyperactivity", "distractibility"]):
        groups["Neurological"].append(f)
    elif any(k in f for k in ["limb", "dactyl", "skeletal", "spine", "vertebra", "joint", "osteo", "bone", "finger", "thumb", "foot", "extensibili", "club_foot"]):
        groups["Limbs / Skeletal"].append(f)
    elif any(k in f for k in ["growth", "stature", "dwarfism", "hypertrophy", "endo", "calcemia", "glycemia"]):
        groups["Growth / Endocrine"].append(f)
    else:
        groups["Other / Organs"].append(f)

import sys

out = sys.stdout

out.write("export const FEATURE_GROUPS = [\n")
for grp, f_list in groups.items():
    if not f_list: continue
    out.write("  {\n")
    out.write(f"    group: \"{grp}\",\n")
    f_str = ", ".join(f'"{x}"' for x in f_list)
    out.write(f"    features: [{f_str}],\n")
    out.write("  },\n")
out.write("];\n\n")

out.write("export const ALL_FEATURES: string[] = FEATURE_GROUPS.flatMap((g) => g.features);\n\n")

out.write("export const FEATURE_LABELS: Record<string, string> = {\n")
for f in features:
    out.write(f'  {f}: "{label_it(f)}",\n')
out.write("};\n")
