import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a1020",
        borderTop: "1px solid #243044",
        padding: "32px 24px",
        marginTop: "auto",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              style={{
                background: "linear-gradient(135deg, #c62828, #d32f2f)",
                borderRadius: 6,
                padding: "4px",
              }}
            >
              <Shield size={16} color="white" />
            </div>
            <span
              style={{
                color: "#f2f5fa",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1,
              }}
            >
              MASTER<span style={{ color: "#e53935" }}>KEY</span>
            </span>
          </div>

          {/* Copyright */}
          <div style={{ color: "#7e8aa0", fontSize: 12, textAlign: "center" }}>
            © 2026 MasterKey Security Intelligence Platform. All rights
            reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              style={{ color: "#7e8aa0", fontSize: 12, textDecoration: "none" }}
            >
              PRIVACY POLICY
            </Link>
            <span style={{ color: "#243044" }}>|</span>
            <Link
              to="/terms"
              style={{ color: "#7e8aa0", fontSize: 12, textDecoration: "none" }}
            >
              TERMS OF SERVICE
            </Link>
            <span style={{ color: "#243044" }}>|</span>
            <Link
              to="/about"
              style={{ color: "#7e8aa0", fontSize: 12, textDecoration: "none" }}
            >
              ABOUT
            </Link>
          </div>
        </div>

        {/* Legal notice */}
        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            background: "#3a1216",
            border: "1px solid #c62828",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p style={{ color: "#ff8a80", fontSize: 11, margin: 0 }}>
            ⚠️ FOR AUTHORIZED USE ONLY — Unauthorized access, stalking, or misuse
            of this platform is a criminal offense punishable under applicable
            law.
          </p>
        </div>
      </div>
    </footer>
  );
}
