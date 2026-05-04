import { SYNDROMES, FEATURE_LABELS } from '@/lib/data';

const syndromeNames = SYNDROMES.map(s => s.name).join(", ");
const featureNames = Object.values(FEATURE_LABELS).join(", ");

const BASE_PROMPT = `
You are an intelligent medical learning assistant designed to generate interactive learning experiences about craniofacial syndromes.

IMPORTANT KNOWLEDGE BASE:
You MUST base your questions ONLY on the following 34 syndromes:
${syndromeNames}

You MUST base your clinical scenarios and options ONLY on the following features:
${featureNames}

Your goal is to dynamically generate ONE UNIQUE question.

⚠️ STRICT RULES:
- NEVER repeat the same question structure or wording.
- Vary difficulty (easy, medium, hard).
- Avoid predictable patterns.
- Questions must test reasoning, not raw memorization.
- Generate EXACTLY ONE question.
- Do NOT use or invent syndromes/features outside of the IMPORTANT KNOWLEDGE BASE provided above.
`;

export async function generateQuizQuestion(mode: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const prompt = `
${BASE_PROMPT}

🎮 GAME MODE:
${mode ? `You MUST generate a question for this specific mode: ${mode}` : `Randomly select ONE of these modes:
1. Case-Based Diagnosis (Generate realistic patient scenario using features, ask for syndrome)
2. Feature Identification (Describe a syndrome, ask which feature it represents)
3. Syndrome Builder (Provide features, ask user to select which belong to a specific syndrome)
4. Differential Diagnosis (Give overlapping symptoms, ask user to distinguish between two similar syndromes)
5. Reverse Mapping (Provide features, ask which syndrome matches them)
6. Missing Feature Prediction (Provide partial features, ask what feature is most likely missing)`}

🧠 GENERATION LOGIC:
- Randomly select a subset of features/syndromes to focus on.
- Sometimes include misleading or irrelevant features in the scenario.
- Shuffle answer choices.
- Ensure only ONE correct answer.

📝 OUTPUT FORMAT (STRICT):
You MUST output your response in this EXACT format, with no extra text before or after:

Question Type: <Game Mode Name>
Question:
<Generate a natural, non-repetitive question>

Options:
A. <Option 1>
B. <Option 2>
C. <Option 3>
D. <Option 4>

Correct Answer:
<A, B, C, or D>

Explanation:
<Clearly explain WHY the answer is correct, referencing features and clinical reasoning. Keep it educational.>
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
        }
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to generate question");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid response from AI model");
  }

  return parseQuizResponse(text);
}

function parseQuizResponse(text: string) {
  // Parse the strict output format into a structured JSON
  const typeMatch = text.match(/Question Type:\s*(.+)/i);
  const questionMatch = text.match(/Question:\s*([\s\S]+?)Options:/i);
  const optionsMatch = text.match(/Options:\s*([\s\S]+?)Correct Answer:/i);
  const correctMatch = text.match(/Correct Answer:\s*(.+)/i);
  const explanationMatch = text.match(/Explanation:\s*([\s\S]+)/i);

  if (!typeMatch || !questionMatch || !optionsMatch || !correctMatch || !explanationMatch) {
    console.error("Parse failed. Raw output:", text);
    throw new Error("AI generated an invalid format. Please try again.");
  }

  const optionsText = optionsMatch[1].trim().split('\n').filter((l: string) => l.trim().length > 0);
  
  return {
    type: typeMatch[1].trim(),
    question: questionMatch[1].trim(),
    options: optionsText,
    correct: correctMatch[1].trim(),
    explanation: explanationMatch[1].trim()
  };
}
