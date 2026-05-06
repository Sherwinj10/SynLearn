import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export type QuizData = {
  type: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  matchPairs?: { left: string; right: string }[];
};

interface QuizCardProps {
  quiz: QuizData;
  onNext?: () => void;
}

export function QuizCard({ quiz, onNext }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Matching Game State
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [showMatchResult, setShowMatchResult] = useState(false);

  const handleMatch = (left: string, right: string) => {
    if (showMatchResult) return;
    setMatches(prev => ({ ...prev, [left]: right }));
    setLeftSelected(null);
  };

  const isMatchCorrect = (left: string, right: string) => {
    return quiz.matchPairs?.find(p => p.left === left)?.right === right;
  };

  const allMatched = quiz.matchPairs && Object.keys(matches).length === quiz.matchPairs.length;

  if (quiz.type === "Match the Following" && quiz.matchPairs) {
    const rights = [...quiz.matchPairs].sort(() => Math.random() - 0.5);
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 32 }}>
        <div className="tag" style={{ background: "rgba(34,211,238,0.1)", color: "var(--cyan)", border: "1px solid rgba(34,211,238,0.2)", marginBottom: 20 }}>{quiz.type}</div>
        <h2 style={{ fontSize: "1.2rem", marginBottom: 32 }}>{quiz.question}</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {quiz.matchPairs.map(p => (
              <button
                key={p.left}
                onClick={() => setLeftSelected(p.left)}
                style={{
                  padding: 16, borderRadius: 12, border: "1px solid var(--border)", textAlign: "left",
                  background: leftSelected === p.left ? "rgba(99,102,241,0.1)" : matches[p.left] ? "rgba(255,255,255,0.05)" : "var(--surface-2)",
                  borderColor: leftSelected === p.left ? "var(--primary)" : "var(--border)",
                  cursor: "pointer", fontSize: "0.9rem", color: matches[p.left] ? "var(--text-muted)" : "var(--text)"
                }}
              >
                {p.left} {matches[p.left] && " ✓"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {rights.map(p => (
              <button
                key={p.right}
                disabled={!leftSelected}
                onClick={() => leftSelected && handleMatch(leftSelected, p.right)}
                style={{
                  padding: 16, borderRadius: 12, border: "1px solid var(--border)", textAlign: "left",
                  background: Object.values(matches).includes(p.right) ? "rgba(255,255,255,0.05)" : "var(--surface-2)",
                  cursor: !leftSelected ? "default" : "pointer", fontSize: "0.9rem"
                }}
              >
                {p.right}
              </button>
            ))}
          </div>
        </div>

        {allMatched && !showMatchResult && (
          <button className="btn btn-primary" onClick={() => setShowMatchResult(true)} style={{ width: "100%" }}>Check Answers</button>
        )}

        <AnimatePresence>
          {showMatchResult && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginTop: 24 }}>
              <div style={{ padding: 24, background: "rgba(255,255,255,0.03)", borderRadius: 16 }}>
                <h3 style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>Results</h3>
                {Object.entries(matches).map(([l, r]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: isMatchCorrect(l, r) ? "#22a06b" : "#e5412b", fontSize: "0.9rem" }}>
                    {isMatchCorrect(l, r) ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {l} → {r}
                  </div>
                ))}
                <p style={{ marginTop: 16, fontSize: "0.9rem", color: "var(--text-subtle)" }}>{quiz.explanation}</p>
                {onNext && (
                  <button className="btn btn-primary" onClick={onNext} style={{ width: "100%", marginTop: 20, background: "var(--cyan)", color: "#000" }}>
                    Next Question
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Standard Multiple Choice Rendering
  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="card" style={{ padding: 32 }}
    >
      <div className="tag" style={{ background: "rgba(34,211,238,0.1)", color: "var(--cyan)", border: "1px solid rgba(34,211,238,0.2)", marginBottom: 20, display: "inline-flex" }}>
        {quiz.type}
      </div>
      
      <h2 style={{ fontSize: "1.25rem", lineHeight: 1.5, fontWeight: 500, marginBottom: 32, whiteSpace: "pre-wrap" }}>
        {quiz.question}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {quiz.options.map((opt) => {
          const letter = opt.substring(0, 1);
          const isCorrect = quiz.correct.startsWith(letter);
          const isSelected = selectedOption === letter;
          const showResult = selectedOption !== null;

          let bg = "var(--surface-2)";
          let border = "var(--border)";
          let color = "var(--text)";

          if (showResult) {
            if (isCorrect) {
              bg = "rgba(34,160,107,0.1)"; border = "#22a06b"; color = "#22a06b";
            } else if (isSelected) {
              bg = "rgba(229,65,43,0.1)"; border = "#e5412b"; color = "#e5412b";
            } else {
              bg = "transparent"; color = "var(--text-muted)";
            }
          } else if (isSelected) {
            bg = "rgba(99,102,241,0.1)"; border = "var(--primary)";
          }

          return (
            <button
              key={opt}
              disabled={showResult}
              onClick={() => setSelectedOption(letter)}
              style={{
                padding: "16px 20px", borderRadius: 12, background: bg,
                border: `1px solid ${border}`, color, textAlign: "left",
                fontSize: "0.95rem", cursor: showResult ? "default" : "pointer",
                transition: "all 0.2s ease", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}
            >
              <span>{opt}</span>
              {showResult && isCorrect && <CheckCircle2 size={18} color="#22a06b" />}
              {showResult && isSelected && !isCorrect && <XCircle size={18} color="#e5412b" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 32 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                Explanation
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text)", whiteSpace: "pre-wrap" }}>
                {quiz.explanation}
              </p>
              {onNext && (
                <button 
                  className="btn btn-primary" 
                  onClick={onNext} 
                  style={{ width: "100%", marginTop: 24, background: "var(--cyan)", color: "#000" }}
                >
                  Next Question
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
