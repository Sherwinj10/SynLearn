import { AlertCircle } from "lucide-react";

export const MODES = [
  { id: "", name: "Surprise Me (Random Mode)" },
  { id: "Case-Based Diagnosis", name: "Case-Based Diagnosis" },
  { id: "Feature Identification", name: "Feature Identification" },
  { id: "Syndrome Builder", name: "Syndrome Builder" },
  { id: "Differential Diagnosis", name: "Differential Diagnosis" },
  { id: "Reverse Mapping", name: "Reverse Mapping" },
  { id: "Missing Feature Prediction", name: "Missing Feature Prediction" },
];

interface QuizSetupProps {
  mode: string;
  setMode: (mode: string) => void;
  onGenerate: () => void;
  loading: boolean;
  error: string | null;
}

export function QuizSetup({ mode, setMode, onGenerate, loading, error }: QuizSetupProps) {
  return (
    <div className="card" style={{ padding: 24, marginBottom: 32 }}>
      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
        Select Game Mode
      </label>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            flex: 1, minWidth: 200, padding: "12px 16px", borderRadius: 12,
            background: "var(--surface-2)", border: "1px solid var(--border)",
            color: "var(--text)", fontSize: "0.95rem", outline: "none",
            cursor: "pointer", fontFamily: "inherit"
          }}
        >
          {MODES.map(m => <option key={m.name} value={m.id}>{m.name}</option>)}
        </select>
        <button
          className="btn btn-primary"
          onClick={onGenerate}
          disabled={loading}
          style={{ padding: "12px 24px", minWidth: 160 }}
        >
          {loading ? "Generating..." : "Generate Question"}
        </button>
      </div>
      {error && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: "rgba(229,65,43,0.1)", color: "#e5412b", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}
    </div>
  );
}
