// ─── Shared Database Store ───────────────────────────────────────────────────
// Single source of truth for both Search page and Admin page.

export type UserStatus = "normal" | "suspicious" | "criminal";

export interface LiveActivity {
  timestamp: string;
  action: string;
  location: string;
  source: string;
  device?: string;
  ip?: string;
}

export interface DbRecord {
  id: number;
  name: string;
  mobile: string;
  altNumbers: string[];
  address: string;
  aadhaarAddress: string; // Address registered on Aadhaar
  email: string;
  dob: string;
  aadhaar: string;
  pan: string;
  nationality: string;
  state: string;
  registeredLocation: string; // City/district from Aadhaar registration
  status: UserStatus;
  flagReason: string | null;
  photo: string | null;
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
    youtube: string;
    telegram: string;
    whatsapp: string;
  };
  lastSeenLocations: {
    place: string;
    date: string;
    source: string;
    coordinates?: string;
  }[];
  liveActivity: LiveActivity[]; // Recent digital activity timeline
  newsLinks: {
    source: string;
    headline: string;
    url: string;
    date: string;
    snippet: string;
  }[];
  internetSources: { site: string; url: string; snippet: string }[];
  videoLinks: { title: string; url: string; platform: string; date: string }[];
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
    aadhaarAddress:
      "B-14, Sector 22, Rohini, North West Delhi - 110085 (Registered: 2018)",
    email: "ravi.k.sharma@gmail.com",
    dob: "1985-03-12",
    aadhaar: "XXXX-XXXX-4521",
    pan: "ABCDE1234F",
    nationality: "Indian",
    state: "Delhi",
    registeredLocation: "Rohini, North West Delhi, Delhi",
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
      instagram: "ravi_sharma_official",
      twitter: "RaviSharmaDelhi",
      linkedin: "ravi-kumar-sharma-delhi",
      youtube: "RaviSharmaDelhi",
      telegram: "ravi_sharma_delhi",
      whatsapp: "+91-9876543210",
    },
    lastSeenLocations: [
      {
        place: "Rohini, Delhi",
        date: "2026-04-01",
        source: "Facebook Check-in",
        coordinates: "28.7041° N, 77.1025° E",
      },
      {
        place: "Chandigarh, Punjab",
        date: "2026-03-20",
        source: "Instagram Story",
        coordinates: "30.7333° N, 76.7794° E",
      },
      {
        place: "Gurgaon, Haryana",
        date: "2026-02-28",
        source: "Mobile Tower Data",
        coordinates: "28.4595° N, 77.0266° E",
      },
      {
        place: "Paharganj, Delhi",
        date: "2026-02-10",
        source: "ATM Transaction",
        coordinates: "28.6448° N, 77.2167° E",
      },
    ],
    liveActivity: [
      {
        timestamp: "2026-04-06 11:42 AM",
        action: "WhatsApp Online",
        location: "Rohini, Delhi",
        source: "WhatsApp Status",
        device: "Android Samsung Galaxy A54",
        ip: "49.36.XXX.XXX",
      },
      {
        timestamp: "2026-04-05 09:15 PM",
        action: "Facebook Post Liked",
        location: "Rohini, Delhi",
        source: "Facebook Activity",
        device: "Android",
        ip: "49.36.XXX.XXX",
      },
      {
        timestamp: "2026-04-03 02:30 PM",
        action: "Instagram Story Viewed",
        location: "Chandigarh, Punjab",
        source: "Instagram",
        device: "iPhone 12",
        ip: "103.21.XXX.XXX",
      },
      {
        timestamp: "2026-04-01 10:00 AM",
        action: "Mobile Tower Ping",
        location: "Sector 22, Rohini",
        source: "Telecom Data",
        device: "Mobile",
        ip: "N/A",
      },
      {
        timestamp: "2026-03-30 08:45 PM",
        action: "UPI Transaction",
        location: "Rohini Market, Delhi",
        source: "PhonePe Activity",
        device: "Android",
        ip: "49.36.XXX.XXX",
      },
    ],
    newsLinks: [
      {
        source: "Hindustan Times",
        headline:
          "Delhi man arrested for ₹2.4 crore bank fraud, absconding since 2024",
        url: "https://www.hindustantimes.com/cities/delhi-news/bank-fraud-rohini",
        date: "2024-11-05",
        snippet:
          "Ravi Kumar Sharma, 39, resident of Rohini, is accused of duping multiple bank customers in a ₹2.4 crore fraud scheme...",
      },
      {
        source: "NDTV",
        headline: "Bank fraud kingpin traced to Chandigarh after Delhi escape",
        url: "https://www.ndtv.com/india-news/bank-fraud-chandigarh",
        date: "2026-03-22",
        snippet:
          "Delhi Police believes Ravi Sharma is now hiding in Chandigarh after his Instagram story revealed his location...",
      },
      {
        source: "Aaj Tak",
        headline: "रोहिणी में बैंक ठग का पर्दाफाश, 2.4 करोड़ का मामला",
        url: "https://www.aajtak.in/crime/rohini-bank-fraud",
        date: "2024-11-06",
        snippet: "रोहिणी निवासी रवि कुमार शर्मा पर CBI ने वारंट जारी किया है...",
      },
      {
        source: "Dainik Bhaskar",
        headline: "दिल्ली के बैंक ठग पर 5 लाख का इनाम",
        url: "https://www.bhaskar.com/delhi/bank-fraud-reward",
        date: "2025-01-12",
        snippet:
          "दिल्ली पुलिस ने रवि शर्मा की गिरफ्तारी के लिए 5 लाख रुपये के इनाम की घोषणा की...",
      },
    ],
    internetSources: [
      {
        site: "Facebook Profile",
        url: "https://facebook.com/ravi.k.sharma.delhi",
        snippet:
          "Ravi K Sharma — Rohini, Delhi. 1.2K friends. Profile public. Last post 3 days ago.",
      },
      {
        site: "Instagram Profile",
        url: "https://instagram.com/ravi_sharma_official",
        snippet:
          "@ravi_sharma_official — 450 followers. Last story posted from Chandigarh.",
      },
      {
        site: "LinkedIn Profile",
        url: "https://linkedin.com/in/ravi-kumar-sharma-delhi",
        snippet:
          "Ravi Kumar Sharma — Finance Consultant. Delhi. 200+ connections.",
      },
      {
        site: "CBI / Delhi Court Records",
        url: "https://delhicourts.nic.in",
        snippet:
          "Case #1142/2024 — Ravi Kumar Sharma. Bank fraud IPC 420/465. Warrant Active.",
      },
      {
        site: "Google Search",
        url: "https://google.com/search?q=Ravi+Kumar+Sharma+Delhi+Bank+Fraud",
        snippet:
          "Multiple news articles about bank fraud case. CBI most wanted list mention.",
      },
    ],
    videoLinks: [
      {
        title: "Rohini Bank Fraud Exposed — News Report",
        url: "https://www.youtube.com/results?search_query=rohini+bank+fraud+ravi+sharma",
        platform: "YouTube",
        date: "2024-11-07",
      },
      {
        title: "NDTV Crime Report — Delhi Fraud Kingpin",
        url: "https://www.youtube.com/results?search_query=delhi+bank+fraud+CBI+2024",
        platform: "YouTube",
        date: "2026-03-23",
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
    aadhaarAddress:
      "32, Gandhi Nagar, Bhopal, Madhya Pradesh - 462001 (Registered: 2019)",
    email: "priya.singhchauhan@yahoo.com",
    dob: "1993-07-25",
    aadhaar: "XXXX-XXXX-7890",
    pan: "BVHXY5432K",
    nationality: "Indian",
    state: "Madhya Pradesh",
    registeredLocation: "Gandhi Nagar, Bhopal, Madhya Pradesh",
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
      instagram: "priyasingh_bhopal",
      twitter: "PriyaSinghCBPL",
      linkedin: "",
      youtube: "",
      telegram: "priyabhopal_official",
      whatsapp: "+91-8765432109",
    },
    lastSeenLocations: [
      {
        place: "Bhopal, MP",
        date: "2026-04-03",
        source: "Twitter Activity",
        coordinates: "23.2599° N, 77.4126° E",
      },
      {
        place: "Indore, MP",
        date: "2026-03-15",
        source: "Instagram Post",
        coordinates: "22.7196° N, 75.8577° E",
      },
      {
        place: "Jabalpur, MP",
        date: "2026-02-20",
        source: "Telegram Message",
        coordinates: "23.1815° N, 79.9864° E",
      },
    ],
    liveActivity: [
      {
        timestamp: "2026-04-07 08:30 AM",
        action: "Telegram Active",
        location: "Bhopal, MP",
        source: "Telegram",
        device: "Android Redmi Note 12",
        ip: "117.196.XXX.XXX",
      },
      {
        timestamp: "2026-04-06 11:00 PM",
        action: "WhatsApp Last Seen",
        location: "Bhopal, MP",
        source: "WhatsApp",
        device: "Android",
        ip: "117.196.XXX.XXX",
      },
      {
        timestamp: "2026-04-05 03:15 PM",
        action: "Instagram Story Posted",
        location: "Indore, MP",
        source: "Instagram",
        device: "iPhone SE",
        ip: "103.82.XXX.XXX",
      },
      {
        timestamp: "2026-04-02 06:00 PM",
        action: "Twitter Post",
        location: "Bhopal, MP",
        source: "Twitter/X",
        device: "Web Browser",
        ip: "117.196.XXX.XXX",
      },
    ],
    newsLinks: [
      {
        source: "Dainik Bhaskar",
        headline: "भोपाल में साइबर ठगी नेटवर्क का भंडाफोड़",
        url: "https://www.bhaskar.com/mp/bhopal/cyber-fraud-network",
        date: "2025-08-12",
        snippet:
          "भोपाल साइबर सेल ने एक बड़े ठगी नेटवर्क का भंडाफोड़ किया जिसमें प्रिया सिंह चौहान का नाम सामने आया...",
      },
      {
        source: "NDTV India",
        headline:
          "MP Cyber Cell busts sextortion gang, woman accused under investigation",
        url: "https://www.ndtv.com/india-news/mp-cyber-fraud-gang",
        date: "2025-09-05",
        snippet:
          "Madhya Pradesh Cyber Cell arrested key members of a sextortion network...",
      },
    ],
    internetSources: [
      {
        site: "Facebook Profile",
        url: "https://facebook.com/priya.singh.chauhan.bpl",
        snippet: "Priya Singh Chauhan — Bhopal. 800+ friends. Active profile.",
      },
      {
        site: "Instagram Profile",
        url: "https://instagram.com/priyasingh_bhopal",
        snippet: "@priyasingh_bhopal — 2.1K followers. Stories active.",
      },
      {
        site: "MP Cyber Cell Records",
        url: "https://mppolice.gov.in",
        snippet:
          "Case filed — MP Cyber Cell FIR No. 445/2023. Status: Under Investigation.",
      },
      {
        site: "Google Search",
        url: "https://google.com/search?q=Priya+Singh+Chauhan+Bhopal+Cyber+Fraud",
        snippet: "Cyber fraud investigation news. MP Police records.",
      },
    ],
    videoLinks: [
      {
        title: "Bhopal Cyber Fraud Gang Exposed",
        url: "https://www.youtube.com/results?search_query=bhopal+cyber+fraud+2025",
        platform: "YouTube",
        date: "2025-08-13",
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
    aadhaarAddress:
      "Plot No 45, Shivajinagar, Pune, Maharashtra - 411005 (Registered: 2017)",
    email: "suresh.patil.pune@gmail.com",
    dob: "1978-11-08",
    aadhaar: "XXXX-XXXX-2345",
    pan: "CRTPQ9876H",
    nationality: "Indian",
    state: "Maharashtra",
    registeredLocation: "Shivajinagar, Pune, Maharashtra",
    status: "normal",
    flagReason: null,
    photo: null,
    criminalHistory: [],
    social: {
      facebook: "suresh.narayan.patil.pune",
      instagram: "sureshpatil_pune",
      twitter: "",
      linkedin: "suresh-narayan-patil",
      youtube: "",
      telegram: "",
      whatsapp: "+91-7654321987",
    },
    lastSeenLocations: [
      {
        place: "Pune, Maharashtra",
        date: "2026-04-05",
        source: "Facebook Check-in",
        coordinates: "18.5204° N, 73.8567° E",
      },
      {
        place: "Mumbai, Maharashtra",
        date: "2026-03-28",
        source: "LinkedIn Post",
        coordinates: "19.0760° N, 72.8777° E",
      },
    ],
    liveActivity: [
      {
        timestamp: "2026-04-06 05:30 PM",
        action: "LinkedIn Post Published",
        location: "Pune, Maharashtra",
        source: "LinkedIn",
        device: "Windows PC",
        ip: "122.161.XXX.XXX",
      },
      {
        timestamp: "2026-04-05 09:00 AM",
        action: "WhatsApp Online",
        location: "Pune, Maharashtra",
        source: "WhatsApp",
        device: "Android OnePlus 11",
        ip: "122.161.XXX.XXX",
      },
    ],
    newsLinks: [],
    internetSources: [
      {
        site: "LinkedIn Profile",
        url: "https://linkedin.com/in/suresh-narayan-patil",
        snippet:
          "Suresh Patil — Senior Engineer at TCS, Pune. No criminal record found.",
      },
      {
        site: "Facebook Profile",
        url: "https://facebook.com/suresh.narayan.patil.pune",
        snippet: "Suresh Narayan Patil — Pune. 500 friends.",
      },
      {
        site: "Google Search",
        url: "https://google.com/search?q=Suresh+Narayan+Patil+Pune",
        snippet: "No criminal records found. Professional profile.",
      },
    ],
    videoLinks: [],
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
    aadhaarAddress:
      "12/C, Old City Road, Hyderabad, Telangana - 500002 (Registered: 2016)",
    email: "asif.khan.hyd@gmail.com",
    dob: "1989-05-17",
    aadhaar: "XXXX-XXXX-6677",
    pan: "DLMNA7654J",
    nationality: "Indian",
    state: "Telangana",
    registeredLocation: "Old City, Hyderabad, Telangana",
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
      instagram: "asif_khan_hyd",
      twitter: "",
      linkedin: "",
      youtube: "",
      telegram: "asif_hyd_official",
      whatsapp: "+91-9123456780",
    },
    lastSeenLocations: [
      {
        place: "Hyderabad, Telangana",
        date: "2026-03-30",
        source: "CCTV Near Old City",
        coordinates: "17.3850° N, 78.4867° E",
      },
      {
        place: "Bengaluru, Karnataka",
        date: "2026-03-10",
        source: "Hotel Check-in",
        coordinates: "12.9716° N, 77.5946° E",
      },
      {
        place: "Mumbai, Maharashtra",
        date: "2026-02-15",
        source: "Railway CCTV",
        coordinates: "19.0760° N, 72.8777° E",
      },
    ],
    liveActivity: [
      {
        timestamp: "2026-04-05 10:20 PM",
        action: "Telegram Active",
        location: "Hyderabad, Telangana",
        source: "Telegram",
        device: "Android Vivo Y73",
        ip: "106.203.XXX.XXX",
      },
      {
        timestamp: "2026-04-04 07:45 AM",
        action: "Facebook Messenger Active",
        location: "Hyderabad, Telangana",
        source: "Facebook",
        device: "Android",
        ip: "106.203.XXX.XXX",
      },
      {
        timestamp: "2026-03-30 04:00 PM",
        action: "CCTV Spotted",
        location: "Old City, Hyderabad",
        source: "Hyderabad Police CCTV",
        device: "N/A",
        ip: "N/A",
      },
      {
        timestamp: "2026-03-25 11:30 AM",
        action: "SIM Card Activated",
        location: "Bengaluru, Karnataka",
        source: "Telecom Record",
        device: "New SIM",
        ip: "N/A",
      },
    ],
    newsLinks: [
      {
        source: "The Hindu",
        headline:
          "NCB nabs Hyderabad drug ring, prime accused Mohammad Asif Khan absconding",
        url: "https://www.thehindu.com/news/national/telangana/ncb-hyderabad-drug-ring",
        date: "2025-07-22",
        snippet:
          "The NCB has declared Mohammad Asif Khan as wanted in connection with a ₹50 crore drug trafficking network...",
      },
      {
        source: "Hindustan Times",
        headline: "Hyderabad drug lord spotted in Bengaluru, NCB alert issued",
        url: "https://www.hindustantimes.com/india-news/hyderabad-drug-lord-bengaluru",
        date: "2026-03-11",
        snippet:
          "Mohammad Asif Khan, wanted in the Hyderabad NCB case, was reportedly spotted at a Bengaluru hotel...",
      },
      {
        source: "NDTV",
        headline: "₹50 crore drug network: Key accused still at large",
        url: "https://www.ndtv.com/india-news/drug-network-accused-at-large",
        date: "2026-01-05",
        snippet: "Mohammad Asif Khan remains at large despite NCB red alert...",
      },
    ],
    internetSources: [
      {
        site: "NCB India Records",
        url: "https://www.ncb.nic.in",
        snippet:
          "Wanted: Mohammad Asif Khan — NCB Case HYD/NCB/2025/88. Drug trafficking. Reward: ₹5 Lakhs.",
      },
      {
        site: "Facebook Profile",
        url: "https://facebook.com/asif.khan.hyderabad.official",
        snippet:
          "Asif Khan Hyderabad — 600 friends. Last seen online recently.",
      },
      {
        site: "Telegram Channel",
        url: "https://t.me/asif_hyd_official",
        snippet: "@asif_hyd_official — Telegram channel. 1.2K subscribers.",
      },
      {
        site: "Google Search",
        url: "https://google.com/search?q=Mohammad+Asif+Khan+Hyderabad+NCB",
        snippet:
          "NCB most wanted. Multiple news mentions. Drug trafficking case.",
      },
    ],
    videoLinks: [
      {
        title: "NCB Hyderabad Drug Ring Exposed — TV9 Telugu",
        url: "https://www.youtube.com/results?search_query=NCB+hyderabad+drug+ring+2025",
        platform: "YouTube",
        date: "2025-07-23",
      },
      {
        title: "Drug Lord Absconding — NDTV Report",
        url: "https://www.youtube.com/results?search_query=hyderabad+drug+lord+NCB+wanted",
        platform: "YouTube",
        date: "2026-01-06",
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
    aadhaarAddress:
      "5, Tagore Road, Civil Lines, Allahabad (Prayagraj), Uttar Pradesh - 211001 (Registered: 2015)",
    email: "anita.gupta.prayagraj@gmail.com",
    dob: "1975-09-30",
    aadhaar: "XXXX-XXXX-3399",
    pan: "EQFGH3210L",
    nationality: "Indian",
    state: "Uttar Pradesh",
    registeredLocation: "Civil Lines, Prayagraj, Uttar Pradesh",
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
      youtube: "",
      telegram: "",
      whatsapp: "+91-9012345678",
    },
    lastSeenLocations: [
      {
        place: "Prayagraj, UP",
        date: "2026-04-02",
        source: "LinkedIn Post",
        coordinates: "25.4358° N, 81.8463° E",
      },
      {
        place: "Lucknow, UP",
        date: "2026-03-18",
        source: "Travel Record",
        coordinates: "26.8467° N, 80.9462° E",
      },
      {
        place: "Varanasi, UP",
        date: "2026-02-25",
        source: "Bank ATM",
        coordinates: "25.3176° N, 82.9739° E",
      },
    ],
    liveActivity: [
      {
        timestamp: "2026-04-06 02:00 PM",
        action: "WhatsApp Online",
        location: "Prayagraj, UP",
        source: "WhatsApp",
        device: "Android Realme C35",
        ip: "49.43.XXX.XXX",
      },
      {
        timestamp: "2026-04-05 10:30 AM",
        action: "LinkedIn Activity",
        location: "Prayagraj, UP",
        source: "LinkedIn",
        device: "Windows PC",
        ip: "49.43.XXX.XXX",
      },
      {
        timestamp: "2026-04-02 04:45 PM",
        action: "ATM Withdrawal",
        location: "Civil Lines, Prayagraj",
        source: "Bank ATM Record",
        device: "Debit Card",
        ip: "N/A",
      },
      {
        timestamp: "2026-03-18 11:00 AM",
        action: "Train Ticket Booked",
        location: "Lucknow, UP",
        source: "IRCTC Record",
        device: "Mobile App",
        ip: "49.43.XXX.XXX",
      },
    ],
    newsLinks: [
      {
        source: "Amar Ujala",
        headline: "प्रयागराज में जमीन फर्जीवाड़ा: महिला सहित दो के खिलाफ FIR",
        url: "https://www.amarujala.com/uttar-pradesh/prayagraj/land-fraud-fir",
        date: "2025-09-05",
        snippet:
          "प्रयागराज पुलिस ने अनिता देवी गुप्ता सहित दो लोगों के खिलाफ जमीन फर्जीवाड़े का मामला दर्ज किया...",
      },
      {
        source: "Dainik Jagran",
        headline: "जमीन रजिस्ट्री फर्जीवाड़े में तेज हुई जांच, इलाहाबाद HC में सुनवाई",
        url: "https://www.jagran.com/uttar-pradesh/prayagraj/land-registration-fraud",
        date: "2026-02-01",
        snippet:
          "इलाहाबाद उच्च न्यायालय ने अनिता देवी गुप्ता के खिलाफ भूमि धोखाधड़ी मामले में जांच तेज करने का आदेश दिया...",
      },
    ],
    internetSources: [
      {
        site: "UP Police Records",
        url: "https://uppolice.gov.in",
        snippet:
          "FIR No. 990/2025 — Anita Devi Gupta, IPC 420/467. Land fraud investigation ongoing.",
      },
      {
        site: "LinkedIn Profile",
        url: "https://linkedin.com/in/anita-gupta-prayagraj",
        snippet:
          "Anita Gupta — Prayagraj. Property consultant. Under scrutiny.",
      },
      {
        site: "Allahabad HC Records",
        url: "https://allahabadhighcourt.in",
        snippet: "Case pending — Land fraud appeal. Hearing scheduled.",
      },
    ],
    videoLinks: [
      {
        title: "Prayagraj Land Fraud Exposed — ABP Ganga",
        url: "https://www.youtube.com/results?search_query=prayagraj+land+fraud+2025",
        platform: "YouTube",
        date: "2025-09-06",
      },
    ],
    vehicleInfo: "2019 White Hyundai Creta — UP-70-GH-1123",
    associates: ["Ramesh Chandra (Co-accused)"],
    accessCode: "MK-1005",
    createdAt: "2026-02-10",
  },
];

// ─── Global Mutable Store ─────────────────────────────────────────────────────
export const globalDb: DbRecord[] = [...SEED_DATA];

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

export function deleteRecord(id: number): void {
  const idx = globalDb.findIndex((r) => r.id === id);
  if (idx !== -1) globalDb.splice(idx, 1);
}

export function updateRecord(id: number, changes: Partial<DbRecord>): void {
  const idx = globalDb.findIndex((r) => r.id === id);
  if (idx !== -1) {
    globalDb[idx] = { ...globalDb[idx], ...changes };
  }
}

// ─── Search Logic ─────────────────────────────────────────────────────────────
export function searchByMobile(query: string): DbRecord | null {
  const q = query.trim().replace(/\D/g, "");
  if (q.length < 7) return null;
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

export function searchByName(query: string): DbRecord | null {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return null;
  const found = globalDb.find(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.address.toLowerCase().includes(q) ||
      u.state.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q),
  );
  return found ?? null;
}

export function faceMatchSearch(): DbRecord | null {
  if (globalDb.length === 0) return null;
  if (Math.random() < 0.5) return null;
  const idx = Math.floor(Math.random() * globalDb.length);
  return globalDb[idx];
}
