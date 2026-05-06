"use client";
import { useState } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { generateLocalQuestion } from "@/services/QuizEngine";
import { QuizSetup } from "@/components/quiz/QuizSetup";
import { QuizCard, QuizData } from "@/components/quiz/QuizCard";

export default function QuizPage() {
  const [mode, setMode] = useState("Case-Based Diagnosis");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizData | null>(null);

  function generateQuestion() {
    setLoading(true);
    setError(null);
    setQuiz(null);

    try {
      const data = generateLocalQuestion(mode);
      setQuiz(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-padding" style={{ minHeight: "100vh", padding: "100px 24px 80px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <Link href="/learn" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text)"} onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
            <ArrowLeft size={16} /> Back to Library
          </Link>
          <div style={{ height: 24, width: 1, background: "var(--border)" }} />
          <h1 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, fontFamily: "var(--display)", display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="var(--cyan)" /> Quiz Mode
          </h1>
        </div>

        {/* Setup Card */}
        <QuizSetup 
          mode={mode} 
          setMode={setMode} 
          onGenerate={generateQuestion} 
          loading={loading} 
          error={error} 
        />

        {/* Quiz Area */}
        <AnimatePresence mode="wait">
          {quiz && <QuizCard key={quiz.question} quiz={quiz} onNext={generateQuestion} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
