import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Search,
  Twitter,
  Upload,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Simulated Internet-Wide Database ───────────────────────────────────────
const FULL_DATABASE = [
  {
    id: 1,
    name: "Marcus T. Thompson",
    mobile: "+1-555-0124",
    altNumbers: ["+1-555-9901", "+1-800-0124"],
    address: "247 East Harbor Blvd, Apt 3B, Los Angeles, CA 90012",
    email: "m.thompson.la@gmail.com",
    dob: "1984-06-15",
    nationality: "American",
    status: "criminal" as const,
    flagReason:
      "Warrant active: Armed robbery, Level 4. Multiple prior convictions.",
    criminalHistory: [
      {
        year: "2019",
        crime: "Armed Robbery",
        court: "LA Superior Court",
        verdict: "Convicted",
      },
      {
        year: "2021",
        crime: "Assault & Battery",
        court: "LA Superior Court",
        verdict: "Convicted",
      },
      {
        year: "2024",
        crime: "Warrant Issued — Assault",
        court: "Federal",
        verdict: "Pending",
      },
    ],
    social: {
      facebook: "marcus.t.thompson.la",
      instagram: "@marcus_la_official",
      twitter: "@mthompson_la",
    },
    lastSeenLocations: [
      {
        place: "Los Angeles, CA",
        date: "2026-03-28",
        source: "Google Maps Check-in",
      },
      { place: "Las Vegas, NV", date: "2026-03-15", source: "Facebook Post" },
      { place: "San Diego, CA", date: "2026-02-20", source: "Instagram Tag" },
    ],
    internetSources: [
      {
        site: "Court Records LA",
        url: "#",
        snippet:
          "Marcus T. Thompson, Docket #LA-2024-4821, Warrant active for aggravated assault...",
      },
      {
        site: "Facebook",
        url: "#",
        snippet:
          "Profile found: Marcus Thompson, Los Angeles. 342 friends. Last active 3 days ago.",
      },
      {
        site: "LinkedIn",
        url: "#",
        snippet:
          "Marcus Thompson — Former Security Guard at Harbor Corp (2018–2020)",
      },
      {
        site: "Instagram",
        url: "#",
        snippet:
          "@marcus_la_official — 892 followers. Recent posts tagged in Las Vegas.",
      },
    ],
    vehicleInfo: "2019 Black Toyota Camry — CA Plate: 7XYZ-321",
    associates: [
      "James R. (Accomplice — Docket #LA-2022)",
      "Unknown Female — alias 'Red'",
    ],
  },
  {
    id: 2,
    name: "Sarah L. Chen",
    mobile: "+1-555-0198",
    altNumbers: ["+1-555-7721"],
    address: "88 Riverview Dr, San Francisco, CA 94110",
    email: "sarah.chen.sf@protonmail.com",
    dob: "1991-11-02",
    nationality: "American (Chinese origin)",
    status: "suspicious" as const,
    flagReason: "Under investigation. Linked to financial fraud network.",
    criminalHistory: [
      {
        year: "2023",
        crime: "Wire Fraud Investigation",
        court: "Federal",
        verdict: "Under Review",
      },
    ],
    social: {
      facebook: "sarah.lchen.sf",
      instagram: "@sarahchen_bay",
      twitter: "@slchen_finance",
    },
    lastSeenLocations: [
      {
        place: "San Francisco, CA",
        date: "2026-04-02",
        source: "LinkedIn Activity",
      },
      { place: "New York, NY", date: "2026-03-10", source: "Twitter Post" },
    ],
    internetSources: [
      {
        site: "Federal Court Records",
        url: "#",
        snippet:
          "Sarah L. Chen — Case #FED-2023-7721, Wire fraud investigation ongoing...",
      },
      {
        site: "LinkedIn",
        url: "#",
        snippet:
          "Sarah Chen — Financial Analyst at BayTech Investments. 500+ connections.",
      },
      {
        site: "Twitter",
        url: "#",
        snippet:
          "@slchen_finance — Account suspended. Last tweet flagged for suspicious links.",
      },
    ],
    vehicleInfo: "2022 Silver Honda Civic — CA Plate: 9ABC-112",
    associates: ["David K. (Co-accused in fraud)", "Unknown offshore entity"],
  },
  {
    id: 3,
    name: "James O. Williams",
    mobile: "+1-555-0201",
    altNumbers: [],
    address: "1502 Maple Street, Chicago, IL 60601",
    email: "james.williams.chi@outlook.com",
    dob: "1979-03-20",
    nationality: "American",
    status: "normal" as const,
    flagReason: null,
    criminalHistory: [],
    social: {
      facebook: "james.o.williams.chi",
      instagram: "@jameswilliams_chi",
      twitter: "",
    },
    lastSeenLocations: [
      { place: "Chicago, IL", date: "2026-04-04", source: "Facebook Check-in" },
    ],
    internetSources: [
      {
        site: "LinkedIn",
        url: "#",
        snippet:
          "James Williams — Software Engineer at Midwest Solutions. No criminal record found.",
      },
      {
        site: "Facebook",
        url: "#",
        snippet:
          "James O. Williams, Chicago. Active community member. 1.2K friends.",
      },
    ],
    vehicleInfo: "2020 Blue Ford F-150 — IL Plate: IL-4432",
    associates: [],
  },
];

type DbRecord = (typeof FULL_DATABASE)[0];
type SearchResult = DbRecord & { matchPct?: number; matchSource?: string };

const FACE_MATCH_SOURCES = [
  {
    source: "Facebook",
    detail: "Profile photo matched on public account 'marcus.t.thompson.la'",
    confidence: 97,
    date: "2026-04-01",
  },
  {
    source: "Instagram",
    detail:
      "Photo matched in @marcus_la_official story — tagged in Las Vegas, NV",
    confidence: 94,
    date: "2026-03-28",
  },
  {
    source: "CCTV Database",
    detail:
      "Face matched in Harbor District CCTV footage — 2026-03-28 11:42 AM",
    confidence: 91,
    date: "2026-03-28",
  },
  {
    source: "Court Records",
    detail: "Mugshot on file — LA Superior Court Docket #LA-2024-4821",
    confidence: 99,
    date: "2024-08-15",
  },
  {
    source: "LinkedIn",
    detail: "Profile photo match — Former employee page still active",
    confidence: 88,
    date: "2026-02-10",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "criminal")
    return (
      <span
        style={{
          background: "#3a1216",
          border: "1px solid #c62828",
          color: "#ff5252",
          padding: "3px 10px",
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        🚨 CRIMINAL
      </span>
    );
  if (status === "suspicious")
    return (
      <span
        style={{
          background: "#2a1f0a",
          border: "1px solid #f57f17",
          color: "#ffb300",
          padding: "3px 10px",
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        ⚠️ SUSPICIOUS
      </span>
    );
  return (
    <span
      style={{
        background: "#0a2010",
        border: "1px solid #2e7d32",
        color: "#4caf50",
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      ✅ NORMAL
    </span>
  );
}

function DetailCard({
  result,
  onClose,
  faceMatchSources,
}: {
  result: SearchResult;
  onClose: () => void;
  faceMatchSources?: typeof FACE_MATCH_SOURCES;
}) {
  const isCriminal = result.status === "criminal";
  const isSuspicious = result.status === "suspicious";
  const sectionHead: React.CSSProperties = {
    color: "#e53935",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 0,
    borderBottom: "1px solid #2a3648",
    paddingBottom: 6,
  };
  const row: React.CSSProperties = {
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    marginBottom: 6,
  };
  const label: React.CSSProperties = {
    color: "#7e8aa0",
    fontSize: 11,
    minWidth: 110,
    fontWeight: 600,
  };
  const val: React.CSSProperties = { color: "#a7b1c2", fontSize: 12 };

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
        type="button"
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

      {/* Alert Banner */}
      {isCriminal && (
        <div
          className="slide-in alert-blink"
          style={{
            background: "#7f0000",
            border: "1px solid #e53935",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 20,
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
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle
            size={16}
            style={{ color: "#ffb300", flexShrink: 0 }}
          />
          <div style={{ color: "#ffb300", fontWeight: 700, fontSize: 13 }}>
            ⚠️ SUSPICIOUS — {result.flagReason}
          </div>
        </div>
      )}

      {/* Face match sources */}
      {faceMatchSources && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>
            📸 FACE MATCH FOUND ON ({faceMatchSources.length} SOURCES)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faceMatchSources.map((fm) => (
              <div
                key={fm.source}
                style={{
                  background: "#111a28",
                  border: "1px solid #2a3648",
                  borderRadius: 8,
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "#f2f5fa",
                      fontWeight: 700,
                      fontSize: 12,
                      marginBottom: 2,
                    }}
                  >
                    {fm.source}
                  </div>
                  <div
                    style={{ color: "#a7b1c2", fontSize: 11, lineHeight: 1.5 }}
                  >
                    {fm.detail}
                  </div>
                  <div style={{ color: "#7e8aa0", fontSize: 10, marginTop: 3 }}>
                    Date: {fm.date}
                  </div>
                </div>
                <span
                  style={{
                    background:
                      fm.confidence >= 95
                        ? "#3a1216"
                        : fm.confidence >= 90
                          ? "#2a1f0a"
                          : "#0a2010",
                    border: `1px solid ${fm.confidence >= 95 ? "#c62828" : fm.confidence >= 90 ? "#f57f17" : "#2e7d32"}`,
                    color:
                      fm.confidence >= 95
                        ? "#ff5252"
                        : fm.confidence >= 90
                          ? "#ffb300"
                          : "#4caf50",
                    padding: "3px 10px",
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {fm.confidence}% MATCH
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Identity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div>
          <p style={sectionHead}>👤 IDENTITY</p>
          <div style={row}>
            <span style={label}>Full Name</span>
            <span style={val}>{result.name}</span>
          </div>
          <div style={row}>
            <span style={label}>Date of Birth</span>
            <span style={val}>{result.dob}</span>
          </div>
          <div style={row}>
            <span style={label}>Nationality</span>
            <span style={val}>{result.nationality}</span>
          </div>
          <div style={row}>
            <span style={label}>Status</span>
            <StatusBadge status={result.status} />
          </div>
        </div>
        <div>
          <p style={sectionHead}>📞 CONTACT</p>
          <div style={row}>
            <Phone size={11} style={{ color: "#7e8aa0", marginTop: 2 }} />
            <span style={val}>{result.mobile}</span>
          </div>
          {result.altNumbers.map((n) => (
            <div key={n} style={row}>
              <Phone size={11} style={{ color: "#2a3648", marginTop: 2 }} />
              <span style={{ ...val, color: "#7e8aa0" }}>{n} (alt)</span>
            </div>
          ))}
          <div style={row}>
            <Mail size={11} style={{ color: "#7e8aa0", marginTop: 2 }} />
            <span style={val}>{result.email}</span>
          </div>
          <div style={row}>
            <MapPin size={11} style={{ color: "#7e8aa0", marginTop: 2 }} />
            <span style={val}>{result.address}</span>
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <div style={{ marginBottom: 20 }}>
        <p style={sectionHead}>🚗 VEHICLE INFO</p>
        <div
          style={{
            ...val,
            background: "#111a28",
            border: "1px solid #2a3648",
            borderRadius: 6,
            padding: "8px 12px",
            fontFamily: "monospace",
          }}
        >
          {result.vehicleInfo}
        </div>
      </div>

      {/* Social Media */}
      <div style={{ marginBottom: 20 }}>
        <p style={sectionHead}>🌐 SOCIAL MEDIA PRESENCE</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
          {result.social.facebook && (
            <span
              style={{
                background: "#1a2433",
                border: "1px solid #2a3648",
                color: "#a7b1c2",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Facebook size={12} /> {result.social.facebook}
            </span>
          )}
          {result.social.instagram && (
            <span
              style={{
                background: "#1a2433",
                border: "1px solid #2a3648",
                color: "#a7b1c2",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Instagram size={12} /> {result.social.instagram}
            </span>
          )}
          {result.social.twitter && (
            <span
              style={{
                background: "#1a2433",
                border: "1px solid #2a3648",
                color: "#a7b1c2",
                padding: "5px 12px",
                borderRadius: 8,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Twitter size={12} /> {result.social.twitter}
            </span>
          )}
        </div>
      </div>

      {/* Last Seen Locations */}
      <div style={{ marginBottom: 20 }}>
        <p style={sectionHead}>📍 LAST SEEN LOCATIONS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {result.lastSeenLocations.map((loc) => (
            <div
              key={`${loc.place}-${loc.date}`}
              style={{
                background: "#111a28",
                border: "1px solid #2a3648",
                borderRadius: 6,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={12} style={{ color: "#e53935" }} />
                <span
                  style={{ color: "#f2f5fa", fontSize: 12, fontWeight: 600 }}
                >
                  {loc.place}
                </span>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ color: "#a7b1c2", fontSize: 11 }}>{loc.date}</div>
                <div style={{ color: "#7e8aa0", fontSize: 10 }}>
                  {loc.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Criminal History */}
      {result.criminalHistory.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>⚖️ CRIMINAL / LEGAL HISTORY</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {result.criminalHistory.map((c) => (
              <div
                key={`${c.year}-${c.crime}`}
                style={{
                  background: "#3a1216",
                  border: "1px solid #7f1010",
                  borderRadius: 6,
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ color: "#ff8a80", fontSize: 12, fontWeight: 700 }}
                  >
                    {c.crime}
                  </div>
                  <div style={{ color: "#7e8aa0", fontSize: 10 }}>
                    {c.court} — {c.year}
                  </div>
                </div>
                <span
                  style={{
                    color: c.verdict === "Convicted" ? "#ff5252" : "#ffb300",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {c.verdict}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Associates */}
      {result.associates.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>🔗 KNOWN ASSOCIATES</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {result.associates.map((a) => (
              <div
                key={a}
                style={{
                  color: "#a7b1c2",
                  fontSize: 12,
                  padding: "4px 0",
                  borderBottom: "1px solid #1e2d42",
                }}
              >
                • {a}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internet Sources */}
      <div>
        <p style={sectionHead}>🔍 INTERNET SEARCH RESULTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {result.internetSources.map((src) => (
            <div
              key={src.site}
              style={{
                background: "#111a28",
                border: "1px solid #2a3648",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <Globe size={11} style={{ color: "#42a5f5" }} />
                <span
                  style={{ color: "#42a5f5", fontSize: 12, fontWeight: 700 }}
                >
                  {src.site}
                </span>
                <ExternalLink size={10} style={{ color: "#42a5f5" }} />
              </div>
              <div style={{ color: "#7e8aa0", fontSize: 11, lineHeight: 1.6 }}>
                {src.snippet}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [tab, setTab] = useState<"mobile" | "face">("mobile");
  const [mobileQuery, setMobileQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [faceMatchSources, setFaceMatchSources] = useState<
    typeof FACE_MATCH_SOURCES | undefined
  >(undefined);
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
    setFaceMatchSources(undefined);
    setTimeout(() => {
      const found = FULL_DATABASE.find(
        (u) =>
          u.mobile.includes(mobileQuery.trim()) ||
          u.altNumbers.some((n) => n.includes(mobileQuery.trim())),
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
    }, 1400);
  };

  const handleFaceSearch = () => {
    if (!faceFile) return;
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setFaceMatchSources(undefined);
    setTimeout(() => {
      const matched = {
        ...FULL_DATABASE[0],
        matchPct: 97,
        matchSource: "Facebook / CCTV",
      };
      setSearchResult(matched);
      setFaceMatchSources(FACE_MATCH_SOURCES);
      logSearch(`Photo: ${faceFile.name}`, "Face Match", matched.status);
      toast.error(
        "🚨 Criminal face match found — 97% confidence across 5 sources",
      );
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
    <div style={{ padding: "32px 24px", maxWidth: 960, margin: "0 auto" }}>
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
        Full internet-wide identity verification and criminal record search
        engine.
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
          <strong>⚠️ LEGAL NOTICE:</strong> This platform only shows data of
          registered users. Unauthorized use, stalking, or misuse is punishable
          under law.
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
              type="button"
              onClick={() => {
                setTab(t);
                setSearchResult(null);
                setNotFound(false);
                setFaceMatchSources(undefined);
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
                  placeholder="Enter mobile number (e.g. +1-555-0124)"
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
                <Search size={14} /> {loading ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>
            <p style={{ color: "#7e8aa0", fontSize: 11, marginTop: 8 }}>
              Try: +1-555-0124 (Criminal) · +1-555-0198 (Suspicious) ·
              +1-555-0201 (Normal)
            </p>
          </form>
        )}

        {/* Face Match */}
        {tab === "face" && (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                border: "2px dashed #2a3648",
                borderRadius: 10,
                padding: 36,
                textAlign: "center",
                cursor: "pointer",
                background: "#0f1928",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Upload size={32} style={{ color: "#7e8aa0" }} />
              <div style={{ color: "#a7b1c2", fontSize: 14, fontWeight: 600 }}>
                {faceFile
                  ? faceFile.name
                  : "Click to upload photo for face match"}
              </div>
              <div style={{ color: "#7e8aa0", fontSize: 12 }}>
                JPG, PNG supported — Cross-platform face match
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFaceFile(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
            {faceFile && (
              <div className="flex justify-end mt-3">
                <button
                  type="button"
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
                  <Search size={14} />{" "}
                  {loading ? "SCANNING ALL SOURCES..." : "RUN FACE MATCH"}
                </button>
              </div>
            )}
            {loading && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <div
                  style={{ color: "#e53935", fontSize: 12, letterSpacing: 1 }}
                >
                  SCANNING: Facebook · Instagram · CCTV · Court DB · LinkedIn...
                </div>
                <div
                  style={{
                    width: 260,
                    height: 4,
                    background: "#1e2d42",
                    borderRadius: 2,
                    margin: "8px auto",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      background: "linear-gradient(90deg, #c62828, #e53935)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {searchResult && (
          <DetailCard
            result={searchResult}
            onClose={() => {
              setSearchResult(null);
              setFaceMatchSources(undefined);
            }}
            faceMatchSources={faceMatchSources}
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
            <Clock size={14} style={{ color: "#7e8aa0" }} /> MY SEARCH HISTORY
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map((h) => (
              <div
                key={`${h.query}-${h.time}-${h.type}`}
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
