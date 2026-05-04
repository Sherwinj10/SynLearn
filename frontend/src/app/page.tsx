"use client";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dna, Search, X, ArrowRight, Zap, ChevronRight } from "lucide-react";
import { FEATURE_GROUPS, FEATURE_LABELS, ALL_FEATURES } from "@/lib/data";

const API = "/api";

// Removed stats for simplicity

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="section-padding" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
      {/* Background orbs & Visual */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        <div className="orb" style={{ width: 600, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div className="orb" style={{ width: 400, height: 400, bottom: "10%", right: "10%", background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)" }} />
        <div className="orb" style={{ width: 300, height: 300, top: "30%", left: "5%", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 1, pointerEvents: "none" }} />



      {/* Headline */}
      <div style={{ textAlign: "center", maxWidth: 760, position: "relative", zIndex: 1 }}>
        {["SynLearn", "Diagnostic", "Tool"].map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 60, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", lineHeight: 1.05 }}
          >
            <span className="hero-title" style={{
              display: "block",
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-0.04em",
              color: i === 1 ? "transparent" : "var(--text)",
              WebkitTextStroke: i === 1 ? "1px rgba(99,102,241,0.6)" : undefined,
              background: i === 1 ? "linear-gradient(135deg,#6366f1,#a855f7,#22d3ee)" : undefined,
              WebkitBackgroundClip: i === 1 ? "text" : undefined,
              backgroundClip: i === 1 ? "text" : undefined,
              WebkitTextFillColor: i === 1 ? "transparent" : undefined,
            }}>
              {word}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ color: "var(--text-subtle)", fontSize: "1rem", maxWidth: 480, textAlign: "center", lineHeight: 1.7, marginTop: 24, marginBottom: 48 }}
      >
        Select clinical features to discover potential syndrome matches quickly and accurately.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
      >
        <button className="btn btn-primary" onClick={onStart} style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
          <Zap size={16} />
          Start Analysis
          <ArrowRight size={16} />
        </button>
        <a href="/learn" className="btn btn-ghost" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
          Explore Syndromes
        </a>
      </motion.div>


    </section>
  );
}

// ─── Feature Selector ─────────────────────────────────────────────────────────
function FeatureSelector({ onResult }: { onResult: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return FEATURE_GROUPS;
    return FEATURE_GROUPS.map(g => ({
      ...g,
      features: g.features.filter(f => FEATURE_LABELS[f].toLowerCase().includes(q) || f.includes(q)),
    })).filter(g => g.features.length > 0);
  }, [search]);

  function toggle(f: string) {
    setSelected(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);
  }

  async function analyze() {
    if (!selected.length || loading) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: Object.fromEntries(selected.map(f => [f, 1])), top_n: 5 }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      sessionStorage.setItem("synlearn_result", JSON.stringify(data));
      sessionStorage.setItem("synlearn_mode", "predict");
      onResult();
    } catch {
      setError("Backend unreachable. Start the server on port 8000.");
      setLoading(false);
    }
  }

  return (
    <section id="predict" className="section-padding" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <div className="divider" style={{ marginBottom: 24 }}>
          <span>01 / Feature Selection</span>
        </div>
        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.1 }}>
          Select Clinical<br />
          <span className="gradient-text-2">Observations</span>
        </h2>
      </div>

      <div className="card" style={{ padding: 32 }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter features — cleft, ear, cranio…"
            style={{
              width: "100%", padding: "10px 40px 10px 40px",
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: 10, color: "var(--text)", fontSize: "0.85rem",
              fontFamily: "var(--sans)", outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Feature groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {filteredGroups.map(group => (
            <div key={group.group}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 16, height: 1, background: "var(--border)", display: "inline-block" }} />
                {group.group}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.features.map(f => (
                  <motion.button
                    key={f}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`chip ${selected.includes(f) ? "active" : ""}`}
                    onClick={() => toggle(f)}
                  >
                    {selected.includes(f) && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />}
                    {FEATURE_LABELS[f]}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", padding: "20px 0" }}>No features match &ldquo;{search}&rdquo;</p>
          )}
        </div>

        {/* Footer bar */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <span style={{ color: selected.length ? "var(--cyan)" : "var(--text-muted)", fontWeight: 700 }}>{selected.length}</span> / {ALL_FEATURES.length} selected
            </span>
            {selected.length > 0 && (
              <button onClick={() => setSelected([])} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 4 }}>
                <X size={11} /> Clear
              </button>
            )}
          </div>
          {error && <span style={{ color: "#f43f5e", fontSize: "0.8rem" }}>{error}</span>}
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={analyze}
            disabled={selected.length === 0 || loading}
            style={{ minWidth: 160 }}
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                <Dna size={16} />
              </motion.div>
            ) : (
              <><Zap size={15} /> Analyze <ChevronRight size={14} /></>
            )}
          </motion.button>
        </div>
      </div>

      {/* Selected feature preview */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}
        >
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginRight: 4, alignSelf: "center" }}>SELECTED:</span>
          {selected.map(f => (
            <span key={f} style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
              {FEATURE_LABELS[f]}
            </span>
          ))}
        </motion.div>
      )}
    </section>
  );
}

// ─── Home page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [showPredict, setShowPredict] = useState(false);

  function scrollToPredict() {
    setShowPredict(true);
    setTimeout(() => {
      document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <>
      <Hero onStart={scrollToPredict} />
      <AnimatePresence>
        {showPredict && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FeatureSelector onResult={() => router.push("/result")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
