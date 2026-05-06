"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, ExternalLink, RefreshCw, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { SYNDROMES, FEATURE_LABELS, MODEL_NAME_TO_SLUG } from "@/lib/data";

type ApiResult = {
  predicted_syndrome: string;
  confidence: number;
  top_matches: { rank: number; syndrome: string; confidence: number }[];
  all_scores: { rank: number; syndrome: string; confidence: number }[];
  active_features: string[];
  total_features_used: number;
};

// ─── Radial Confidence Gauge ──────────────────────────────────────────────────
function RadialGauge({ value, color }: { value: number; color: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  const R = 72, circ = 2 * Math.PI * R;
  const offset = circ - (value / 100) * circ;

  return (
    <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto" }}>
      <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <circle
          ref={ref}
          cx="100" cy="100" r={R} fill="none"
          stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={inView ? offset : circ}
          className="gauge-ring"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ fontFamily: "var(--display)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em" }}
        >
          {value}%
        </motion.div>
        <div style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Confidence</div>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ items, initialIndex, onClose }: { items: {src: string; name: string}[]; initialIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);
  
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((prev) => (prev + 1) % items.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.9)" }}
      onClick={onClose}
    >
      <button onClick={onClose} style={{ position: "absolute", top: 32, right: 32, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", padding: 12, cursor: "pointer", color: "#fff", zIndex: 210 }}>
        <X size={24} />
      </button>
      
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: 24, 
          maxWidth: "90vw", 
          maxHeight: "90vh",
          position: "relative" 
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {items.length > 1 && (
            <button onClick={prevImg} style={{ position: "absolute", left: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer", zIndex: 10 }}>
              <ChevronLeft size={24} />
            </button>
          )}
          
          <motion.img
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 22 }}
            src={items[idx].src} alt={items[idx].name} 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "60vh", 
              objectFit: "contain", 
              borderRadius: 16,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)" 
            }} 
          />

          {items.length > 1 && (
            <button onClick={nextImg} style={{ position: "absolute", right: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer", zIndex: 10 }}>
              <ChevronRight size={24} />
            </button>
          )}
        </div>
        
        <div style={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
          <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--display)", marginBottom: 8 }}>
            {items[idx].name} <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", fontWeight: 400 }}>({idx + 1} / {items.length})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── All 34 chart ─────────────────────────────────────────────────────────────
function AllScores({ scores }: { scores: ApiResult["all_scores"] }) {
  const [open, setOpen] = useState(false);
  const visible = open ? scores : scores.slice(0, 6);
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>All 34 Syndromes</span>
        <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
          {open ? <><ChevronUp size={13} />Collapse</> : <><ChevronDown size={13} />Show all</>}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map(s => {
          const syn = SYNDROMES.find(x => x.name === s.syndrome);
          return (
            <div key={s.syndrome} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--text-muted)", width: 18, textAlign: "right" }}>{s.rank}</span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: syn?.color ?? "var(--primary)", opacity: s.rank === 1 ? 1 : 0.4, flexShrink: 0 }} />
              <span style={{ fontSize: "0.8rem", color: s.rank === 1 ? "var(--text)" : "var(--text-muted)", fontWeight: s.rank === 1 ? 600 : 400, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.syndrome}</span>
              <div style={{ width: 120, height: 3, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden", flexShrink: 0 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.confidence}%` }}
                  transition={{ delay: 0.1 * s.rank, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: "100%", borderRadius: 100, background: s.rank === 1 ? `linear-gradient(90deg,${syn?.color ?? "var(--primary)"},var(--cyan))` : (syn?.color ?? "rgba(255,255,255,0.2)"), opacity: s.rank === 1 ? 1 : 0.35 }}
                />
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: s.rank === 1 ? syn?.color ?? "var(--primary)" : "var(--text-muted)", width: 38, textAlign: "right", fontWeight: 700 }}>{s.confidence}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Result Page ──────────────────────────────────────────────────────────────
export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ApiResult | null>(null);
  const [lightbox, setLightbox] = useState<{ items: {src: string; name: string}[]; initialIndex: number } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("synlearn_result");
    if (raw) { try { setResult(JSON.parse(raw)); } catch { router.replace("/"); } }
    else router.replace("/");
  }, [router]);

  if (!result) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: 32, height: 32, borderRadius: "50%", borderTop: "2px solid var(--primary)", border: "2px solid var(--border)" }} />
    </div>
  );

  const syn = SYNDROMES.find(s => s.name === result.predicted_syndrome);
  const slug = MODEL_NAME_TO_SLUG[result.predicted_syndrome];
  const color = syn?.color ?? "var(--primary)";

  return (
    <>
      <div className="section-padding" style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: 48, fontFamily: "var(--sans)", transition: "color 0.2s" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={15} />
            Back
          </motion.button>

          {/* Section label */}
          <div className="divider" style={{ marginBottom: 40 }}>
            <span>02 / Analysis Result</span>
          </div>

          <div className="grid-2-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            {/* Left — Gauge + name */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="card"
              style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, position: "relative", overflow: "hidden" }}
            >
              {/* Background glow */}
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${color}18, transparent 70%)`, pointerEvents: "none" }} />
              <div className="tag" style={{ background: `${color}18`, border: `1px solid ${color}44`, color }}>
                AI Prediction
              </div>
              <RadialGauge value={result.confidence} color={color} />
              <div style={{ textAlign: "center" }}>
                <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 6 }}>
                  {result.predicted_syndrome}
                </h1>
                {syn && <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{syn.shortDesc}</p>}
              </div>

              {/* Feature chips used */}
              <div style={{ width: "100%" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
                  {result.total_features_used} features analysed
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.active_features.map(f => (
                    <span key={f} style={{ padding: "3px 10px", borderRadius: 100, fontSize: "0.7rem", background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {FEATURE_LABELS[f] ?? f}
                    </span>
                  ))}
                </div>

                {/* Feature Gallery */}
                <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
                    Feature Gallery
                  </p>
                  <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "thin" }}>
                    {result.active_features.map(f => (
                      <div key={`img-${f}`} style={{ flexShrink: 0, width: 100 }}>
                        <div style={{ width: 100, height: 100, borderRadius: 12, overflow: "hidden", background: "var(--surface)", border: "1px solid var(--border)", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img 
                            src={`/features/${f}.jpeg`} 
                            alt={FEATURE_LABELS[f] ?? f} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                          />
                        </div>
                        <p style={{ fontSize: "0.65rem", color: "var(--text)", textAlign: "center", lineHeight: 1.2, fontWeight: 500 }}>{FEATURE_LABELS[f] ?? f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 10, width: "100%", flexWrap: "wrap" }}>
                {slug && (
                  <motion.a
                    href={`/learn/${slug}`}
                    whileHover={{ y: -2 }}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <ExternalLink size={14} />
                    Full Info
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={() => router.back()}
                  className="btn btn-ghost"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <RefreshCw size={14} />
                  New Analysis
                </motion.button>
              </div>
            </motion.div>

            {/* Right — Image + Top 5 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Image */}
              {syn && result.active_features.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  onClick={() => {
                    const items = [
                      { src: syn.image.startsWith('http') ? syn.image : syn.image, name: syn.name },
                      ...result.active_features.map(f => ({ src: `/features/${f}.jpeg`, name: FEATURE_LABELS[f] ?? f }))
                    ];
                    setLightbox({ items, initialIndex: 0 });
                  }}
                  style={{ width: "100%", height: 220, borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", cursor: "zoom-in", position: "relative", background: "none", padding: 0 }}
                  className="card-hover"
                >
                  <img src={syn.image.startsWith('http') ? syn.image : syn.image} alt={syn.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                    onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${color}88 0%, transparent 60%)` }} />
                  <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", fontFamily: "var(--display)", textAlign: "left" }}>
                      Main Syndrome:<br/>
                      <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{syn.name}</span>
                    </span>
                    <span style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.8)", fontSize: "0.65rem", padding: "4px 9px", borderRadius: 100, backdropFilter: "blur(8px)" }}>Click for gallery</span>
                  </div>
                </motion.button>
              )}

              {/* Top 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="card"
                style={{ padding: 24, flex: 1 }}
              >
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Top 5 Matches</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {result.top_matches.map((m, i) => {
                    const ms = SYNDROMES.find(s => s.name === m.syndrome);
                    return (
                      <div key={m.rank} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: m.rank === 1 ? ms?.color ?? color : "var(--text-muted)", width: 16, textAlign: "right", fontWeight: 700 }}>#{m.rank}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <span style={{ fontSize: "0.8rem", color: m.rank === 1 ? "var(--text)" : "var(--text-muted)", fontWeight: m.rank === 1 ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "64%" }}>{m.syndrome}</span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", fontWeight: 700, color: ms?.color ?? color, opacity: m.rank === 1 ? 1 : 0.6 }}>{m.confidence}%</span>
                          </div>
                          <div style={{ height: 3, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.confidence}%` }}
                              transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              style={{ height: "100%", borderRadius: 100, background: m.rank === 1 ? `linear-gradient(90deg,${ms?.color ?? color},var(--cyan))` : (ms?.color ?? "rgba(255,255,255,0.2)"), opacity: m.rank === 1 ? 1 : 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* All 34 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <AllScores scores={result.all_scores} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
}
