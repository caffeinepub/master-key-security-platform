export default function TermsPage() {
  const section = (title: string, content: string) => (
    <div style={{ marginBottom: 24 }}>
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
        TERMS & CONDITIONS
      </h1>
      <p style={{ color: "#7e8aa0", fontSize: 12, marginBottom: 32 }}>
        Effective: April 2026
      </p>

      <div
        style={{
          background: "#3a1216",
          border: "1px solid #c62828",
          borderLeft: "4px solid #e53935",
          borderRadius: 8,
          padding: "14px 18px",
          marginBottom: 28,
        }}
      >
        <p
          style={{ color: "#ff8a80", fontSize: 13, margin: 0, fontWeight: 600 }}
        >
          ⚠️ WARNING: This platform only shows data of registered users.
          Unauthorized use, stalking, or misuse is punishable under law. Admin
          may share user activity with law enforcement authorities.
        </p>
      </div>

      <div className="security-card" style={{ padding: 32 }}>
        {section(
          "1. AUTHORIZED ACCESS ONLY",
          "Access to MASTERKEY is restricted to authorized personnel only. Accounts are issued by the platform administrator and must not be shared, transferred, or accessed by unauthorized individuals. Account holders are fully responsible for all activities performed under their credentials.",
        )}
        {section(
          "2. PROHIBITED USES",
          "You may NOT use MASTERKEY for: stalking or harassment of individuals, unauthorized surveillance, commercial data collection, circumvention of access controls, sharing results outside authorized channels, or any activity prohibited by applicable local, national, or international law.",
        )}
        {section(
          "3. LEGAL DISCLAIMER",
          "MASTERKEY provides information strictly from the registered database. Results do not constitute legal judgments. Criminal records shown are based on registered data and may not reflect current legal status. Users must verify information through official legal channels before taking any action.",
        )}
        {section(
          "4. MONITORING & ENFORCEMENT",
          "All platform activity is monitored. Violations of these terms will result in immediate account suspension and may be reported to law enforcement. False reports or misuse of search functions will be prosecuted to the full extent of applicable law.",
        )}
        {section(
          "5. DATA ACCURACY",
          "MASTERKEY strives for accuracy but does not guarantee completeness of the database. Information shown reflects registered data at the time of search. Users are responsible for contextualizing results within applicable legal frameworks.",
        )}
        {section(
          "6. PLATFORM AVAILABILITY",
          "MASTERKEY is provided 'as is' for authorized operational use. We reserve the right to suspend, modify, or terminate access at any time for security, maintenance, or legal reasons.",
        )}
        {section(
          "7. GOVERNING LAW",
          "These terms are governed by applicable law in the jurisdiction of operation. Disputes will be resolved through appropriate legal channels. By accessing this platform, you agree to these terms and all applicable legal obligations.",
        )}

        <div
          style={{
            borderTop: "1px solid #2a3648",
            paddingTop: 20,
            marginTop: 8,
          }}
        >
          <p style={{ color: "#7e8aa0", fontSize: 11, margin: 0 }}>
            Continued use of MASTERKEY constitutes acceptance of these Terms &
            Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
