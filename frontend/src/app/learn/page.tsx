"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, X, ExternalLink, BookOpen } from "lucide-react";
import { SYNDROMES } from "@/lib/data";
import { SYNDROME_CONTENT } from "@/lib/syndromeContent";

const DEEP_SLUGS = new Set(SYNDROME_CONTENT.map(s => s.slug));

// ─── Syndrome Card — image-first with hover reveal ────────────────────────────
function SynCard({ syn, onClick }: { syn: (typeof SYNDROMES)[0]; onClick: () => void }) {
  const deep = DEEP_SLUGS.has(syn.id);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="card-hover"
      style={{ cursor: "pointer", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)", position: "relative", aspectRatio: "4/5" }}
    >
      {/* Image fills full card */}
      <img
        src={syn.image}
        alt={syn.name}
        loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
        onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.07)")}
        onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
      />

      {/* Gradient overlay always visible */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.4) 50%, transparent 100%)` }} />

      {/* Color accent top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: syn.color }} />

      {/* Deep badge */}
      {deep && (
        <div style={{ position: "absolute", top: 14, right: 14, padding: "3px 10px", borderRadius: 100, background: `${syn.color}22`, border: `1px solid ${syn.color}44`, color: syn.color, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--mono)" }}>
          Deep Learn
        </div>
      )}

      {/* Text content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: syn.color, marginBottom: 8 }} />
        <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "0.95rem", color: "#eee", lineHeight: 1.25, marginBottom: 6, letterSpacing: "-0.02em" }}>
          {syn.name}
        </h3>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {syn.shortDesc}
        </p>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4, color: syn.color, fontSize: "0.72rem", fontWeight: 600 }}>
          <ExternalLink size={11} />
          View details
        </div>
      </div>
    </motion.div>
  );
}

// ─── Learn Page ───────────────────────────────────────────────────────────────
export default function LearnPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return SYNDROMES;
    return SYNDROMES.filter(s => s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="section-padding" style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div className="container-wide" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div className="divider" style={{ marginBottom: 24 }}>
            <span>Knowledge Base</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1.1, marginBottom: 12 }}>
                Syndrome<br /><span className="gradient-text-2">Library</span>
              </h1>
              <p style={{ color: "var(--text-subtle)", fontSize: "0.95rem", maxWidth: 400, lineHeight: 1.7 }}>
                Structured medical knowledge on 34 craniofacial syndromes — etiology, genetics, speech characteristics, and clinical recommendations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ position: "relative", maxWidth: 480, marginBottom: 48 }}
        >
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search syndromes…"
            style={{
              width: "100%", padding: "12px 40px 12px 42px",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 12, color: "var(--text)", fontSize: "0.9rem",
              fontFamily: "var(--sans)", outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
              <X size={14} />
            </button>
          )}
        </motion.div>

        {/* Count indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: 28 }}
        >
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            SHOWING <span style={{ color: "var(--cyan)" }}>{filtered.length}</span> of {SYNDROMES.length} syndromes
          </p>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0" }}>
              No results for &ldquo;{search}&rdquo;
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 20 }}
            >
              {filtered.map((syn, i) => (
                <motion.div
                  key={syn.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                >
                  <SynCard
                    syn={syn}
                    onClick={() => {
                      sessionStorage.setItem("synlearn_mode", "learn");
                      router.push(`/learn/${syn.id}`);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
