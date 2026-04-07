import { Eye, EyeOff, KeyRound, Lock, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "504560@AUC";

export default function LoginPage() {
  const [tab, setTab] = useState<"admin" | "member">("admin");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [memberMobile, setMemberMobile] = useState("");
  const [memberCode, setMemberCode] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (adminUser === ADMIN_USERNAME && adminPass === ADMIN_PASSWORD) {
        toast.success("Admin login successful");
        navigate("/admin");
      } else {
        toast.error("Invalid username or password");
      }
    }, 1200);
  };

  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (memberMobile && memberCode) {
        toast.success("Member login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1200);
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
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#1a2433",
          border: "1px solid #2a3648",
          borderRadius: 16,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            style={{
              background: "linear-gradient(135deg, #c62828, #d32f2f)",
              borderRadius: 10,
              padding: 10,
              boxShadow: "0 0 20px rgba(211,47,47,0.4)",
            }}
          >
            <Shield size={24} color="white" />
          </div>
          <div>
            <div
              style={{
                color: "#f2f5fa",
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: 2,
              }}
            >
              MASTER<span style={{ color: "#e53935" }}>KEY</span>
            </div>
            <div style={{ color: "#7e8aa0", fontSize: 9, letterSpacing: 2 }}>
              SECURITY PLATFORM
            </div>
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            color: "#a7b1c2",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          SECURE ACCESS PORTAL
        </h2>

        {/* Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            background: "#111a28",
            borderRadius: 8,
            padding: 3,
            marginBottom: 28,
          }}
        >
          {(["admin", "member"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              style={{
                padding: "8px",
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
              }}
            >
              {t === "admin" ? "ADMIN" : "MEMBER"}
            </button>
          ))}
        </div>

        {/* Admin Form */}
        {tab === "admin" && (
          <form
            onSubmit={handleAdminLogin}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label
                htmlFor="admin-username"
                style={{
                  color: "#7e8aa0",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                USERNAME
              </label>
              <div style={{ position: "relative" }}>
                <Lock
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
                  id="admin-username"
                  type="text"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="admin"
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="admin-password"
                style={{
                  color: "#7e8aa0",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <Lock
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
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingLeft: 36, paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#7e8aa0",
                  }}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-danger"
              style={{
                padding: "13px",
                fontSize: 13,
                letterSpacing: 1,
                border: "none",
                cursor: "pointer",
                width: "100%",
                marginTop: 8,
              }}
            >
              {loading ? "AUTHENTICATING..." : "ADMIN LOGIN"}
            </button>
          </form>
        )}

        {/* Member Form */}
        {tab === "member" && (
          <form
            onSubmit={handleMemberLogin}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div>
              <label
                htmlFor="member-mobile"
                style={{
                  color: "#7e8aa0",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                MOBILE NUMBER
              </label>
              <div style={{ position: "relative" }}>
                <Smartphone
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
                  id="member-mobile"
                  type="tel"
                  value={memberMobile}
                  onChange={(e) => setMemberMobile(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="member-code"
                style={{
                  color: "#7e8aa0",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                ACCESS CODE
              </label>
              <div style={{ position: "relative" }}>
                <KeyRound
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
                  id="member-code"
                  type="password"
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  placeholder="Access Code"
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-danger"
              style={{
                padding: "13px",
                fontSize: 13,
                letterSpacing: 1,
                border: "none",
                cursor: "pointer",
                width: "100%",
                marginTop: 8,
              }}
            >
              {loading ? "AUTHENTICATING..." : "MEMBER LOGIN"}
            </button>
          </form>
        )}

        <p
          style={{
            textAlign: "center",
            color: "#7e8aa0",
            fontSize: 11,
            marginTop: 20,
            lineHeight: 1.6,
          }}
        >
          🔐 All sessions are encrypted and monitored.
          <br />
          Unauthorized access attempts are logged and reported.
        </p>
      </div>
    </div>
  );
}
