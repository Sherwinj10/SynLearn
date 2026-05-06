# New Games & Gemini Preservation Plan

### 1. Preserving Gemini Logic
I will not delete the current AI logic. I will move it to `src/services/gemini_quiz_legacy.ts` so you can always refer back to it or re-enable it in the future if needed.

### 2. New Proposed Game Types (Offline/Zero-Token)

**A. Match the Following**
*   **Mechanic**: 4 Syndromes on the left column, 4 Key Features on the right column.
*   **Goal**: Draw lines or click to pair the correct syndrome with its hallmark feature.
*   **Data Source**: Uses our `SYNDROMES` and `syndromeContent.ts`.

**B. Clinical Flashcards (Visual Memory)**
*   **Mechanic**: A "flashcard" shows a syndrome image or a feature image (e.g., "Malar hypoplasia").
*   **Goal**: The user guesses the syndrome, then clicks to "Flip" the card to see the answer and full clinical description.

**C. "The Intruder" (Odd One Out)**
*   **Mechanic**: Shows 4 clinical features (e.g., "Cleft palate", "Lower lip pits", "Bifid uvula", and "Limb syndactyly").
*   **Goal**: Identify which one does NOT belong to the target syndrome (Van der Woude in this example).

**D. Syndrome Sorting**
*   **Mechanic**: A "Feature" pops up (e.g., "Coloboma"), and you must quickly tap which of two syndromes it belongs to (e.g., CHARGE vs. Apert).

### Final Implementation Summary (May 6, 2026)

The SynLearn platform has been successfully refined with the following core updates:

1. **Zero-Token Quiz Engine**:
   - Built a deterministic `QuizEngine.ts` to generate quizzes locally from our medical database.
   - Implemented 6 dynamic game modes: Case-Based Diagnosis, Feature Identification, Missing Feature Prediction, Match the Following, The Intruder, and Syndrome Sorting.
   - Added a "Next Question" flow for seamless continuous gameplay.
   
2. **UI/UX Polishing**:
   - **Gallery Fixes**: Standardized syndrome images across the platform. Resolved image overlap issues and ensured clinical descriptions are always readable (1.2rem bold).
   - **Home Page**: Added a cursor-tracking interactive background with medical/cellular floating particles for a premium aesthetic.
   - **Renaming**: Simplified "AI Quiz Mode" to "Quiz Mode" as it is now powered by a local clinical engine.

3. **Asset Management**:
   - Replaced all external image dependencies with local syndrome and feature assets.
   - Implemented fallbacks for missing images to ensure a stable user experience.

**Status: Ready for Push.**

---

### 🛠 Fix for Hugging Face "Binary Files" Error

Hugging Face rejected the push because it requires images to be tracked via **Git LFS**. Please run these commands in your terminal to fix it:

1. **Track the images:**
   ```bash
   git lfs track "*.png"
   git lfs track "*.jpg"
   git lfs track "*.jpeg"
   git add .gitattributes
   ```

2. **Migrate entire history to LFS (CRITICAL):**
   ```bash
   git lfs migrate import --everything --include="*.png,*.jpg,*.jpeg"
   ```

3. **Push to Hugging Face:**
   ```bash
   git push origin main --force
   ```

**Note:** The `--everything` flag is required because the images were added in earlier commits. This command will rewrite your history to ensure Hugging Face accepts the push.

4. **Sync GitHub & Hugging Face (Recommended):**
   Since the migration rewrites your history, you should also update GitHub to keep everything in sync. I also fixed a small "missing icon" error that caused the build to fail:
   ```bash
   git add .
   git commit -m "Fix missing icons and sync LFS"
   git push github main --force
   git push origin main --force
   ```
