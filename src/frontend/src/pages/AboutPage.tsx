import { Eye, FileText, Globe, Lock, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ padding: "48px 24px", maxWidth: 800, margin: "0 auto" }}>
      <div className="text-center mb-12">
        <div
          style={{
            background: "linear-gradient(135deg, #c62828, #d32f2f)",
            borderRadius: 16,
            padding: 16,
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 0 30px rgba(211,47,47,0.3)",
          }}
        >
          <Shield size={32} color="white" />
        </div>
        <h1
          style={{
            color: "#f2f5fa",
            fontWeight: 900,
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          ABOUT MASTERKEY
        </h1>
        <p style={{ color: "#7e8aa0", fontSize: 15, marginTop: 8 }}>
          Security Intelligence Platform
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="security-card" style={{ padding: 28 }}>
          <h2
            style={{
              color: "#e53935",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            OUR MISSION
          </h2>
          <p
            style={{
              color: "#a7b1c2",
              fontSize: 14,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            MASTERKEY is a secure, role-based identity verification and criminal
            intelligence platform designed for authorized security personnel.
            Our mission is to provide accurate, real-time intelligence to help
            law enforcement, security agencies, and authorized organizations
            identify, verify, and monitor individuals within their registered
            database — all while maintaining the highest standards of data
            security and legal compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Lock,
              title: "Military-Grade Encryption",
              desc: "All data is encrypted end-to-end using AES-256 with JWT-based authentication.",
            },
            {
              icon: Eye,
              title: "Real-Time Monitoring",
              desc: "Every search is logged with IP address, timestamp, and user identity for complete auditability.",
            },
            {
              icon: Users,
              title: "Role-Based Access",
              desc: "Strict separation between Admin and Member access levels with principle of least privilege.",
            },
            {
              icon: FileText,
              title: "Legal Compliance",
              desc: "Fully GDPR-compliant. All activity reports can be shared with law enforcement.",
            },
            {
              icon: Globe,
              title: "Face Recognition",
              desc: "Client-side face matching with 97%+ accuracy using advanced biometric analysis.",
            },
            {
              icon: Shield,
              title: "Auto-Protection",
              desc: "Suspicious login patterns trigger automatic account blocks and admin alerts.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="security-card"
              style={{ padding: 20 }}
            >
              <item.icon
                size={18}
                style={{ color: "#e53935", marginBottom: 10 }}
              />
              <h3
                style={{
                  color: "#f2f5fa",
                  fontWeight: 700,
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "#7e8aa0",
                  fontSize: 12,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="security-card"
          style={{ padding: 24, textAlign: "center" }}
        >
          <p style={{ color: "#7e8aa0", fontSize: 12, margin: 0 }}>
            MASTERKEY is developed and operated under strict legal frameworks.
            For authorized access requests, compliance inquiries, or legal
            matters, contact the platform administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
