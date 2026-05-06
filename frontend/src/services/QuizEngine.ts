import { SYNDROMES, FEATURE_LABELS } from '@/lib/data';
import { SYNDROME_CONTENT, SyndromeContent } from '@/lib/syndromeContent';

export type QuizQuestion = {
  type: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  matchPairs?: { left: string; right: string }[]; // For Match the Following
};

// Helper to get content by slug
const getContent = (slug: string) => SYNDROME_CONTENT.find(s => s.slug === slug);

export function generateLocalQuestion(mode: string): QuizQuestion {
  const allSyndromes = SYNDROMES;
  
  // Helper to pick random items
  const pickRandom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  switch (mode) {
    case "Case-Based Diagnosis": {
      const syn = pickRandom(allSyndromes);
      const content = getContent(syn.id);
      
      const scenario = content 
        ? content.sections.definition.split('.')[0] + '.' 
        : syn.shortDesc;

      const others = shuffle(allSyndromes.filter(s => s.id !== syn.id)).slice(0, 3);
      const options = shuffle([syn.name, ...others.map(o => o.name)]);
      
      return {
        type: mode,
        question: `A patient presents with the following clinical history: "${scenario}"\n\nWhat is the most likely diagnosis?`,
        options: options.map((name, i) => `${String.fromCharCode(65 + i)}. ${name}`),
        correct: String.fromCharCode(65 + options.indexOf(syn.name)),
        explanation: `${syn.name} is characterized by these features. ${content?.subtitle ?? ""}`
      };
    }

    case "Feature Identification": {
      const syn = pickRandom(allSyndromes);
      const content = getContent(syn.id);
      
      const features = (content?.sections.facial_features && content.sections.facial_features.length > 0) 
        ? content.sections.facial_features 
        : [syn.shortDesc];
      
      const correctFeature = pickRandom(features);
      
      // Get random features from OTHER syndromes
      const otherSyns = shuffle(allSyndromes.filter(s => s.id !== syn.id)).slice(0, 3);
      const wrongFeatures = otherSyns.map(os => {
        const c = getContent(os.id);
        return (c?.sections.facial_features && c.sections.facial_features.length > 0) 
          ? pickRandom(c.sections.facial_features) 
          : os.shortDesc;
      });

      const options = shuffle([correctFeature, ...wrongFeatures]);
      
      return {
        type: mode,
        question: `Which of the following is a characteristic clinical feature of ${syn.name}?`,
        options: options.map((f, i) => `${String.fromCharCode(65 + i)}. ${f}`),
        correct: String.fromCharCode(65 + options.indexOf(correctFeature)),
        explanation: `${correctFeature} is a hallmark feature of ${syn.name}.`
      };
    }

    case "Missing Feature Prediction": {
      const validSyndromes = allSyndromes.filter(s => {
        const c = getContent(s.id);
        return c && c.sections.facial_features.length >= 2;
      });

      const syn = pickRandom(validSyndromes.length > 0 ? validSyndromes : allSyndromes);
      const content = getContent(syn.id);
      const features = shuffle(content?.sections.facial_features ?? ["Feature A", "Feature B", "Feature C"]);
      
      const displayed = features.slice(0, 2);
      const missing = features[2] || "Other clinical anomaly";
      
      const wrongOptions = shuffle(allSyndromes.filter(s => s.id !== syn.id))
        .map(os => {
          const c = getContent(os.id);
          return c?.sections.facial_features[0];
        })
        .filter(Boolean)
        .slice(0, 3);

      const options = shuffle([missing, ...wrongOptions]);

      return {
        type: mode,
        question: `${syn.name} typically presents with ${displayed[0]} and ${displayed[1]}. Which other feature is most likely to be present?`,
        options: options.map((f, i) => `${String.fromCharCode(65 + i)}. ${f}`),
        correct: String.fromCharCode(65 + options.indexOf(missing)),
        explanation: `${missing} completes the clinical presentation for ${syn.name}.`
      };
    }

    case "The Intruder": {
      const syn = pickRandom(allSyndromes);
      const content = getContent(syn.id);
      const realFeatures = shuffle(content?.sections.facial_features ?? []).slice(0, 3);
      
      // If we don't have enough features, fill with a generic one
      while(realFeatures.length < 3) realFeatures.push("Typical facial gestalt");

      const intruderSyn = pickRandom(allSyndromes.filter(s => s.id !== syn.id));
      const intruderContent = getContent(intruderSyn.id);
      const intruderFeature = (intruderContent?.sections.facial_features && intruderContent.sections.facial_features.length > 0)
        ? pickRandom(intruderContent.sections.facial_features)
        : "Nonspecific development delay";

      const options = shuffle([...realFeatures, intruderFeature]);

      return {
        type: mode,
        question: `Three of these features are associated with ${syn.name}. Identify the "Intruder" (the one that does NOT belong).`,
        options: options.map((f, i) => `${String.fromCharCode(65 + i)}. ${f}`),
        correct: String.fromCharCode(65 + options.indexOf(intruderFeature)),
        explanation: `${intruderFeature} is actually associated with ${intruderSyn.name}, not ${syn.name}.`
      };
    }

    case "Match the Following": {
      const selected = shuffle(allSyndromes).slice(0, 4);
      const pairs = selected.map(s => {
        const c = getContent(s.id);
        return {
          left: s.name,
          right: c?.sections.facial_features[0] ?? s.shortDesc
        };
      });

      return {
        type: mode,
        question: "Match each syndrome with its primary clinical feature.",
        options: [], 
        correct: "Check matches",
        explanation: "Matching syndromes with their hallmark features is essential for differential diagnosis.",
        matchPairs: pairs
      };
    }

    case "Syndrome Sorting": {
      const synA = pickRandom(allSyndromes);
      const synB = pickRandom(allSyndromes.filter(s => s.id !== synA.id));
      
      const contentA = getContent(synA.id);
      const feature = (contentA?.sections.facial_features && contentA.sections.facial_features.length > 0)
        ? pickRandom(contentA.sections.facial_features)
        : "Characteristic facial profile";

      const options = [synA.name, synB.name];
      const shuffledOptions = shuffle(options);

      return {
        type: mode,
        question: `To which syndrome does the feature "${feature}" belong?`,
        options: shuffledOptions.map((name, i) => `${String.fromCharCode(65 + i)}. ${name}`),
        correct: String.fromCharCode(65 + shuffledOptions.indexOf(synA.name)),
        explanation: `${feature} is a key finding in ${synA.name}.`
      };
    }

    default:
      return generateLocalQuestion("Case-Based Diagnosis");
  }
}
