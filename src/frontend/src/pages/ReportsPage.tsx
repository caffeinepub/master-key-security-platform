import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_REPORTS = [
  {
    id: "RPT-001",
    reporter: "Officer #441",
    target: "+1-555-0144",
    description:
      "Subject seen loitering near restricted zone multiple times. Possible surveillance activity.",
    status: "under review",
    time: "2026-03-20 14:22",
    priority: "high",
  },
  {
    id: "RPT-002",
    reporter: "Analyst #117",
    target: "+1-555-0098",
    description:
      "Frequent calls to flagged numbers. Communication pattern matches known criminal network structure.",
    status: "escalated",
    time: "2026-03-22 09:15",
    priority: "critical",
  },
  {
    id: "RPT-003",
    reporter: "Officer #204",
    target: "+44-7700-900456",
    description:
      "Individual using multiple SIM cards. Identity verification inconclusive.",
    status: "resolved",
    time: "2026-03-25 16:40",
    priority: "medium",
  },
];

export default function ReportsPage() {
  const [form, setForm] = useState({
    mobile: "",
    description: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"submit" | "list">("submit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Suspicious activity report submitted");
    }, 1000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    background: "#111a28",
    border: "1px solid #2a3648",
    borderRadius: 8,
    color: "#f2f5fa",
    fontSize: 13,
    outline: "none",
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: 900, margin: "0 auto" }}>
      <h1
        style={{
          color: "#f2f5fa",
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: 2,
          marginBottom: 4,
        }}
      >
        REPORTS
      </h1>
      <p style={{ color: "#7e8aa0", fontSize: 13, marginBottom: 24 }}>
        Submit suspicious activity reports or view existing filed reports.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["submit", "list"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={
              {
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                background:
                  tab === t
                    ? "linear-gradient(135deg, #c62828, #d32f2f)"
                    : "#1a2433",
                color: tab === t ? "white" : "#7e8aa0",
                outline: tab === t ? "none" : "1px solid #2a3648",
              } as React.CSSProperties
            }
          >
            {t === "submit" ? "FILE REPORT" : "VIEW REPORTS"}
          </button>
        ))}
      </div>

      {tab === "submit" && (
        <div style={{ maxWidth: 560 }}>
          {submitted ? (
            <div
              className="security-card fade-in-up"
              style={{ padding: 32, textAlign: "center" }}
            >
              <CheckCircle
                size={48}
                style={{ color: "#4caf50", margin: "0 auto 16px" }}
              />
              <h2
                style={{
                  color: "#4caf50",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                Report Submitted
              </h2>
              <p style={{ color: "#a7b1c2", fontSize: 13, marginBottom: 24 }}>
                Your report has been logged and assigned reference number{" "}
                <strong style={{ color: "#f2f5fa" }}>
                  RPT-{Date.now().toString().slice(-4)}
                </strong>
                . Authorities will review within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ mobile: "", description: "", location: "" });
                }}
                className="btn-danger"
                style={{
                  padding: "10px 24px",
                  fontSize: 13,
                  letterSpacing: 1,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                FILE ANOTHER REPORT
              </button>
            </div>
          ) : (
            <div className="security-card" style={{ padding: 28 }}>
              <h2
                style={{
                  color: "#f2f5fa",
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: 1,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertTriangle size={16} style={{ color: "#e53935" }} />
                REPORT SUSPICIOUS ACTIVITY
              </h2>

              <div
                style={{
                  background: "#3a1216",
                  border: "1px solid #c62828",
                  borderLeft: "4px solid #e53935",
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 20,
                }}
              >
                <p style={{ color: "#ff8a80", fontSize: 11, margin: 0 }}>
                  ⚠️ False reports are a punishable offense. Provide accurate
                  information only.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label
                    style={{
                      color: "#7e8aa0",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    SUSPECT'S MOBILE NUMBER
                  </label>
                  <div style={{ position: "relative" }}>
                    <User
                      size={13}
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#7e8aa0",
                      }}
                    />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, mobile: e.target.value }))
                      }
                      placeholder="+1 (555) 000-0000"
                      style={{ ...inputStyle, paddingLeft: 30 }}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      color: "#7e8aa0",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    LOCATION (OPTIONAL)
                  </label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={13}
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#7e8aa0",
                      }}
                    />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, location: e.target.value }))
                      }
                      placeholder="Location of incident"
                      style={{ ...inputStyle, paddingLeft: 30 }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      color: "#7e8aa0",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    DESCRIPTION OF SUSPICIOUS ACTIVITY
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Provide detailed description of the suspicious activity..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-danger"
                  style={{
                    padding: "12px",
                    fontSize: 13,
                    letterSpacing: 1,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Send size={14} />
                  {loading ? "SUBMITTING..." : "SUBMIT REPORT"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {tab === "list" && (
        <div className="flex flex-col gap-4">
          {SAMPLE_REPORTS.map((report) => (
            <div
              key={report.id}
              className="security-card"
              style={{
                padding: 20,
                borderLeft:
                  report.priority === "critical"
                    ? "4px solid #e53935"
                    : report.priority === "high"
                      ? "4px solid #f57f17"
                      : "4px solid #2e7d32",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span
                      style={{
                        color: "#7e8aa0",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      {report.id}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        ...(report.priority === "critical"
                          ? { background: "#3a1216", color: "#ff5252" }
                          : report.priority === "high"
                            ? { background: "#2a1500", color: "#ff7043" }
                            : { background: "#0a2010", color: "#4caf50" }),
                      }}
                    >
                      {report.priority.toUpperCase()}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 700,
                        background: "#1e2d42",
                        color: "#a7b1c2",
                        letterSpacing: 0.5,
                      }}
                    >
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#a7b1c2",
                      fontSize: 13,
                      margin: "0 0 10px",
                      lineHeight: 1.5,
                    }}
                  >
                    {report.description}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span style={{ color: "#7e8aa0", fontSize: 11 }}>
                      Target:{" "}
                      <span
                        style={{ color: "#a7b1c2", fontFamily: "monospace" }}
                      >
                        {report.target}
                      </span>
                    </span>
                    <span style={{ color: "#7e8aa0", fontSize: 11 }}>
                      Filed by: {report.reporter}
                    </span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    color: "#7e8aa0",
                    fontSize: 11,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Clock size={11} />
                  {report.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
