// ─── Shared Database Store ───────────────────────────────────────────────────
// Single source of truth for both Search page and Admin page.
// Both pages import from here so adding a user in Admin immediately
// makes them searchable in Search.

export type UserStatus = "normal" | "suspicious" | "criminal";

export interface DbRecord {
  id: number;
  name: string;
  mobile: string;
  altNumbers: string[];
  address: string;
  email: string;
  dob: string;
  aadhaar: string;
  pan: string;
  nationality: string;
  state: string;
  status: UserStatus;
  flagReason: string | null;
  photo: string | null; // base64 or URL, null if not set
  criminalHistory: {
    year: string;
    crime: string;
    court: string;
    verdict: string;
  }[];
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  lastSeenLocations: { place: string; date: string; source: string }[];
  newsLinks: {
    source: string;
    headline: string;
    url: string;
    date: string;
    snippet: string;
  }[];
  internetSources: { site: string; url: string; snippet: string }[];
  vehicleInfo: string;
  associates: string[];
  accessCode: string;
  createdAt: string;
}

// ─── Initial Seed Data ────────────────────────────────────────────────────────
const SEED_DATA: DbRecord[] = [
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
    status: "criminal",
    flagReason:
      "Warrant active: Bank fraud ₹2.4 crore. Delhi Police Case No. 1142/2024.",
    photo: null,
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
        url: "https://www.hindustantimes.com",
        date: "2024-11-05",
        snippet:
          "Ravi Kumar Sharma, 39, resident of Rohini, is accused of duping multiple bank customers in a ₹2.4 crore fraud scheme...",
      },
      {
        source: "NDTV",
        headline: "Bank fraud kingpin traced to Chandigarh after Delhi escape",
        url: "https://www.ndtv.com",
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
        site: "Tis Hazari Court Records",
        url: "https://delhicourts.nic.in",
        snippet: "Case #1142/2024 — Ravi Kumar Sharma. Bank fraud IPC 420/465.",
      },
    ],
    vehicleInfo: "2021 White Maruti Suzuki Ciaz — DL-01-CA-4520",
    associates: [
      "Suresh Garg (Co-accused, absconding)",
      "Meena Verma (Account holder, arrested)",
    ],
    accessCode: "MK-1001",
    createdAt: "2026-01-10",
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
    status: "suspicious",
    flagReason:
      "Under investigation: Cyber fraud and online sextortion network. MP Cyber Cell Case.",
    photo: null,
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
        headline: "भोपाल में साइबर ठगी नेटवर्क का भंडाफोड़",
        url: "https://www.bhaskar.com",
        date: "2025-08-12",
        snippet:
          "भोपाल साइबर सेल ने एक बड़े ठगी नेटवर्क का भंडाफोड़ किया जिसमें प्रिया सिंह चौहान का नाम सामने आया...",
      },
    ],
    internetSources: [
      {
        site: "Facebook",
        url: "https://facebook.com/priya.singh.chauhan.bpl",
        snippet: "Priya Singh Chauhan — Bhopal. 800+ friends.",
      },
      {
        site: "MP Cyber Cell Records",
        url: "https://mppolice.gov.in",
        snippet:
          "Case filed — MP Cyber Cell FIR No. 445/2023. Status: Under Investigation.",
      },
    ],
    vehicleInfo: "2020 Grey Honda Activa — MP-04-KL-8812",
    associates: ["Rahul Tiwari (Main accused, arrested)"],
    accessCode: "MK-1002",
    createdAt: "2026-01-15",
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
    status: "normal",
    flagReason: null,
    photo: null,
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
    ],
    vehicleInfo: "2022 Red Honda City — MH-12-AB-7700",
    associates: [],
    accessCode: "MK-1003",
    createdAt: "2026-01-20",
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
    status: "criminal",
    flagReason:
      "Wanted: Drug trafficking network. Hyderabad Police & NCB Case No. HYD/NCB/2025/88.",
    photo: null,
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
    ],
    newsLinks: [
      {
        source: "The Hindu",
        headline:
          "NCB nabs Hyderabad drug ring, prime accused Mohammad Asif Khan absconding",
        url: "https://www.thehindu.com",
        date: "2025-07-22",
        snippet:
          "The NCB has declared Mohammad Asif Khan as wanted in connection with a ₹50 crore drug trafficking network...",
      },
    ],
    internetSources: [
      {
        site: "NCB India Records",
        url: "https://www.ncb.nic.in",
        snippet:
          "Wanted: Mohammad Asif Khan — NCB Case HYD/NCB/2025/88. Drug trafficking. Reward: ₹5 Lakhs.",
      },
    ],
    vehicleInfo:
      "2023 Black Toyota Fortuner — MH-01-BX-5500 (Stolen plates suspected)",
    associates: ["Jabir Hussain (Arrested — Nov 2025)"],
    accessCode: "MK-1004",
    createdAt: "2026-02-01",
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
    status: "suspicious",
    flagReason:
      "Under scrutiny: Land fraud case — illegal property registration. UP Police FIR 990/2025.",
    photo: null,
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
        url: "https://www.amarujala.com",
        date: "2025-09-05",
        snippet:
          "प्रयागराज पुलिस ने अनिता देवी गुप्ता सहित दो लोगों के खिलाफ जमीन फर्जीवाड़े का मामला दर्ज किया...",
      },
    ],
    internetSources: [
      {
        site: "UP Police Records",
        url: "https://uppolice.gov.in",
        snippet:
          "FIR No. 990/2025 — Anita Devi Gupta, IPC 420/467. Land fraud investigation ongoing.",
      },
    ],
    vehicleInfo: "2019 White Hyundai Creta — UP-70-GH-1123",
    associates: ["Ramesh Chandra (Co-accused)"],
    accessCode: "MK-1005",
    createdAt: "2026-02-10",
  },
];

// ─── Global Mutable Store ─────────────────────────────────────────────────────
// Both Admin and Search pages import `globalDb` and mutate it directly.
// Since this is a module-level variable, changes persist for the entire session.

export const globalDb: DbRecord[] = [...SEED_DATA];

/** Add a new record and return it */
export function addRecord(
  data: Omit<DbRecord, "id" | "accessCode" | "createdAt">,
): DbRecord {
  const newRecord: DbRecord = {
    ...data,
    id: Date.now(),
    accessCode: `MK-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  globalDb.push(newRecord);
  return newRecord;
}

/** Delete a record by id */
export function deleteRecord(id: number): void {
  const idx = globalDb.findIndex((r) => r.id === id);
  if (idx !== -1) globalDb.splice(idx, 1);
}

/** Update a record by id */
export function updateRecord(id: number, changes: Partial<DbRecord>): void {
  const idx = globalDb.findIndex((r) => r.id === id);
  if (idx !== -1) {
    globalDb[idx] = { ...globalDb[idx], ...changes };
  }
}

// ─── Search Logic ─────────────────────────────────────────────────────────────

/**
 * Mobile search: strictly matches if the database mobile or altNumbers
 * contains the exact digits the user typed (at least 7 digits must match).
 * Returns the FIRST match only — no duplicates.
 */
export function searchByMobile(query: string): DbRecord | null {
  const q = query.trim().replace(/\D/g, ""); // strip non-digits
  if (q.length < 7) return null; // too short, refuse
  const found = globalDb.find((u) => {
    const mobileDigits = u.mobile.replace(/\D/g, "");
    if (mobileDigits.endsWith(q) || q.endsWith(mobileDigits)) return true;
    return u.altNumbers.some((n) => {
      const nd = n.replace(/\D/g, "");
      return nd.endsWith(q) || q.endsWith(nd);
    });
  });
  return found ?? null;
}

/**
 * Name/keyword search: strictly matches name, address, state, or email.
 * Query must be at least 3 characters. Returns FIRST match only.
 */
export function searchByName(query: string): DbRecord | null {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return null; // too short
  const found = globalDb.find(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.address.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q),
  );
  return found ?? null;
}

/**
 * Face match: randomly picks a match from the database (50% chance of match,
 * 50% chance of no match). This simulates a real face recogniser that may
 * or may not find a result. Each upload produces a DIFFERENT random outcome.
 */
export function faceMatchSearch(): DbRecord | null {
  if (globalDb.length === 0) return null;
  // 50% chance of "no match found"
  if (Math.random() < 0.5) return null;
  // Pick a random person from the database
  const idx = Math.floor(Math.random() * globalDb.length);
  return globalDb[idx];
}
