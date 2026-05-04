"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, RefreshCw } from "lucide-react";
import Link from "next/link";

const SEGS = [
  { id: 1, label: "Nasal floor", side: "Left" },
  { id: 2, label: "Lip", side: "Left" },
  { id: 3, label: "Alveolus", side: "Left" },
  { id: 4, label: "Hard palate (ant. to incisive foramen)", side: "Left" },
  { id: 5, label: "Nasal floor", side: "Right" },
  { id: 6, label: "Lip", side: "Right" },
  { id: 7, label: "Alveolus", side: "Right" },
  { id: 8, label: "Hard palate (ant. to incisive foramen)", side: "Right" },
  { id: 9, label: "Hard palate (post. to incisive foramen)", side: "Left — double-lined" },
  { id: 10, label: "Hard palate (post. to incisive foramen)", side: "Right — double-lined" },
  { id: 11, label: "Soft palate", side: "Midline" },
  { id: 12, label: "Pharynx (VP competence circle)", side: "Midline — Elsahy" },
  { id: 13, label: "Premaxilla", side: "Midline — Elsahy" },
];

const COLORS: Record<string, string> = {
  none: "#22a06b",
  unrep: "#e5412b",
  rep: "#c08a00",
  sub: "#7b4fc4",
  default: "#e8e2d8"
};

const LABELS: Record<string, string> = {
  none: "No Cleft",
  unrep: "Unrepaired",
  rep: "Repaired",
  sub: "Submucous"
};

const VPD_LABELS: Record<string, string> = {
  none: "Adequate VP closure — no VPD",
  mild: "Mild VPD — occasional nasal emission",
  moderate: "Moderate VPD — consistent hypernasality",
  severe: "Severe VPD — significant velopharyngeal insufficiency"
};

export default function StripedYPage() {
  const [state, setState] = useState<Record<number, string | null>>({});
  const [selSeg, setSelSeg] = useState<number | null>(null);
  const [vpd, setVpd] = useState<string | null>(null);

  const handleStatus = (status: string) => {
    if (selSeg) {
      setState(p => ({ ...p, [selSeg]: status }));
    }
  };

  const resetAll = () => {
    setState({});
    setSelSeg(null);
    setVpd(null);
  };

  const getFill = (id: number) => {
    const s = state[id];
    return s ? COLORS[s] : COLORS.default;
  };

  // Logic conversions
  const hasCleft = (id: number) => state[id] && state[id] !== "none";
  const anySet = Object.values(state).some(s => s !== null && s !== undefined);

  const lahsal = useMemo(() => {
    const sym = (id: number) => {
      const s = state[id];
      if (!s || s === "none") return "—";
      if (s === "unrep") return "●";
      if (s === "rep") return "+";
      if (s === "sub") return "◌";
      return "—";
    };
    const hpS = [4, 9, 10, 8].map(i => state[i]).find(s => s && s !== "none") || null;
    const symS = (s: string | null) => {
      if (!s || s === "none") return "—";
      if (s === "unrep") return "●";
      if (s === "rep") return "+";
      if (s === "sub") return "◌";
      return "—";
    };
    return `${sym(2)} ${sym(3)} ${symS(hpS)} ${sym(11)} ${sym(7)} ${sym(6)}`;
  }, [state]);

  const classif = useMemo(() => {
    const lipL = hasCleft(2), lipR = hasCleft(6), alvL = hasCleft(3), alvR = hasCleft(7);
    const hp = hasCleft(4) || hasCleft(8) || hasCleft(9) || hasCleft(10);
    const sp = hasCleft(11), pmx = hasCleft(13);
    const left = lipL || alvL || hasCleft(4) || hasCleft(1);
    const right = lipR || alvR || hasCleft(8) || hasCleft(5);

    let lat = left && right ? "Bilateral" : left ? "Unilateral Left" : right ? "Unilateral Right" : hp || sp ? "Midline" : "—";
    let type = "No Cleft Identified", detail = "";

    if (lipL || lipR) {
      if ((alvL || alvR) && (hp || sp)) { type = "Complete Cleft"; detail = "Lip + Alveolus + Palate"; }
      else if (alvL || alvR) { type = "Cleft Lip & Alveolus"; detail = "Lip and alveolus; palate intact"; }
      else if (hp || sp) { type = "Cleft Lip & Palate"; detail = "Without alveolar involvement"; }
      else { type = "Cleft Lip"; detail = "Isolated lip cleft"; }
    } else if ((alvL || alvR) && (hp || sp)) { type = "Cleft Alveolus & Palate"; detail = "Without lip involvement"; }
    else if (hp || sp) { type = "Cleft Palate"; detail = "Palate only"; }

    const submOnly = [9, 10, 11].filter(id => state[id] === "sub");
    if (!type.includes("Cleft") && submOnly.length) { type = "Submucous Cleft Palate"; detail = "Intact mucosa; submucosal defect"; }

    const anyU = SEGS.some(s => state[s.id] === "unrep");
    const anyR = SEGS.some(s => state[s.id] === "rep");
    const repStatus = anyU && anyR ? "Partial Repair" : anyR ? "Post-operative" : anyU ? "Unrepaired" : "—";

    if (pmx) detail += (detail ? " + " : "") + "Premaxillary protrusion (Seg 13)";

    const aff = SEGS.filter(s => state[s.id] && state[s.id] !== "none").length;
    const sev = aff === 0 ? "—" : aff <= 2 ? "Mild" : aff <= 6 ? "Moderate" : "Severe";

    return { type, detail, lat, repStatus, sev, aff, submOnly };
  }, [state]);

  const activeSegment = SEGS.find(s => s.id === selSeg);

  const implications = useMemo(() => {
    const impls = [];
    if (hasCleft(2) || hasCleft(6)) impls.push("Labial sound articulation /p/ /b/ /m/");
    if (hasCleft(3) || hasCleft(7)) impls.push("Alveolar consonants /t/ /d/ /n/ /l/");
    if (hasCleft(4) || hasCleft(8) || hasCleft(9) || hasCleft(10)) impls.push("VPI screening; VP imaging");
    if (hasCleft(11)) impls.push("Hypernasality, nasal emission assessment");
    if (hasCleft(12)) impls.push("Nasopharyngoscopy; VP closure evaluation");
    if (hasCleft(13)) impls.push("Premaxillary protrusion assessment; orthodontic referral");
    if (vpd === "severe") impls.push("Severe VPD — surgical review / prosthetic management");
    else if (vpd === "moderate") impls.push("Moderate VPD — VP imaging + SLP therapy");
    else if (vpd === "mild") impls.push("Mild VPD — resonance therapy; monitor VP closure");
    return impls;
  }, [state, vpd]);

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--bg)", fontFamily: "var(--sans)" }}>
      {/* Header */}
      <header style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" className="btn btn-ghost" style={{ padding: "8px 12px" }}><ArrowLeft size={16} /> Back</Link>
          <div>
            <h1 style={{ fontFamily: "var(--display)", fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Millard + Elsahy Modified Stripped "Y"</h1>
            {/* <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>Millard + Elsahy Modified Stripped "Y"</p> */}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={resetAll} className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: "0.85rem" }}><RefreshCw size={14} /> Reset</button>
          <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}><Printer size={14} /> PDF Report</button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Top grid: Diagram on Left, Controls on Right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* Left Column: SVG Diagram */}
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>Anatomical Diagram</h2>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", marginBottom: 16, background: "var(--surface-2)", padding: 8, borderRadius: 6 }}>
              Click any numbered segment → select status on the right
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 260 520" style={{ width: "100%", maxWidth: 300, overflow: "visible" }}>
                <text x="14" y="330" fontWeight="700" fontSize="11" fill="var(--text-muted)">R ←</text>
                <text x="208" y="330" fontWeight="700" fontSize="11" fill="var(--text-muted)">→ L</text>

                {/* Seg 13 */}
                <circle cx="130" cy="28" r="22" fill={getFill(13)} stroke={selSeg === 13 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 13 ? 3 : 1.5} onClick={() => setSelSeg(13)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="130" y="32" fontSize="11" textAnchor="middle" fontWeight="bold">13</text>

                <polygon points="60,56 100,56 80,30" fill="none" stroke="#3a3228" strokeWidth="1.5" strokeDasharray="4,2" />
                <polygon points="60,56 100,56 80,82" fill={getFill(1)} stroke={selSeg === 1 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 1 ? 3 : 1.5} onClick={() => setSelSeg(1)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="80" y="75" fontSize="11" textAnchor="middle" fontWeight="bold">1</text>

                <polygon points="160,56 200,56 180,30" fill="none" stroke="#3a3228" strokeWidth="1.5" strokeDasharray="4,2" />
                <polygon points="160,56 200,56 180,82" fill={getFill(5)} stroke={selSeg === 5 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 5 ? 3 : 1.5} onClick={() => setSelSeg(5)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="180" y="75" fontSize="11" textAnchor="middle" fontWeight="bold">5</text>

                <rect x="52" y="88" width="72" height="48" rx="3" fill={getFill(2)} stroke={selSeg === 2 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 2 ? 3 : 1.5} onClick={() => setSelSeg(2)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="88" y="116" fontSize="11" textAnchor="middle" fontWeight="bold">2</text>
                <rect x="136" y="88" width="72" height="48" rx="3" fill={getFill(6)} stroke={selSeg === 6 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 6 ? 3 : 1.5} onClick={() => setSelSeg(6)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="172" y="116" fontSize="11" textAnchor="middle" fontWeight="bold">6</text>

                <rect x="52" y="150" width="72" height="46" rx="3" fill={getFill(3)} stroke={selSeg === 3 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 3 ? 3 : 1.5} onClick={() => setSelSeg(3)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="88" y="177" fontSize="11" textAnchor="middle" fontWeight="bold">3</text>
                <rect x="136" y="150" width="72" height="46" rx="3" fill={getFill(7)} stroke={selSeg === 7 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 7 ? 3 : 1.5} onClick={() => setSelSeg(7)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="172" y="177" fontSize="11" textAnchor="middle" fontWeight="bold">7</text>

                <rect x="52" y="201" width="72" height="46" rx="3" fill={getFill(4)} stroke={selSeg === 4 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 4 ? 3 : 1.5} onClick={() => setSelSeg(4)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="88" y="228" fontSize="11" textAnchor="middle" fontWeight="bold">4</text>
                <rect x="136" y="201" width="72" height="46" rx="3" fill={getFill(8)} stroke={selSeg === 8 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 8 ? 3 : 1.5} onClick={() => setSelSeg(8)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="172" y="228" fontSize="11" textAnchor="middle" fontWeight="bold">8</text>

                <line x1="52" y1="248" x2="208" y2="248" stroke="#aaa" strokeWidth="1" strokeDasharray="4,2" />

                <rect x="94" y="261" width="72" height="36" rx="3" fill={getFill(9)} stroke={selSeg === 9 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 9 ? 3 : 1.5} onClick={() => setSelSeg(9)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <rect x="98" y="265" width="64" height="28" rx="2" fill="none" stroke="#3a3228" strokeWidth="1.1" pointerEvents="none" />
                <text x="130" y="283" fontSize="11" textAnchor="middle" fontWeight="bold">9</text>

                <rect x="94" y="299" width="72" height="36" rx="3" fill={getFill(10)} stroke={selSeg === 10 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 10 ? 3 : 1.5} onClick={() => setSelSeg(10)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <rect x="98" y="303" width="64" height="28" rx="2" fill="none" stroke="#3a3228" strokeWidth="1.1" pointerEvents="none" />
                <text x="130" y="321" fontSize="11" textAnchor="middle" fontWeight="bold">10</text>

                <rect x="94" y="340" width="72" height="40" rx="3" fill={getFill(11)} stroke={selSeg === 11 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 11 ? 3 : 1.5} onClick={() => setSelSeg(11)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="130" y="364" fontSize="11" textAnchor="middle" fontWeight="bold">11</text>

                <line x1="130" y1="359" x2="130" y2="400" stroke="#7b4fc4" strokeWidth="1.4" strokeDasharray="4,3" />

                <circle cx="130" cy="425" r="28" fill={getFill(12)} stroke={selSeg === 12 ? "var(--cyan)" : "#3a3228"} strokeWidth={selSeg === 12 ? 3 : 1.5} onClick={() => setSelSeg(12)} style={{ cursor: "pointer", transition: "all 0.2s" }} />
                <text x="130" y="429" fontSize="11" textAnchor="middle" fontWeight="bold">12</text>
              </svg>
            </div>
          </div>

          {/* Right Column: Status & VPD Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Selection Info */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Set Status for Segment</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16 }}>
                {activeSegment ? `Segment ${activeSegment.id} — ${activeSegment.label} (${activeSegment.side})` : "Click a segment on the diagram first"}
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { id: "none", label: "🟢 No Cleft", bg: "#e8f9f2", c: "#22a06b" },
                  { id: "unrep", label: "🔴 Unrepaired", bg: "#fdecea", c: "#e5412b" },
                  { id: "rep", label: "🟡 Repaired", bg: "#fef7e0", c: "#c08a00" },
                  { id: "sub", label: "🟣 Submucous", bg: "#f3edfb", c: "#7b4fc4" }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleStatus(b.id)}
                    style={{
                      flex: 1, minWidth: "45%", padding: "12px 16px", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600,
                      background: selSeg && state[selSeg] === b.id ? b.bg : "var(--surface)",
                      color: selSeg && state[selSeg] === b.id ? b.c : "var(--text)",
                      border: `1.5px solid ${selSeg && state[selSeg] === b.id ? b.c : "var(--border)"}`,
                      opacity: selSeg ? 1 : 0.5,
                      cursor: selSeg ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* VPD Selector */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>VP Competence</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16 }}>Assessed via dotted line to Pharynx circle (Seg 12)</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { id: "none", label: "✅ Adequate VP", c: "#22a06b" },
                  { id: "mild", label: "🟡 Mild VPD", c: "#c08a00" },
                  { id: "moderate", label: "🔶 Mod VPD", c: "#e5412b" },
                  { id: "severe", label: "🔴 Severe VPD", c: "#7b4fc4" }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setVpd(b.id)}
                    style={{
                      padding: "12px 16px", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600,
                      background: vpd === b.id ? `${b.c}15` : "var(--surface)",
                      color: vpd === b.id ? b.c : "var(--text)",
                      border: `1.5px solid ${vpd === b.id ? b.c : "var(--border)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom grid: Classification & Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start", marginTop: 8 }}>

          {/* Auto-Classification */}
          <div className="card" style={{ padding: 24, minHeight: 300 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>Auto-Classification</h2>

            {!anySet ? (
              <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", textAlign: "center", padding: "48px 0" }}>
                Select segment statuses to generate classification.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ background: "var(--surface-2)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Cleft Type</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--cyan)" }}>{classif.type}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{classif.detail || "—"}</div>
                  </div>
                  <div style={{ background: "var(--surface-2)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Laterality</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700 }}>{classif.lat}</div>
                  </div>
                  <div style={{ background: "var(--surface-2)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Severity</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700 }}>{classif.sev}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{classif.aff} segment(s) affected</div>
                  </div>
                  <div style={{ background: "var(--surface-2)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Repair Status</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700 }}>{classif.repStatus}</div>
                  </div>
                </div>

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 20, borderRadius: 8, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>LAHSAL:</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "1.3rem", letterSpacing: "0.2em", fontWeight: 600, color: "var(--cyan)" }}>{lahsal}</div>
                </div>
              </div>
            )}
          </div>

          {/* Clinical Summary */}
          <div className="card" style={{ padding: 24, minHeight: 300 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>Clinical Summary</h2>

            {!anySet ? (
              <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", textAlign: "center", padding: "48px 0" }}>
                No data selected yet.
              </div>
            ) : (
              <div style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text)" }}>
                <p style={{ marginBottom: 8 }}><b>Diagnosis:</b> {classif.type} — {classif.lat}.</p>
                <p style={{ marginBottom: 8 }}><b>Severity:</b> {classif.sev} ({classif.aff} segment[s]).</p>
                <p style={{ marginBottom: 8 }}><b>Repair Status:</b> {classif.repStatus}.</p>
                <p style={{ marginBottom: 12 }}><b>LAHSAL:</b> <code style={{ background: "var(--surface-2)", padding: "4px 8px", borderRadius: 4, fontFamily: "var(--mono)", fontSize: "1.05rem" }}>{lahsal}</code></p>
                {vpd && <p style={{ marginBottom: 8 }}><b>VP Competence:</b> <span style={{ fontWeight: 700, color: "var(--text)" }}>{VPD_LABELS[vpd]}</span></p>}

                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px dashed var(--border)" }}>
                  <b style={{ color: "var(--cyan)" }}>SLP Implications:</b><br />
                  {implications.length ? implications.join('; ') : 'Comprehensive evaluation recommended'}.
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
