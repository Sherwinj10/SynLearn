# SynLearn V2: Comprehensive Project Report & Architecture Overview

SynLearn V2 is an AI-assisted diagnostic platform designed to bridge the gap between raw clinical observations and definitive craniofacial syndrome diagnosis. By inputting specific morphological traits (e.g., *midface hypoplasia*, *craniosynostosis*), clinicians and medical learners can receive highly accurate, probabilistic syndrome predictions powered by a custom Machine Learning pipeline.

This document breaks down the project from scratch, detailing the data pipeline, algorithms, backend/frontend architectures, and deployment strategies.

---

## 1. Data Pipeline & Synthetic Data Generation

In the medical field, acquiring large-scale datasets mapping phenotypic features to specific syndromes is incredibly difficult due to privacy regulations (HIPAA) and data scarcity for rare diseases. To overcome this, SynLearn utilizes a **Synthetic Data Generation Strategy**.

### The Technique:
1. **Feature Engineering & Mapping:** 136 distinct morphological traits were mapped across 34 specific craniofacial syndromes using peer-reviewed medical literature.
2. **Probability Weight Matrix:** A matrix (`step3_comprehensive_weights.csv`) was created that defines the statistical probability of each feature appearing in a specific syndrome. (e.g., *What is the probability of a patient with Treacher Collins syndrome having micrognathia?*)
3. **Algorithmic Data Generation (`syntheticData.py`):**
   - The script generates synthetic patient records by iterating through the 34 syndromes.
   - For each syndrome, it generates **500 synthetic samples** to ensure a perfectly balanced dataset (crucial for training robust models without class bias).
   - For every feature within a sample, it performs a **Bernoulli draw** (a random binary outcome of 0 or 1) weighted by the specific probability from the matrix. 
   - **Result:** A perfectly balanced, synthetic dataset of 17,000 patient rows and 136 binary feature columns, which mirrors real-world statistical clinical presentations.

---

## 2. Machine Learning Architecture

The core of SynLearn's predictive power is an ensemble machine learning model trained to recognize patterns across the 136 clinical features.

### The Algorithm: Random Forest Classifier
The model (`modelTraining.py`) utilizes the **Random Forest** algorithm (`RandomForestClassifier` from Scikit-Learn). 

**Why Random Forest?**
- **Non-Linearity:** Craniofacial syndromes are defined by complex, non-linear combinations of binary traits. A Random Forest, being an ensemble of many decision trees, captures these complex feature interactions better than linear models (like Logistic Regression).
- **Robustness:** It is highly resistant to overfitting, especially when dealing with a high-dimensional feature space (136 features).

### Training Configuration & Synthesis:
- **Hyperparameters:** The model uses `n_estimators=300` (a "forest" of 300 distinct decision trees) and `min_samples_leaf=2` (regularization to prevent individual trees from memorizing the data).
- **Evaluation:** Evaluated using a 5-fold cross-validation split and an 80/20 train/test split to ensure generalized accuracy.
- **Probabilistic Scoring (`predict_proba`):** Instead of just returning a single "best guess", the inference script uses Scikit-Learn's `predict_proba()` method. This analyzes the proportion of the 300 decision trees that voted for each class, yielding a percentage-based confidence score for all 34 syndromes.
- **Artifacts:** The final model, along with a `LabelEncoder` to translate array integers back to human-readable syndrome names, is serialized into a lightweight `.pkl` file for rapid backend inference.

---

## 3. Backend Application Architecture

The application requires a robust backend to handle incoming feature sets, pass them to the ML model, and return predictions.

### Technology Stack: FastAPI & Python 3.11
- **FastAPI** was chosen over Flask or Django because of its high performance, asynchronous capabilities, and built-in Data Validation (using Pydantic models).
- **Server:** Runs on `Uvicorn`, a lightning-fast ASGI web server.

### Core API Flow:
1. **`POST /predict` Endpoint:** This is the core inference route. It accepts a JSON payload of "active" clinical features (features the user selected).
2. **Validation:** Pydantic schemas (`PredictRequest`, `PredictResponse`) strictly validate the incoming features against the known 136-feature list, rejecting unknown inputs.
3. **Inference:** The backend formats the active features into a binary array (0s and 1s), passes it into the deserialized Random Forest model, and calculates the top predictions.
4. **Response:** It returns a structured JSON object containing the Top 3 probable syndromes along with their percentage confidence scores (e.g., `Crouzon Syndrome: 94.5%`).

---

## 4. Frontend User Interface

The user-facing platform is designed to be a "cinematic, medical-grade diagnostic dashboard."

### Technology Stack: Next.js 14 & React
- **Next.js:** Used for routing, server-side capabilities, and seamless React integration.
- **Styling:** **Tailwind CSS** provides utility-first, highly responsive design scaling.
- **Micro-animations:** **Framer Motion** is integrated to handle smooth state transitions, layout shifts, and visual feedback, making the UI feel premium and highly responsive to clinician inputs.

### Interaction Flow:
- Users interact with dynamic checkboxes/toggles representing the 136 morphological traits.
- Upon clicking "Analyze", the frontend sends an HTTP request to the backend.
- The UI dynamically displays the returned Top 3 matches using animated confidence bars.
- **Learn Mode/Clinical Gallery:** Users can click on predicted syndromes to route to an exhaustive detail page (`SyndromeDetailPage`), which integrates clinical features with reference images and medical descriptions.

---

## 5. Containerization & Deployment Strategy

SynLearn V2 is built for modern, cloud-native deployment, specifically targeting **Hugging Face Spaces**.

### The Challenge: Single-Port Exposure
Platforms like Hugging Face typically only expose a single network port (`7860`) per application. However, SynLearn is a two-part application (Next.js Frontend + FastAPI Backend).

### The Solution: Unified Docker Monolith & Proxy Rewrites
1. **Custom Dockerfile:** The app uses a hybrid base image (`python3.11-nodejs20-slim`) to provide the runtimes for both the Python backend and Node.js frontend within the *same* Docker container.
2. **Boot Script (`start.sh`):** A shell script acts as the Docker entry point. It boots the FastAPI backend in the *background* (bound internally to `localhost:8000`) and the Next.js frontend in the *foreground* (bound publicly to `0.0.0.0:7860`).
3. **Next.js API Proxy (`next.config.ts`):** To allow the frontend to talk to the backend, Next.js is configured with a custom `rewrite` rule. Any request the frontend makes to `/api/*` is seamlessly proxied internally to `http://127.0.0.1:8000/*`.
   
This sophisticated containerization allows a complex, full-stack Machine Learning web application to be deployed as a single, easily distributed package without CORS issues or complex networking configurations.
