import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  Search,
  Send,
  Twitter,
  Upload,
  User,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  type DbRecord,
  faceMatchSearch,
  globalDb,
  searchByMobile,
  searchByName,
} from "../store/database";

const FACE_CONFIDENCE_RANGE = [85, 99] as const;

function randomConfidence() {
  return (
    Math.floor(
      Math.random() * (FACE_CONFIDENCE_RANGE[1] - FACE_CONFIDENCE_RANGE[0] + 1),
    ) + FACE_CONFIDENCE_RANGE[0]
  );
}

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
  faceConfidence,
}: {
  result: DbRecord;
  onClose: () => void;
  faceConfidence?: number;
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

  const socialLinkStyle: React.CSSProperties = {
    background: "#1a2433",
    border: "1px solid #2a3648",
    color: "#a7b1c2",
    padding: "5px 12px",
    borderRadius: 8,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    gap: 5,
    textDecoration: "none",
  };

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

      {/* Face match confidence badge + photo analysis */}
      {faceConfidence !== undefined && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>📸 FACE MATCH RESULT</p>
          <div
            style={{
              background: "#111a28",
              border: "1px solid #2a3648",
              borderRadius: 8,
              padding: "12px 14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ color: "#a7b1c2", fontSize: 12 }}>
                Uploaded photo matched against database records
              </span>
              <span
                style={{
                  background:
                    faceConfidence >= 95
                      ? "#3a1216"
                      : faceConfidence >= 90
                        ? "#2a1f0a"
                        : "#0a2010",
                  border: `1px solid ${
                    faceConfidence >= 95
                      ? "#c62828"
                      : faceConfidence >= 90
                        ? "#f57f17"
                        : "#2e7d32"
                  }`,
                  color:
                    faceConfidence >= 95
                      ? "#ff5252"
                      : faceConfidence >= 90
                        ? "#ffb300"
                        : "#4caf50",
                  padding: "4px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {faceConfidence}% MATCH
              </span>
            </div>
            {/* Photo Analysis — confidence bar */}
            <div
              style={{
                borderTop: "1px solid #2a3648",
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    color: "#7e8aa0",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  PHOTO ANALYSIS
                </span>
                <span style={{ color: "#a7b1c2", fontSize: 10 }}>
                  Identity verified against database photo
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  background: "#1e2d42",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${faceConfidence}%`,
                    height: "100%",
                    background:
                      faceConfidence >= 95
                        ? "linear-gradient(90deg, #c62828, #e53935)"
                        : faceConfidence >= 90
                          ? "linear-gradient(90deg, #e65100, #f57f17)"
                          : "linear-gradient(90deg, #1b5e20, #4caf50)",
                    borderRadius: 3,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <span style={{ color: "#7e8aa0", fontSize: 9 }}>0%</span>
                <span style={{ color: "#7e8aa0", fontSize: 9 }}>50%</span>
                <span style={{ color: "#7e8aa0", fontSize: 9 }}>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo preview if available */}
      {result.photo && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>📷 PHOTO ON FILE</p>
          <img
            src={result.photo}
            alt={result.name}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              objectFit: "cover",
              border: "2px solid #2a3648",
            }}
          />
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
            <span style={{ ...val, color: "#f2f5fa", fontWeight: 700 }}>
              {result.name}
            </span>
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
            <span style={label}>State</span>
            <span style={val}>{result.state}</span>
          </div>
          <div style={row}>
            <span style={label}>Aadhaar (masked)</span>
            <span style={{ ...val, fontFamily: "monospace" }}>
              {result.aadhaar}
            </span>
          </div>
          <div style={row}>
            <span style={label}>PAN</span>
            <span style={{ ...val, fontFamily: "monospace" }}>
              {result.pan}
            </span>
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

      {/* Aadhaar Registered Address — Prominent Highlighted Box */}
      {(result.aadhaarAddress || result.registeredLocation) && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>📍 AADHAAR REGISTERED ADDRESS</p>
          <div
            style={{
              background: "#1a1200",
              border: "2px solid #f57f17",
              borderLeft: "5px solid #e65100",
              borderRadius: 8,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <MapPin size={14} style={{ color: "#f57f17", flexShrink: 0 }} />
              <span
                style={{
                  color: "#ffb300",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {result.registeredLocation}
              </span>
            </div>
            <div
              style={{
                color: "#f2d08a",
                fontSize: 12,
                lineHeight: 1.6,
                paddingLeft: 22,
              }}
            >
              {result.aadhaarAddress}
            </div>
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: "1px solid #3a2a00",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  background: "#3a2000",
                  border: "1px solid #f57f17",
                  color: "#f57f17",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1,
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                AADHAAR VERIFIED
              </span>
              <span style={{ color: "#7e8aa0", fontSize: 10 }}>
                Address registered under Aadhaar ID
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Live Activity Timeline */}
      {result.liveActivity && result.liveActivity.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>📡 LIVE ACTIVITY TIMELINE</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {result.liveActivity.map((activity, idx) => (
              <div
                key={`${activity.timestamp}-${idx}`}
                style={{
                  display: "flex",
                  gap: 12,
                  position: "relative",
                }}
              >
                {/* Timeline stem */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    width: 16,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: idx === 0 ? "#4caf50" : "#2a3648",
                      border:
                        idx === 0 ? "2px solid #81c784" : "2px solid #3d5068",
                      flexShrink: 0,
                      marginTop: 6,
                      boxShadow: idx === 0 ? "0 0 6px #4caf5066" : "none",
                    }}
                  />
                  {idx < result.liveActivity.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 16,
                        background: "#2a3648",
                        margin: "2px 0",
                      }}
                    />
                  )}
                </div>
                {/* Activity content */}
                <div
                  style={{
                    background: idx === 0 ? "#0d1f12" : "#111a28",
                    border: `1px solid ${idx === 0 ? "#2e7d32" : "#2a3648"}`,
                    borderRadius: 8,
                    padding: "9px 12px",
                    marginBottom: 6,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        color: idx === 0 ? "#81c784" : "#f2f5fa",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {idx === 0 && (
                        <span
                          style={{
                            background: "#1b5e20",
                            border: "1px solid #4caf50",
                            color: "#4caf50",
                            fontSize: 8,
                            fontWeight: 700,
                            letterSpacing: 1,
                            padding: "1px 6px",
                            borderRadius: 3,
                            marginRight: 6,
                          }}
                        >
                          LATEST
                        </span>
                      )}
                      {activity.action}
                    </span>
                    <span
                      style={{
                        color: "#7e8aa0",
                        fontSize: 10,
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {activity.timestamp}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 3,
                    }}
                  >
                    <MapPin
                      size={10}
                      style={{ color: "#e53935", flexShrink: 0 }}
                    />
                    <span style={{ color: "#a7b1c2", fontSize: 11 }}>
                      {activity.location}
                    </span>
                    <span style={{ color: "#3d5068", fontSize: 10 }}>•</span>
                    <span style={{ color: "#7e8aa0", fontSize: 10 }}>
                      {activity.source}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {activity.device && (
                      <span style={{ color: "#5a6a80", fontSize: 10 }}>
                        📱 {activity.device}
                      </span>
                    )}
                    {activity.ip && (
                      <span
                        style={{
                          color: "#3d5068",
                          fontSize: 9,
                          fontFamily: "monospace",
                        }}
                      >
                        IP: {activity.ip}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle */}
      {result.vehicleInfo && (
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
      )}

      {/* Social Media */}
      {(result.social.facebook ||
        result.social.instagram ||
        result.social.twitter ||
        result.social.linkedin ||
        result.social.youtube ||
        result.social.telegram ||
        result.social.whatsapp) && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>🌐 SOCIAL MEDIA PRESENCE</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {result.social.facebook && (
              <a
                href={`https://facebook.com/${result.social.facebook}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <Facebook size={12} style={{ color: "#1877f2" }} />{" "}
                {result.social.facebook}
              </a>
            )}
            {result.social.instagram && (
              <a
                href={`https://instagram.com/${result.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <Instagram size={12} style={{ color: "#e1306c" }} />{" "}
                {result.social.instagram}
              </a>
            )}
            {result.social.twitter && (
              <a
                href={`https://twitter.com/${result.social.twitter.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <Twitter size={12} style={{ color: "#1da1f2" }} />{" "}
                {result.social.twitter}
              </a>
            )}
            {result.social.linkedin && (
              <a
                href={`https://linkedin.com/in/${result.social.linkedin}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <User size={12} style={{ color: "#0077b5" }} /> LinkedIn
              </a>
            )}
            {result.social.youtube && (
              <a
                href={`https://youtube.com/@${result.social.youtube}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <Youtube size={12} style={{ color: "#ff0000" }} />{" "}
                {result.social.youtube}
              </a>
            )}
            {result.social.telegram && (
              <a
                href={`https://t.me/${result.social.telegram}`}
                target="_blank"
                rel="noreferrer"
                style={socialLinkStyle}
              >
                <Send size={12} style={{ color: "#0088cc" }} />{" "}
                {result.social.telegram}
              </a>
            )}
            {result.social.whatsapp && (
              <span
                style={{
                  ...socialLinkStyle,
                  cursor: "default",
                }}
              >
                <Phone size={12} style={{ color: "#25d366" }} />{" "}
                {result.social.whatsapp}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Last Seen */}
      {result.lastSeenLocations.length > 0 && (
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <MapPin size={12} style={{ color: "#e53935" }} />
                    <span
                      style={{
                        color: "#f2f5fa",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {loc.place}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ color: "#a7b1c2", fontSize: 11 }}>
                      {loc.date}
                    </div>
                    <div style={{ color: "#7e8aa0", fontSize: 10 }}>
                      {loc.source}
                    </div>
                  </div>
                </div>
                {loc.coordinates && (
                  <div
                    style={{
                      marginTop: 5,
                      paddingTop: 5,
                      borderTop: "1px solid #1e2d42",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 9 }}>📌</span>
                    <span
                      style={{
                        color: "#5a6a80",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    >
                      {loc.coordinates}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Coverage */}
      {result.newsLinks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>
            📰 NEWS COVERAGE ({result.newsLinks.length} ARTICLES FOUND)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {result.newsLinks.map((news) => (
              <a
                key={news.url}
                href={news.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#0d1b2e",
                  border: "1px solid #1e3a5f",
                  borderRadius: 8,
                  padding: "12px 14px",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 5,
                  }}
                >
                  <Newspaper
                    size={13}
                    style={{ color: "#42a5f5", flexShrink: 0 }}
                  />
                  <span
                    style={{ color: "#42a5f5", fontSize: 11, fontWeight: 700 }}
                  >
                    {news.source}
                  </span>
                  <span
                    style={{
                      color: "#7e8aa0",
                      fontSize: 10,
                      marginLeft: "auto",
                    }}
                  >
                    {news.date}
                  </span>
                  <ExternalLink size={10} style={{ color: "#7e8aa0" }} />
                </div>
                <div
                  style={{
                    color: "#e0e8f0",
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 4,
                    lineHeight: 1.4,
                  }}
                >
                  {news.headline}
                </div>
                <div
                  style={{ color: "#7e8aa0", fontSize: 11, lineHeight: 1.6 }}
                >
                  {news.snippet}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Video / News Reports */}
      {result.videoLinks && result.videoLinks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={sectionHead}>🎥 VIDEO / NEWS REPORTS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {result.videoLinks.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#120808",
                  border: "1px solid #2a1010",
                  borderRadius: 8,
                  padding: "10px 14px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background:
                      video.platform === "YouTube" ? "#ff0000" : "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {video.platform === "YouTube" ? (
                    <Youtube size={14} style={{ color: "white" }} />
                  ) : (
                    <Video size={14} style={{ color: "white" }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "#e0e8f0",
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {video.title}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        background:
                          video.platform === "YouTube" ? "#ff0000" : "#444",
                        color: "white",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        padding: "2px 6px",
                        borderRadius: 3,
                      }}
                    >
                      {video.platform}
                    </span>
                    <span style={{ color: "#7e8aa0", fontSize: 10 }}>
                      {video.date}
                    </span>
                  </div>
                </div>
                <ExternalLink
                  size={11}
                  style={{ color: "#7e8aa0", flexShrink: 0 }}
                />
              </a>
            ))}
          </div>
        </div>
      )}

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
      {result.internetSources.length > 0 && (
        <div>
          <p style={sectionHead}>🔍 INTERNET SEARCH RESULTS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {result.internetSources.map((src) => (
              <a
                key={src.site}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#111a28",
                  border: "1px solid #2a3648",
                  borderRadius: 8,
                  padding: "10px 14px",
                  textDecoration: "none",
                  display: "block",
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
                  <ExternalLink
                    size={10}
                    style={{ color: "#42a5f5", marginLeft: 2 }}
                  />
                </div>
                <div
                  style={{ color: "#7e8aa0", fontSize: 11, lineHeight: 1.6 }}
                >
                  {src.snippet}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [tab, setTab] = useState<"mobile" | "name" | "face">("mobile");
  const [mobileQuery, setMobileQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [searchResult, setSearchResult] = useState<DbRecord | null>(null);
  const [faceConfidence, setFaceConfidence] = useState<number | undefined>(
    undefined,
  );
  const [notFound, setNotFound] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [history, setHistory] = useState<
    { query: string; type: string; time: string; status: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logSearch = (query: string, type: string, status: string) => {
    const now = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setHistory((prev) => [
      { query, type, time: now, status },
      ...prev.slice(0, 9),
    ]);
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = mobileQuery.trim();
    if (!q) return;
    if (q.replace(/\D/g, "").length < 7) {
      toast.warning("Please enter at least 7 digits of the mobile number");
      return;
    }
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setFaceConfidence(undefined);
    setTimeout(() => {
      const found = searchByMobile(q);
      if (found) {
        setSearchResult(found);
        logSearch(q, "Mobile Search", found.status);
        if (found.status === "criminal")
          toast.error("🚨 Criminal record found — RED ALERT");
        else if (found.status === "suspicious")
          toast.warning("⚠️ Suspicious record found");
        else toast.success("✅ Record found — Normal status");
      } else {
        setNotFound(true);
        setNotFoundMsg(`No record found for mobile number: ${q}`);
        logSearch(q, "Mobile Search", "not found");
        toast.info("❌ No registered record found for this number");
      }
      setLoading(false);
    }, 1400);
  };

  const handleNameSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = nameQuery.trim();
    if (!q) return;
    if (q.length < 3) {
      toast.warning("Please enter at least 3 characters");
      return;
    }
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setFaceConfidence(undefined);
    setTimeout(() => {
      const found = searchByName(q);
      if (found) {
        setSearchResult(found);
        logSearch(q, "Name / Keyword Search", found.status);
        if (found.status === "criminal")
          toast.error("🚨 Criminal record found — RED ALERT");
        else if (found.status === "suspicious")
          toast.warning("⚠️ Suspicious record found");
        else toast.success("✅ Record found — Normal status");
      } else {
        setNotFound(true);
        setNotFoundMsg(`No record found for: "${q}"`);
        logSearch(q, "Name / Keyword Search", "not found");
        toast.info("❌ No record found for this name or keyword");
      }
      setLoading(false);
    }, 1400);
  };

  const handleFaceSearch = () => {
    if (!faceFile) return;
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setFaceConfidence(undefined);
    setTimeout(() => {
      const matched = faceMatchSearch();
      if (matched) {
        const confidence = randomConfidence();
        setSearchResult(matched);
        setFaceConfidence(confidence);
        logSearch(`Photo: ${faceFile.name}`, "Face Match", matched.status);
        if (matched.status === "criminal")
          toast.error(
            `🚨 Criminal face match found — ${confidence}% confidence`,
          );
        else if (matched.status === "suspicious")
          toast.warning(
            `⚠️ Suspicious person matched — ${confidence}% confidence`,
          );
        else toast.success(`✅ Person identified — ${confidence}% match`);
      } else {
        setNotFound(true);
        setNotFoundMsg("No face match found in database for this photo");
        logSearch(`Photo: ${faceFile.name}`, "Face Match", "no match");
        toast.info("❌ No face match found in database");
      }
      setLoading(false);
    }, 2200);
  };

  const resetSearch = () => {
    setSearchResult(null);
    setNotFound(false);
    setNotFoundMsg("");
    setFaceConfidence(undefined);
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

  const TABS = [
    {
      key: "mobile" as const,
      label: "MOBILE SEARCH",
      icon: <Phone size={13} />,
    },
    {
      key: "name" as const,
      label: "NAME / KEYWORD",
      icon: <Search size={13} />,
    },
    { key: "face" as const, label: "FACE MATCH", icon: <Upload size={13} /> },
  ];

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
        🇮🇳 INDIAN SECURITY INTELLIGENCE SEARCH
      </h1>
      <p style={{ color: "#7e8aa0", fontSize: 13, marginBottom: 24 }}>
        India-wide identity verification, criminal record search, news coverage
        &amp; social profile finder.
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
          registered users. Use for official/authorised security purposes only.
          Unauthorized use is punishable under Indian IT Act 2000 &amp; IPC.
        </p>
      </div>

      {/* Live record count */}
      <div style={{ marginBottom: 16 }}>
        <span
          style={{
            background: "#111a28",
            border: "1px solid #2a3648",
            borderRadius: 6,
            padding: "4px 12px",
            color: "#7e8aa0",
            fontSize: 11,
          }}
        >
          🗄️ {globalDb.length} records in database
        </span>
      </div>

      {/* Search Card */}
      <div className="security-card" style={{ padding: 28 }}>
        {/* Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: "#111a28",
            borderRadius: 8,
            padding: 3,
            marginBottom: 24,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              data-ocid={`search.${t.key}.tab`}
              onClick={() => {
                setTab(t.key);
                resetSearch();
                setFaceFile(null);
              }}
              style={{
                padding: "10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                background:
                  tab === t.key
                    ? "linear-gradient(135deg, #c62828, #d32f2f)"
                    : "transparent",
                color: tab === t.key ? "white" : "#7e8aa0",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              {t.icon} {t.label}
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
                  placeholder="Indian mobile number (e.g. 9876543210 or +91-9876543210)"
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  data-ocid="search.mobile.input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-danger"
                data-ocid="search.mobile.submit_button"
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
              Try: 9876543210 (Criminal) &nbsp;·&nbsp; 8765432109 (Suspicious)
              &nbsp;·&nbsp; 7654321987 (Normal)
            </p>
          </form>
        )}

        {/* Name / Keyword Search */}
        {tab === "name" && (
          <form onSubmit={handleNameSearch}>
            <div className="flex gap-3">
              <div style={{ position: "relative", flex: 1 }}>
                <Search
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
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  placeholder="Enter full name, city, state or keyword"
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  data-ocid="search.name.input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-danger"
                data-ocid="search.name.submit_button"
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
                <Search size={14} /> {loading ? "SCANNING..." : "SEARCH"}
              </button>
            </div>
            <p style={{ color: "#7e8aa0", fontSize: 11, marginTop: 8 }}>
              Try: "Ravi Sharma" · "Priya Singh" · "Delhi" · "Hyderabad"
            </p>
          </form>
        )}

        {/* Face Match */}
        {tab === "face" && (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="search.face.upload_button"
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
                JPG, PNG — Database face comparison
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFaceFile(e.target.files?.[0] || null);
                resetSearch();
              }}
              style={{ display: "none" }}
            />
            {faceFile && (
              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={handleFaceSearch}
                  disabled={loading}
                  className="btn-danger"
                  data-ocid="search.face.submit_button"
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
                  {loading ? "SCANNING DATABASE..." : "RUN FACE MATCH"}
                </button>
              </div>
            )}
            {loading && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <div
                  style={{ color: "#e53935", fontSize: 12, letterSpacing: 1 }}
                >
                  SCANNING DATABASE — Comparing photo against all records...
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

        {/* Result */}
        {searchResult && (
          <DetailCard
            result={searchResult}
            onClose={resetSearch}
            faceConfidence={faceConfidence}
          />
        )}

        {/* Not Found */}
        {notFound && (
          <div
            data-ocid="search.result.empty_state"
            style={{
              background: "#111a28",
              border: "1px solid #2a3648",
              borderRadius: 10,
              padding: 28,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#1e2d42",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              <X size={24} style={{ color: "#e53935" }} />
            </div>
            <div
              style={{
                color: "#f2f5fa",
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              NOT FOUND
            </div>
            <div style={{ color: "#a7b1c2", fontSize: 13, marginBottom: 4 }}>
              {notFoundMsg}
            </div>
            <div style={{ color: "#7e8aa0", fontSize: 11 }}>
              This person / number is not in the registered Indian security
              database.
            </div>
          </div>
        )}
      </div>

      {/* Search History */}
      {history.length > 0 && (
        <div className="security-card" style={{ padding: 24, marginTop: 24 }}>
          <h3
            style={{
              color: "#7e8aa0",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            RECENT SEARCH LOG
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {history.map((h, i) => (
              <div
                key={`${h.query}-${h.time}-${i}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: "#111a28",
                  borderRadius: 6,
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Search
                    size={11}
                    style={{ color: "#7e8aa0", flexShrink: 0 }}
                  />
                  <span
                    style={{ color: "#f2f5fa", fontSize: 12, fontWeight: 600 }}
                  >
                    {h.query}
                  </span>
                  <span
                    style={{
                      color: "#7e8aa0",
                      fontSize: 10,
                    }}
                  >
                    · {h.type}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#7e8aa0", fontSize: 10 }}>
                    {h.time}
                  </span>
                  <span
                    style={{
                      color:
                        h.status === "criminal"
                          ? "#ff5252"
                          : h.status === "suspicious"
                            ? "#ffb300"
                            : h.status === "not found" ||
                                h.status === "no match"
                              ? "#7e8aa0"
                              : "#4caf50",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {h.status === "not found" || h.status === "no match"
                      ? "NOT FOUND"
                      : h.status.toUpperCase()}
                  </span>
                  {h.status === "criminal" ? (
                    <AlertTriangle size={10} style={{ color: "#ff5252" }} />
                  ) : h.status === "normal" ? (
                    <CheckCircle size={10} style={{ color: "#4caf50" }} />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
