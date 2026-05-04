import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export type QuizData = {
  type: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

interface QuizCardProps {
  quiz: QuizData;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
          const letter = opt.substring(0, 1); // e.g. "A"
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
              onMouseEnter={e => { if (!showResult) (e.currentTarget.style.borderColor = "var(--primary)") }}
              onMouseLeave={e => { if (!showResult) (e.currentTarget.style.borderColor = "var(--border)") }}
            >
              <span>{opt}</span>
              {showResult && isCorrect && <CheckCircle2 size={18} color="#22a06b" />}
              {showResult && isSelected && !isCorrect && <XCircle size={18} color="#e5412b" />}
            </button>
          );
        })}
      </div>

      {/* Explanation Reveal */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
