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
  Newspaper,
  Phone,
  Search,
  Twitter,
  Upload,
  User,
  X,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Indian Intelligence Database ───────────────────────────────────────────
const INDIAN_DATABASE = [
  {
    id: 1,
    name: "Ravi Kumar Sharma",
    mobile: "+91-9876543210",
    altNumbers: ["+91-9988776655"],
    address: "B-14, Sector 22, Rohini, New Delhi - 110085",
    email: "ravi.k.sharma@gmail.com",
    dob: "1985-03-12",
    aadhaar: "XXXX-XXXX-4521",
    pan: "ABCDE1234F",
    nationality: "Indian",
    state: "Delhi",
    status: "criminal" as const,
    flagReason:
      "Warrant active: Bank fraud ₹2.4 crore. Delhi Police Case No. 1142/2024.",
    criminalHistory: [
      {
        year: "2020",
        crime: "Cheating & Forgery",
        court: "Tis Hazari District Court",
        verdict: "Convicted",
      },
      {
        year: "2022",
        crime: "Bank Fraud — ₹85 Lakh",
        court: "Delhi High Court",
        verdict: "Convicted",
      },
      {
        year: "2024",
        crime: "Fraud — ₹2.4 Crore (Warrant)",
        court: "CBI Court Delhi",
        verdict: "Pending",
      },
    ],
    social: {
      facebook: "ravi.k.sharma.delhi",
      instagram: "@ravi_sharma_official",
      twitter: "@RaviSharmaDelhi",
      linkedin: "ravi-kumar-sharma-delhi",
    },
    lastSeenLocations: [
      {
        place: "Rohini, Delhi",
        date: "2026-04-01",
        source: "Facebook Check-in",
      },
      {
        place: "Chandigarh, Punjab",
        date: "2026-03-20",
        source: "Instagram Story",
      },
      {
        place: "Gurgaon, Haryana",
        date: "2026-02-28",
        source: "Mobile Tower Data",
      },
    ],
    newsLinks: [
      {
        source: "Hindustan Times",
        headline:
          "Delhi man arrested for ₹2.4 crore bank fraud, absconding since 2024",
        url: "https://www.hindustantimes.com/delhi-news/bank-fraud-accused-ravi-sharma-absconding",
        date: "2024-11-05",
        snippet:
          "Ravi Kumar Sharma, 39, resident of Rohini, is accused of duping multiple bank customers in a ₹2.4 crore fraud scheme...",
      },
      {
        source: "Times of India",
        headline:
          "CBI issues lookout notice for Delhi fraud suspect Ravi Sharma",
        url: "https://www.timesofindia.com/city/delhi/cbi-lookout-ravi-sharma",
        date: "2025-01-18",
        snippet:
          "The Central Bureau of Investigation has issued a lookout notice for Ravi Kumar Sharma in connection with a major banking fraud case...",
      },
      {
        source: "NDTV",
        headline: "Bank fraud kingpin traced to Chandigarh after Delhi escape",
        url: "https://www.ndtv.com/delhi-news/bank-fraud-ravi-sharma-chandigarh-traced",
        date: "2026-03-22",
        snippet:
          "Delhi Police believes Ravi Sharma is now hiding in Chandigarh after his Instagram story revealed his location...",
      },
    ],
    internetSources: [
      {
        site: "Facebook",
        url: "https://facebook.com/ravi.k.sharma.delhi",
        snippet:
          "Ravi K Sharma — Rohini, Delhi. 1.2K friends. Profile public. Last post 3 days ago.",
      },
      {
        site: "LinkedIn",
        url: "https://linkedin.com/in/ravi-kumar-sharma-delhi",
        snippet:
          "Ravi Kumar Sharma — Former Branch Manager at Punjab National Bank (2015–2021). 400+ connections.",
      },
      {
        site: "Tis Hazari Court Records",
        url: "https://delhicourts.nic.in/cases/1142-2024",
        snippet:
          "Case #1142/2024 — Ravi Kumar Sharma, Accused. Bank fraud IPC 420/465. Date of next hearing: 12-May-2026.",
      },
      {
        site: "Instagram",
        url: "https://instagram.com/ravi_sharma_official",
        snippet:
          "@ravi_sharma_official — 3.4K followers. Story posted from Chandigarh (2026-03-20).",
      },
    ],
    vehicleInfo: "2021 White Maruti Suzuki Ciaz — DL-01-CA-4520",
    associates: [
      "Suresh Garg (Co-accused, absconding)",
      "Meena Verma (Account holder, arrested)",
    ],
  },
  {
    id: 2,
    name: "Priya Singh Chauhan",
    mobile: "+91-8765432109",
    altNumbers: ["+91-7654321098"],
    address: "32, Gandhi Nagar, Bhopal, Madhya Pradesh - 462001",
    email: "priya.singhchauhan@yahoo.com",
    dob: "1993-07-25",
    aadhaar: "XXXX-XXXX-7890",
    pan: "BVHXY5432K",
    nationality: "Indian",
    state: "Madhya Pradesh",
    status: "suspicious" as const,
    flagReason:
      "Under investigation: Cyber fraud and online sextortion network. MP Cyber Cell Case.",
    criminalHistory: [
      {
        year: "2023",
        crime: "Cyber Fraud — Online Extortion",
        court: "MP Cyber Cell",
        verdict: "Under Review",
      },
      {
        year: "2025",
        crime: "Sextortion Network — Investigation",
        court: "CBI",
        verdict: "Under Review",
      },
    ],
    social: {
      facebook: "priya.singh.chauhan.bpl",
      instagram: "@priyasingh_bhopal",
      twitter: "@PriyaSinghCBPL",
      linkedin: "",
    },
    lastSeenLocations: [
      { place: "Bhopal, MP", date: "2026-04-03", source: "Twitter Activity" },
      { place: "Indore, MP", date: "2026-03-15", source: "Instagram Post" },
    ],
    newsLinks: [
      {
        source: "Dainik Bhaskar",
        headline: "भोपाल में साइबर ठगी नेटवर्क का भंडाफोड़, महिला समेत तीन गिरफ्तार",
        url: "https://www.bhaskar.com/local/mp/bhopal/news/cyber-fraud-network-bhopal-arrested",
        date: "2025-08-12",
        snippet:
          "भोपाल साइबर सेल ने एक बड़े ठगी नेटवर्क का भंडाफोड़ किया जिसमें प्रिया सिंह चौहान का नाम सामने आया...",
      },
      {
        source: "Amar Ujala",
        headline:
          "Bhopal cyber sextortion gang busted, woman suspect named in FIR",
        url: "https://www.amarujala.com/bhopal/cyber-sextortion-gang-bhopal-priya-singh",
        date: "2025-11-20",
        snippet:
          "Madhya Pradesh Police has named Priya Singh Chauhan as a key suspect in an online sextortion case involving multiple victims across India...",
      },
    ],
    internetSources: [
      {
        site: "Facebook",
        url: "https://facebook.com/priya.singh.chauhan.bpl",
        snippet:
          "Priya Singh Chauhan — Bhopal. 800+ friends. Profile partially private.",
      },
      {
        site: "MP Cyber Cell Records",
        url: "https://mppolice.gov.in/cybercell/cases",
        snippet:
          "Case filed against Priya Singh Chauhan — MP Cyber Cell FIR No. 445/2023. Status: Under Investigation.",
      },
      {
        site: "Twitter",
        url: "https://twitter.com/PriyaSinghCBPL",
        snippet:
          "@PriyaSinghCBPL — Account flagged. Multiple reports filed. Last tweet 2 days ago.",
      },
    ],
    vehicleInfo: "2020 Grey Honda Activa — MP-04-KL-8812",
    associates: [
      "Rahul Tiwari (Main accused, arrested)",
      "Unknown online handler (Mumbai)",
    ],
  },
  {
    id: 3,
    name: "Suresh Narayan Patil",
    mobile: "+91-7654321987",
    altNumbers: [],
    address: "Plot No 45, Shivajinagar, Pune, Maharashtra - 411005",
    email: "suresh.patil.pune@gmail.com",
    dob: "1978-11-08",
    aadhaar: "XXXX-XXXX-2345",
    pan: "CRTPQ9876H",
    nationality: "Indian",
    state: "Maharashtra",
    status: "normal" as const,
    flagReason: null,
    criminalHistory: [],
    social: {
      facebook: "suresh.narayan.patil.pune",
      instagram: "@sureshpatil_pune",
      twitter: "",
      linkedin: "suresh-narayan-patil",
    },
    lastSeenLocations: [
      {
        place: "Pune, Maharashtra",
        date: "2026-04-05",
        source: "Facebook Check-in",
      },
    ],
    newsLinks: [],
    internetSources: [
      {
        site: "LinkedIn",
        url: "https://linkedin.com/in/suresh-narayan-patil",
        snippet:
          "Suresh Patil — Senior Engineer at TCS, Pune. No criminal record found.",
      },
      {
        site: "Facebook",
        url: "https://facebook.com/suresh.narayan.patil.pune",
        snippet:
          "Suresh Narayan Patil, Pune. Active community member. 2.1K friends.",
      },
    ],
    vehicleInfo: "2022 Red Honda City — MH-12-AB-7700",
    associates: [],
  },
  {
    id: 4,
    name: "Mohammad Asif Khan",
    mobile: "+91-9123456780",
    altNumbers: ["+91-8012345678"],
    address: "12/C, Old City Road, Hyderabad, Telangana - 500002",
    email: "asif.khan.hyd@gmail.com",
    dob: "1989-05-17",
    aadhaar: "XXXX-XXXX-6677",
    pan: "DLMNA7654J",
    nationality: "Indian",
    state: "Telangana",
    status: "criminal" as const,
    flagReason:
      "Wanted: Drug trafficking network. Hyderabad Police & NCB Case No. HYD/NCB/2025/88.",
    criminalHistory: [
      {
        year: "2021",
        crime: "Drug Possession",
        court: "Hyderabad Sessions Court",
        verdict: "Convicted",
      },
      {
        year: "2023",
        crime: "Drug Trafficking Network",
        court: "Telangana HC",
        verdict: "Convicted",
      },
      {
        year: "2025",
        crime: "NCB Wanted — Interstate Smuggling",
        court: "NCB Special Court",
        verdict: "Pending",
      },
    ],
    social: {
      facebook: "asif.khan.hyderabad.official",
      instagram: "@asif_khan_hyd",
      twitter: "",
      linkedin: "",
    },
    lastSeenLocations: [
      {
        place: "Hyderabad, Telangana",
        date: "2026-03-30",
        source: "CCTV Near Old City",
      },
      {
        place: "Bengaluru, Karnataka",
        date: "2026-03-10",
        source: "Hotel Check-in",
      },
      {
        place: "Mumbai, Maharashtra",
        date: "2026-02-15",
        source: "Mobile Tower",
      },
    ],
    newsLinks: [
      {
        source: "The Hindu",
        headline:
          "NCB nabs Hyderabad drug ring, prime accused Mohammad Asif Khan absconding",
        url: "https://www.thehindu.com/news/national/telangana/ncb-hyderabad-drug-ring-asif-khan",
        date: "2025-07-22",
        snippet:
          "The Narcotics Control Bureau (NCB) has declared Mohammad Asif Khan, 37, as wanted in connection with a ₹50 crore drug trafficking network...",
      },
      {
        source: "NDTV",
        headline:
          "Hyderabad drug lord traced to Bengaluru hotel, police on the lookout",
        url: "https://www.ndtv.com/telangana-news/hyderabad-drug-lord-asif-khan-bengaluru",
        date: "2026-03-12",
        snippet:
          "Sources in Hyderabad Police confirm that Mohammad Asif Khan was traced to a hotel in Bengaluru's Majestic area before slipping away...",
      },
      {
        source: "Deccan Chronicle",
        headline:
          "Old City drug kingpin still on the run despite Interpol red notice",
        url: "https://www.deccanchronicle.com/nation/crime/hyderabad-drug-kingpin-interpol",
        date: "2026-01-30",
        snippet:
          "Mohammad Asif Khan remains at large despite an Interpol red notice. Hyderabad Police has issued a cash reward of ₹5 lakhs for information...",
      },
    ],
    internetSources: [
      {
        site: "NCB India Records",
        url: "https://www.ncb.nic.in/wanted/HYD-NCB-2025-88",
        snippet:
          "Wanted: Mohammad Asif Khan — NCB Case HYD/NCB/2025/88. Drug trafficking. Reward: ₹5 Lakhs.",
      },
      {
        site: "Facebook",
        url: "https://facebook.com/asif.khan.hyderabad.official",
        snippet:
          "Asif Khan Hyderabad — Profile found. 2.3K followers. Last active 7 days ago.",
      },
      {
        site: "CCTV Hyderabad Traffic",
        url: "https://tspolice.gov.in/cctv/records",
        snippet:
          "Vehicle MH-01-BX-5500 linked to Mohammad Asif Khan spotted near Old City, Hyderabad — 30 March 2026, 9:14 PM.",
      },
    ],
    vehicleInfo:
      "2023 Black Toyota Fortuner — MH-01-BX-5500 (Stolen plates suspected)",
    associates: [
      "Jabir Hussain (Arrested — Nov 2025)",
      "Unknown supplier — alias 'Tiger' (Karachi connection)",
    ],
  },
  {
    id: 5,
    name: "Anita Devi Gupta",
    mobile: "+91-9012345678",
    altNumbers: [],
    address: "5, Tagore Road, Civil Lines, Allahabad (Prayagraj), UP - 211001",
    email: "anita.gupta.prayagraj@gmail.com",
    dob: "1975-09-30",
    aadhaar: "XXXX-XXXX-3399",
    pan: "EQFGH3210L",
    nationality: "Indian",
    state: "Uttar Pradesh",
    status: "suspicious" as const,
    flagReason:
      "Under scrutiny: Land fraud case — illegal property registration. UP Police FIR 990/2025.",
    criminalHistory: [
      {
        year: "2025",
        crime: "Land Fraud — Illegal Registration",
        court: "Allahabad HC",
        verdict: "Under Investigation",
      },
    ],
    social: {
      facebook: "anita.devi.gupta.prayagraj",
      instagram: "",
      twitter: "",
      linkedin: "anita-gupta-prayagraj",
    },
    lastSeenLocations: [
      { place: "Prayagraj, UP", date: "2026-04-02", source: "LinkedIn Post" },
      { place: "Lucknow, UP", date: "2026-03-18", source: "Travel Record" },
    ],
    newsLinks: [
      {
        source: "Amar Ujala",
        headline: "प्रयागराज में जमीन फर्जीवाड़ा: महिला सहित दो के खिलाफ FIR",
        url: "https://www.amarujala.com/uttar-pradesh/prayagraj/land-fraud-fir-anita-gupta",
        date: "2025-09-05",
        snippet:
          "प्रयागराज पुलिस ने नागरिकों की शिकायत पर अनिता देवी गुप्ता सहित दो लोगों के खिलाफ जमीन फर्जीवाड़े का मामला दर्ज किया...",
      },
    ],
    internetSources: [
      {
        site: "UP Police Records",
        url: "https://uppolice.gov.in/fir/990-2025",
        snippet:
          "FIR No. 990/2025 — Anita Devi Gupta, IPC 420/467. Land fraud investigation ongoing.",
      },
      {
        site: "LinkedIn",
        url: "https://linkedin.com/in/anita-gupta-prayagraj",
        snippet:
          "Anita Gupta — Property Consultant, Prayagraj. 300+ connections.",
      },
    ],
    vehicleInfo: "2019 White Hyundai Creta — UP-70-GH-1123",
    associates: ["Ramesh Chandra (Co-accused)"],
  },
];

type DbRecord = (typeof INDIAN_DATABASE)[0];
type SearchResult = DbRecord & { matchPct?: number; matchSource?: string };

const FACE_MATCH_SOURCES = [
  {
    source: "Facebook",
    detail: "Profile photo matched on account 'ravi.k.sharma.delhi'",
    confidence: 97,
    date: "2026-04-01",
  },
  {
    source: "Instagram",
    detail: "@ravi_sharma_official — story tagged in Chandigarh, Punjab",
    confidence: 94,
    date: "2026-03-20",
  },
  {
    source: "CCTV Delhi",
    detail: "Face matched — Rohini Sector 22 CCTV, 01-Apr-2026 10:12 AM",
    confidence: 91,
    date: "2026-04-01",
  },
  {
    source: "Court Records",
    detail: "Mugshot on file — Tis Hazari Court, Case #1142/2024",
    confidence: 99,
    date: "2024-06-10",
  },
  {
    source: "LinkedIn",
    detail: "Profile photo match — Former PNB Branch Manager page",
    confidence: 88,
    date: "2026-01-15",
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

      {/* Face Match Sources */}
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
            <a
              href={`https://facebook.com/${result.social.facebook}`}
              target="_blank"
              rel="noreferrer"
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
                textDecoration: "none",
              }}
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
                textDecoration: "none",
              }}
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
                textDecoration: "none",
              }}
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
                textDecoration: "none",
              }}
            >
              <User size={12} style={{ color: "#0077b5" }} /> LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Last Seen */}
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
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2a6496";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e3a5f";
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
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3a5a7a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2a3648";
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
              <div style={{ color: "#7e8aa0", fontSize: 11, lineHeight: 1.6 }}>
                {src.snippet}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [tab, setTab] = useState<"mobile" | "name" | "face">("mobile");
  const [mobileQuery, setMobileQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
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
      const found = INDIAN_DATABASE.find(
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

  const handleNameSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameQuery.trim()) return;
    setLoading(true);
    setNotFound(false);
    setSearchResult(null);
    setFaceMatchSources(undefined);
    setTimeout(() => {
      const q = nameQuery.trim().toLowerCase();
      const found = INDIAN_DATABASE.find(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.address.toLowerCase().includes(q) ||
          u.state.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      );
      if (found) {
        setSearchResult(found);
        logSearch(nameQuery, "Name / Keyword Search", found.status);
        if (found.status === "criminal")
          toast.error("🚨 Criminal record found — RED ALERT");
        else if (found.status === "suspicious")
          toast.warning("⚠️ Suspicious record found");
        else toast.success("✅ Record found — Normal status");
      } else {
        setNotFound(true);
        logSearch(nameQuery, "Name / Keyword Search", "not found");
        toast.info("No record found for this name/keyword");
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
        ...INDIAN_DATABASE[0],
        matchPct: 97,
        matchSource: "Facebook / CCTV Delhi",
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

  const resetSearch = () => {
    setSearchResult(null);
    setNotFound(false);
    setFaceMatchSources(undefined);
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
          Unauthorized use is punishable under Indian IT Act 2000 & IPC.
        </p>
      </div>

      {/* Search Card */}
      <div className="security-card" style={{ padding: 28 }}>
        {/* Tabs — 3 options */}
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
              onClick={() => {
                setTab(t.key);
                resetSearch();
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
                  placeholder="Indian mobile number (e.g. +91-9876543210)"
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
              Try: +91-9876543210 (Criminal · Ravi Sharma, Delhi) &nbsp;·&nbsp;
              +91-8765432109 (Suspicious · Priya Singh, Bhopal) &nbsp;·&nbsp;
              +91-7654321987 (Normal · Suresh Patil, Pune) &nbsp;·&nbsp;
              +91-9123456780 (Criminal · Asif Khan, Hyderabad)
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
                  placeholder="Enter name, city, state or keyword (e.g. Ravi Sharma, Delhi, Maharashtra)"
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
                <Search size={14} /> {loading ? "SCANNING..." : "SEARCH"}
              </button>
            </div>
            <p style={{ color: "#7e8aa0", fontSize: 11, marginTop: 8 }}>
              Try: "Ravi Sharma" · "Priya Singh" · "Asif Khan" · "Anita Gupta" ·
              "Delhi" · "Hyderabad" · "Pune"
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
                JPG, PNG — Cross-platform India face search
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
                  SCANNING: Facebook · Instagram · CCTV Delhi · Court DB ·
                  LinkedIn · NCB · UP Police...
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
            onClose={resetSearch}
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
              No matching record found in Indian database
            </div>
            <div style={{ color: "#7e8aa0", fontSize: 12, marginTop: 4 }}>
              This person/number is not in the registered Indian security
              database
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
