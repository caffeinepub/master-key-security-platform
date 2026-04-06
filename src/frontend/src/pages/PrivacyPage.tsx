export default function PrivacyPage() {
  const section = (title: string, content: string) => (
    <div style={{ marginBottom: 28 }}>
      <h2
        style={{
          color: "#e53935",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 2,
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      <p style={{ color: "#a7b1c2", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
        {content}
      </p>
    </div>
  );

  return (
    <div style={{ padding: "48px 24px", maxWidth: 760, margin: "0 auto" }}>
      <h1
        style={{
          color: "#f2f5fa",
          fontWeight: 900,
          fontSize: 26,
          letterSpacing: 2,
          marginBottom: 4,
        }}
      >
        PRIVACY POLICY
      </h1>
      <p style={{ color: "#7e8aa0", fontSize: 12, marginBottom: 32 }}>
        Last updated: April 2026
      </p>

      <div className="security-card" style={{ padding: 32 }}>
        {section(
          "1. DATA COLLECTION",
          "MASTERKEY collects personal data including name, mobile number, address, photo, and identification documents solely for the purpose of identity verification and security intelligence operations. Data is collected only for registered users within the authorized network.",
        )}
        {section(
          "2. DATA USAGE",
          "Collected data is used exclusively for identity verification, criminal record flagging, and security monitoring by authorized personnel. Data is never sold, shared with third parties, or used for commercial purposes.",
        )}
        {section(
          "3. DATA SECURITY",
          "All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Access is controlled through JWT authentication with role-based permissions. All access events are logged and monitored.",
        )}
        {section(
          "4. SEARCH ACTIVITY LOGGING",
          "All searches performed on this platform are logged including the searcher's identity, IP address, timestamp, and query. These logs are retained for 12 months and may be shared with law enforcement upon legal request.",
        )}
        {section(
          "5. GDPR COMPLIANCE",
          "For users in the European Economic Area, you have rights of access, rectification, erasure, and data portability under GDPR. Requests must be submitted through official channels and are subject to legal review.",
        )}
        {section(
          "6. DATA RETENTION",
          "User profiles are retained for the duration of the registration period plus 7 years for legal compliance. Search logs are retained for 12 months. Upon deletion, data is purged from all systems within 30 days.",
        )}
        {section(
          "7. LAW ENFORCEMENT DISCLOSURE",
          "MASTERKEY may disclose user data, activity logs, and search history to law enforcement authorities when required by applicable law, court order, or to prevent criminal activity. Users are informed of their monitoring obligations upon account creation.",
        )}
        {section(
          "8. COOKIES & TRACKING",
          "This platform uses session cookies for authentication only. No advertising cookies or third-party trackers are used. IP addresses are logged for security purposes as disclosed in Section 4.",
        )}

        <div
          style={{
            borderTop: "1px solid #2a3648",
            paddingTop: 20,
            marginTop: 8,
          }}
        >
          <p style={{ color: "#7e8aa0", fontSize: 11, margin: 0 }}>
            By using MASTERKEY, you agree to this Privacy Policy. Questions?
            Contact your platform administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
