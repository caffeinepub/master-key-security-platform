import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Search,
  Upload,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const MOCK_USERS = [
  {
    id: 1,
    name: "Marcus T. Thompson",
    mobile: "+1-555-0124",
    address: "247 East Harbor Blvd, Apt 3B, Los Angeles, CA 90012",
    status: "criminal",
    flagReason:
      "Warrant active: Armed robbery, Level 4. Multiple prior convictions.",
    matchPct: null,
  },
  {
    id: 2,
    name: "Sarah L. Chen",
    mobile: "+1-555-0198",
    address: "88 Riverview Dr, San Francisco, CA 94110",
    status: "suspicious",
    flagReason: "Under investigation. Linked to financial fraud network.",
    matchPct: null,
  },
  {
    id: 3,
    name: "James O. Williams",
    mobile: "+1-555-0201",
    address: "1502 Maple Street, Chicago, IL 60601",
    status: "normal",
    flagReason: null,
    matchPct: null,
  },
];

type SearchResult = (typeof MOCK_USERS)[0] & { matchPct?: number | null };

const DISCLAIMER =
  "This platform only shows data of registered users. Unauthorized use, stalking, or misuse is punishable under law. Admin may share user activity with law enforcement authorities.";

function ResultCard({
  result,
  onClose,
}: { result: SearchResult; onClose: () => void }) {
  const isCriminal = result.status === "criminal";
  const isSuspicious = result.status === "suspicious";

  return (
    <div
      style={{
        background: isCriminal
          ? "#1a0810"
          : isSuspicious
            ? "#1a1208"
            : "#1a2433",
        border: isCriminal
          ? "2px solid #c62828"
          : isSuspicious
            ? "2px solid #f57f17"
            : "1px solid #2a3648",
        borderRadius: 12,
        padding: 24,
        marginTop: 24,
        position: "relative",
      }}
      className={isCriminal ? "criminal-alert" : ""}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "none",
          border: "none",
          color: "#7e8aa0",
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>

      {isCriminal && (
        <div
          className="slide-in alert-blink"
          style={{
            background: "#7f0000",
            border: "1px solid #e53935",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle
            size={18}
            style={{ color: "#ff5252", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                color: "#ff5252",
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: 1,
              }}
            >
              🚨 CRIMINAL RECORD — RED ALERT
            </div>
            <div style={{ color: "#ff8a80", fontSize: 12, marginTop: 2 }}>
              {result.flagReason}
            </div>
          </div>
        </div>
      )}

      {isSuspicious && (
        <div
          style={{
            background: "#2a1500",
            border: "1px solid #f57f17",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle
            size={16}
            style={{ color: "#ffb300", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                color: "#ffb300",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 1,
              }}
            >
              ⚠️ SUSPICIOUS RECORD
            </div>
            <div style={{ color: "#ffd54f", fontSize: 12, marginTop: 2 }}>
              {result.flagReason}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 10,
            background: "#111a28",
            border: `2px solid ${isCriminal ? "#c62828" : isSuspicious ? "#f57f17" : "#2a3648"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User
            size={28}
            style={{
              color: isCriminal
                ? "#e53935"
                : isSuspicious
                  ? "#ffb300"
                  : "#7e8aa0",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-3 flex-wrap">
            <h3
              style={{
                color: "#f2f5fa",
                fontWeight: 800,
                fontSize: 18,
                margin: 0,
              }}
            >
              {result.name}
            </h3>
            {result.matchPct && (
              <span
                style={{
                  background: "#1a3a1a",
                  border: "1px solid #2e7d32",
                  color: "#4caf50",
                  padding: "2px 10px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                FACE MATCH: {result.matchPct}%
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <div className="flex items-center gap-2">
              <Phone size={13} style={{ color: "#7e8aa0", flexShrink: 0 }} />
              <span style={{ color: "#a7b1c2", fontSize: 13 }}>
                {result.mobile}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin
                size={13}
                style={{ color: "#7e8aa0", flexShrink: 0, marginTop: 2 }}
              />
              <span style={{ color: "#a7b1c2", fontSize: 13 }}>
                {result.address}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 12px",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                ...(isCriminal
                  ? {
                      background: "#3a1216",
                      border: "1px solid #c62828",
                      color: "#ff5252",
                    }
                  : isSuspicious
                    ? {
                        background: "#2a1f0a",
                        border: "1px solid #f57f17",
                        color: "#ffb300",
                      }
                    : {
                        background: "#0a2010",
                        border: "1px solid #2e7d32",
                        color: "#4caf50",
                      }),
              }}
            >
              {isCriminal && <AlertTriangle size={11} />}
              {isSuspicious && <AlertTriangle size={11} />}
              {!isCriminal && !isSuspicious && <CheckCircle size={11} />}
              {result.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [tab, setTab] = useState<"mobile" | "face">("mobile");
  const [mobileQuery, setMobileQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [history, setHistory] = useState<
    { query: string; type: string; time: string; status: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logSearch = (query: string, type: string, status: string) => {
    setHistory((prev) => [
      { query, type, time: "just now", status },
      ...prev.slice(0, 9),
    ]);
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileQuery.trim()) return;
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setTimeout(() => {
      const found = MOCK_USERS.find((u) =>
        u.mobile.includes(mobileQuery.trim()),
      );
      if (found) {
        setSearchResult(found);
        logSearch(mobileQuery, "Mobile Search", found.status);
        if (found.status === "criminal")
          toast.error("🚨 Criminal record found — RED ALERT");
        else if (found.status === "suspicious")
          toast.warning("⚠️ Suspicious record found");
        else toast.success("✅ Record found — Normal status");
      } else {
        setNotFound(true);
        logSearch(mobileQuery, "Mobile Search", "not found");
        toast.info("No registered record found for this number");
      }
      setLoading(false);
    }, 1200);
  };

  const handleFaceSearch = () => {
    if (!faceFile) return;
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setTimeout(() => {
      // Simulate 97% match with first user (criminal for demo effect)
      const matched = {
        ...MOCK_USERS[0],
        matchPct: 97,
      } as unknown as SearchResult;
      setSearchResult(matched);
      logSearch(`Photo: ${faceFile.name}`, "Face Match", matched.status);
      toast.error("🚨 Criminal match found — 97% confidence");
      setLoading(false);
    }, 2000);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    background: "#111a28",
    border: "1px solid #2a3648",
    borderRadius: 8,
    color: "#f2f5fa",
    fontSize: 14,
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
        SECURITY INTELLIGENCE SEARCH
      </h1>
      <p style={{ color: "#7e8aa0", fontSize: 13, marginBottom: 24 }}>
        Locate and verify individuals within the registered network.
      </p>

      {/* Disclaimer */}
      <div
        style={{
          background: "#3a1216",
          border: "1px solid #c62828",
          borderLeft: "4px solid #e53935",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 24,
        }}
      >
        <p
          style={{ color: "#ff8a80", fontSize: 12, margin: 0, lineHeight: 1.6 }}
        >
          <strong>⚠️ LEGAL NOTICE:</strong> {DISCLAIMER}
        </p>
      </div>

      {/* Search Card */}
      <div className="security-card" style={{ padding: 28 }}>
        {/* Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#111a28",
            borderRadius: 8,
            padding: 3,
            marginBottom: 24,
          }}
        >
          {(["mobile", "face"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setSearchResult(null);
                setNotFound(false);
              }}
              style={{
                padding: "10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                background:
                  tab === t
                    ? "linear-gradient(135deg, #c62828, #d32f2f)"
                    : "transparent",
                color: tab === t ? "white" : "#7e8aa0",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {t === "mobile" ? (
                <>
                  <Phone size={13} /> MOBILE SEARCH
                </>
              ) : (
                <>
                  <Upload size={13} /> FACE MATCH
                </>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Search */}
        {tab === "mobile" && (
          <form onSubmit={handleMobileSearch}>
            <div className="flex gap-3">
              <div style={{ position: "relative", flex: 1 }}>
                <Phone
                  size={14}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7e8aa0",
                  }}
                />
                <input
                  type="text"
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value)}
                  placeholder="Enter mobile number..."
                  style={{ ...inputStyle, paddingLeft: 36 }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-danger"
                style={{
                  padding: "12px 24px",
                  fontSize: 13,
                  letterSpacing: 1,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Search size={14} />
                {loading ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>
            <p style={{ color: "#7e8aa0", fontSize: 11, marginTop: 8 }}>
              Try: +1-555-0124 (Criminal), +1-555-0198 (Suspicious), +1-555-0201
              (Normal)
            </p>
          </form>
        )}

        {/* Face Match */}
        {tab === "face" && (
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "2px dashed #2a3648",
                borderRadius: 10,
                padding: 36,
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s",
                background: "#0f1928",
              }}
            >
              <Upload
                size={32}
                style={{ color: "#7e8aa0", margin: "0 auto 12px" }}
              />
              <div style={{ color: "#a7b1c2", fontSize: 14, fontWeight: 600 }}>
                {faceFile
                  ? faceFile.name
                  : "Click to upload photo for face match"}
              </div>
              <div style={{ color: "#7e8aa0", fontSize: 12, marginTop: 4 }}>
                JPG, PNG supported
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFaceFile(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
            </div>
            {faceFile && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleFaceSearch}
                  disabled={loading}
                  className="btn-danger"
                  style={{
                    padding: "10px 24px",
                    fontSize: 13,
                    letterSpacing: 1,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Search size={14} />
                  {loading ? "ANALYZING FACE..." : "RUN FACE MATCH"}
                </button>
              </div>
            )}
            {loading && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <div
                  style={{ color: "#e53935", fontSize: 12, letterSpacing: 1 }}
                >
                  ANALYZING FACIAL BIOMETRICS...
                </div>
                <div
                  style={{
                    width: 200,
                    height: 4,
                    background: "#1e2d42",
                    borderRadius: 2,
                    margin: "8px auto",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "60%",
                      height: "100%",
                      background: "linear-gradient(90deg, #c62828, #e53935)",
                      borderRadius: 2,
                      animation: "accordion-down 0.5s ease infinite alternate",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {searchResult && (
          <ResultCard
            result={searchResult}
            onClose={() => setSearchResult(null)}
          />
        )}
        {notFound && (
          <div
            style={{
              background: "#111a28",
              border: "1px solid #2a3648",
              borderRadius: 10,
              padding: 24,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <User
              size={32}
              style={{ color: "#7e8aa0", margin: "0 auto 10px" }}
            />
            <div style={{ color: "#a7b1c2", fontSize: 14, fontWeight: 600 }}>
              No matching record found
            </div>
            <div style={{ color: "#7e8aa0", fontSize: 12, marginTop: 4 }}>
              This number is not in the registered database
            </div>
          </div>
        )}
      </div>

      {/* Search History */}
      {history.length > 0 && (
        <div className="security-card" style={{ padding: 24, marginTop: 24 }}>
          <h3
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1,
              margin: "0 0 16px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Clock size={14} style={{ color: "#7e8aa0" }} />
            MY SEARCH HISTORY
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: "#111a28",
                  border: "1px solid #1e2d42",
                  borderRadius: 8,
                }}
              >
                <div>
                  <span style={{ color: "#a7b1c2", fontSize: 13 }}>
                    {h.query}
                  </span>
                  <span
                    style={{ color: "#7e8aa0", fontSize: 11, marginLeft: 8 }}
                  >
                    — {h.type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 10,
                      ...(h.status === "criminal"
                        ? { background: "#3a1216", color: "#ff5252" }
                        : h.status === "suspicious"
                          ? { background: "#2a1f0a", color: "#ffb300" }
                          : h.status === "not found"
                            ? { background: "#1e2d42", color: "#7e8aa0" }
                            : { background: "#0a2010", color: "#4caf50" }),
                    }}
                  >
                    {h.status.toUpperCase()}
                  </span>
                  <span style={{ color: "#7e8aa0", fontSize: 11 }}>
                    {h.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
