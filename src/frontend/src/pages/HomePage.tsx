import {
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  Lock,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Registered Users", value: "12,847", icon: Users, color: "#4caf50" },
  {
    label: "Active Alerts",
    value: "234",
    icon: AlertTriangle,
    color: "#e53935",
  },
  {
    label: "Criminal Records",
    value: "89",
    icon: AlertTriangle,
    color: "#ff5252",
  },
  { label: "Searches Today", value: "1,203", icon: Search, color: "#42a5f5" },
];

const features = [
  {
    icon: Search,
    title: "Intelligent Search",
    desc: "Search by mobile number or upload a photo for face match verification with up to 97% accuracy.",
  },
  {
    icon: Shield,
    title: "Criminal Flagging",
    desc: "Instantly identify criminal records with RED ALERT notifications and severity classifications.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data is encrypted in transit and at rest. IP tracking and activity logging for full audit trail.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    desc: "Admin dashboard with live search logs, suspicious activity reports, and system alerts.",
  },
  {
    icon: FileText,
    title: "Comprehensive Reports",
    desc: "Export detailed reports in PDF/Excel format. Full audit trails available for law enforcement.",
  },
  {
    icon: CheckCircle,
    title: "Role-Based Access",
    desc: "Strict role-based access control. Admin and member accounts with 2FA support.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0b1220 0%, #0e182a 60%, #1a0810 100%)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(211,47,47,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          <div className="flex justify-center mb-6">
            <div
              style={{
                background: "linear-gradient(135deg, #b71c1c, #d32f2f)",
                borderRadius: 20,
                padding: 20,
                boxShadow: "0 0 40px rgba(211,47,47,0.4)",
              }}
            >
              <Shield size={48} color="white" />
            </div>
          </div>

          <div
            className="slide-in"
            style={{
              color: "#e53935",
              fontSize: 12,
              letterSpacing: 4,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            CLASSIFIED ACCESS PLATFORM
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#f2f5fa",
              lineHeight: 1.1,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            MASTER<span style={{ color: "#e53935" }}>KEY</span> 🔐
          </h1>
          <h2
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              color: "#a7b1c2",
              fontWeight: 400,
              marginBottom: 24,
              letterSpacing: 1,
            }}
          >
            Security Intelligence Platform
          </h2>
          <p
            style={{
              color: "#7e8aa0",
              maxWidth: 600,
              margin: "0 auto 40px",
              lineHeight: 1.7,
              fontSize: 15,
            }}
          >
            A secure, role-based intelligence platform for authorized personnel
            to verify identities, flag criminal records, and monitor suspicious
            activity within the registered database.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button
                type="button"
                className="btn-danger"
                style={{
                  padding: "12px 32px",
                  fontSize: 14,
                  letterSpacing: 1,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                🔐 SECURE LOGIN
              </button>
            </Link>
            <Link to="/about">
              <button
                type="button"
                style={{
                  padding: "12px 32px",
                  fontSize: 14,
                  letterSpacing: 1,
                  border: "1px solid #2a3648",
                  background: "transparent",
                  color: "#a7b1c2",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Banner */}
      <div
        style={{
          background: "#3a1216",
          border: "1px solid #c62828",
          borderLeft: "4px solid #e53935",
          padding: "14px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#ff8a80", fontSize: 13, margin: 0 }}>
          <strong>⚠️ LEGAL NOTICE:</strong> This platform only shows data of
          registered users. Unauthorized use, stalking, or misuse is punishable
          under law. Admin may share user activity with law enforcement
          authorities.
        </p>
      </div>

      {/* Stats Bar */}
      <section
        style={{
          background: "#0f1928",
          padding: "32px 24px",
          borderBottom: "1px solid #1e2d42",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  style={{ color: stat.color, fontSize: 28, fontWeight: 900 }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "#7e8aa0",
                    fontSize: 12,
                    letterSpacing: 1,
                    marginTop: 4,
                  }}
                >
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            style={{
              textAlign: "center",
              color: "#f2f5fa",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 48,
            }}
          >
            PLATFORM CAPABILITIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="security-card fade-in-up"
                style={{ padding: 24 }}
              >
                <div
                  style={{
                    background: "rgba(211,47,47,0.1)",
                    borderRadius: 8,
                    padding: 10,
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <f.icon size={20} style={{ color: "#e53935" }} />
                </div>
                <h3
                  style={{
                    color: "#f2f5fa",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "#7e8aa0",
                    fontSize: 13,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Warning */}
      <section style={{ padding: "0 24px 64px" }}>
        <div className="max-w-5xl mx-auto">
          <div
            style={{
              background: "#1a2433",
              border: "1px solid #2a3648",
              borderRadius: 12,
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Lock
              size={32}
              style={{ color: "#e53935", margin: "0 auto 16px" }}
            />
            <h3
              style={{
                color: "#f2f5fa",
                fontWeight: 800,
                fontSize: 18,
                marginBottom: 12,
              }}
            >
              AUTHORIZED PERSONNEL ONLY
            </h3>
            <p
              style={{
                color: "#7e8aa0",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto 24px",
              }}
            >
              Access to this platform is restricted to verified and authorized
              users only. All activities are monitored, logged, and subject to
              legal review. Misuse of this platform will result in immediate
              account termination and legal action.
            </p>
            <Link to="/privacy">
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: "1px solid #2a3648",
                  color: "#a7b1c2",
                  padding: "8px 20px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                READ PRIVACY POLICY
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
