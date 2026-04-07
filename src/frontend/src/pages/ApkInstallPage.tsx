import {
  AlertCircle,
  CheckCircle2,
  Download,
  Info,
  Monitor,
  Package,
  Smartphone,
  Tablet,
  Upload,
  Wifi,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ApkVersion {
  id: string;
  name: string;
  version: string;
  size: string;
  releaseDate: string;
  status: "stable" | "beta" | "deprecated";
  changelog: string[];
  minAndroid: string;
  downloads: number;
}

const APK_VERSIONS: ApkVersion[] = [
  {
    id: "v3.2.1",
    name: "MASTERKEY Security v3.2.1",
    version: "3.2.1",
    size: "24.8 MB",
    releaseDate: "2026-04-01",
    status: "stable",
    changelog: [
      "Face recognition accuracy improved to 97%",
      "Criminal alert system optimized",
      "Admin panel bug fixes",
      "Performance improvements",
    ],
    minAndroid: "Android 8.0+",
    downloads: 1284,
  },
  {
    id: "v3.1.0",
    name: "MASTERKEY Security v3.1.0",
    version: "3.1.0",
    size: "22.4 MB",
    releaseDate: "2026-02-14",
    status: "stable",
    changelog: [
      "Added offline search support",
      "Dark mode enhancements",
      "Push notification system",
    ],
    minAndroid: "Android 8.0+",
    downloads: 3421,
  },
  {
    id: "v3.3.0-beta",
    name: "MASTERKEY Security v3.3.0 BETA",
    version: "3.3.0-beta",
    size: "26.1 MB",
    releaseDate: "2026-04-04",
    status: "beta",
    changelog: [
      "[BETA] Real-time police database sync",
      "[BETA] Multi-language support",
      "[BETA] Biometric login",
    ],
    minAndroid: "Android 9.0+",
    downloads: 198,
  },
];

const INSTALL_STEPS = [
  {
    id: "step1",
    icon: <Smartphone size={18} />,
    title: "Step 1 — Unknown Sources Allow Karen",
    desc: 'Phone Settings → Security → "Unknown Sources" ya "Install Unknown Apps" enable karen.',
    note: "Samsung: Settings > Apps > Special Access > Install Unknown Apps",
  },
  {
    id: "step2",
    icon: <Download size={18} />,
    title: "Step 2 — APK Download Karen",
    desc: "Niche diye gaye latest version ka Download button dabayein. File Downloads folder mein save hogi.",
    note: "File .apk extension ke saath download hogi",
  },
  {
    id: "step3",
    icon: <Package size={18} />,
    title: "Step 3 — APK Install Karen",
    desc: 'Downloads folder mein jao, APK file tap karo, "INSTALL" press karo.',
    note: "Installation 30-60 seconds mein complete hogi",
  },
  {
    id: "step4",
    icon: <CheckCircle2 size={18} />,
    title: "Step 4 — App Open Karen",
    desc: 'Install hone ke baad "OPEN" dabayein ya app drawer se MASTERKEY icon dhundhen.',
    note: "Admin login: admin / 504560@AUC",
  },
];

export default function ApkInstallPage() {
  const [selectedVersion, setSelectedVersion] = useState<ApkVersion>(
    APK_VERSIONS[0],
  );
  const [downloading, setDownloading] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    setDownloading(true);
    toast.info(
      `Downloading ${selectedVersion.name} (${selectedVersion.size})...`,
    );
    setTimeout(() => {
      setDownloading(false);
      toast.success(
        `${selectedVersion.name} download complete! APK file saved.`,
      );
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".apk")) {
      toast.error("Only .apk files are allowed");
      return;
    }
    setUploadedFile(file);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          toast.success(`APK "${file.name}" uploaded successfully!`);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  const statusColor = {
    stable: { bg: "#0a2010", border: "#2e7d32", text: "#4caf50" },
    beta: { bg: "#1a1a2e", border: "#5c6bc0", text: "#7986cb" },
    deprecated: { bg: "#2a1216", border: "#c62828", text: "#ef9a9a" },
  };

  const cardStyle: React.CSSProperties = {
    background: "#1a2433",
    border: "1px solid #2a3648",
    borderRadius: 12,
    padding: 20,
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          style={{
            background: "linear-gradient(135deg, #c62828, #d32f2f)",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 0 24px rgba(211,47,47,0.35)",
          }}
        >
          <Package size={24} color="white" />
        </div>
        <div>
          <h1
            style={{
              color: "#f2f5fa",
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 2,
              margin: 0,
            }}
          >
            APK INSTALL SYSTEM
          </h1>
          <p style={{ color: "#7e8aa0", fontSize: 12, margin: "4px 0 0" }}>
            Android App — Secure Distribution Portal
          </p>
        </div>
      </div>

      {/* Device Compatibility Banner */}
      <div
        style={{
          background: "#111a28",
          border: "1px solid #243044",
          borderRadius: 10,
          padding: "12px 20px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Info size={14} color="#42a5f5" />
        <span style={{ color: "#a7b1c2", fontSize: 12, flex: 1 }}>
          Supported devices:
        </span>
        {[
          { label: "Android Phones", icon: <Smartphone size={13} /> },
          { label: "Android Tablets", icon: <Tablet size={13} /> },
          { label: "Android 8.0+", icon: <Wifi size={13} /> },
          { label: "Min 2GB RAM", icon: <Monitor size={13} /> },
        ].map((d) => (
          <span
            key={d.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "#1a2433",
              border: "1px solid #2a3648",
              borderRadius: 20,
              padding: "4px 12px",
              color: "#a7b1c2",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {d.icon}
            {d.label}
          </span>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 28,
        }}
        className="max-md:grid-cols-1"
      >
        {/* Version Selector */}
        <div style={cardStyle}>
          <h2
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            AVAILABLE VERSIONS
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {APK_VERSIONS.map((v) => {
              const sc = statusColor[v.status];
              const isSelected = selectedVersion.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVersion(v)}
                  style={{
                    background: isSelected ? "#1e2d42" : "#111a28",
                    border: isSelected
                      ? "1px solid #e53935"
                      : "1px solid #2a3648",
                    borderRadius: 8,
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: 4 }}
                  >
                    <span
                      style={{
                        color: "#f2f5fa",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      v{v.version}
                    </span>
                    <span
                      style={{
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                        color: sc.text,
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {v.status.toUpperCase()}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#7e8aa0",
                      fontSize: 11,
                      display: "flex",
                      gap: 12,
                    }}
                  >
                    <span>{v.size}</span>
                    <span>{v.releaseDate}</span>
                    <span>{v.downloads.toLocaleString()} downloads</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Version Detail */}
        <div style={cardStyle}>
          <h2
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            VERSION DETAILS
          </h2>
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                color: "#e53935",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              {selectedVersion.name}
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                color: "#7e8aa0",
                fontSize: 12,
                flexWrap: "wrap",
              }}
            >
              <span>📦 {selectedVersion.size}</span>
              <span>📅 {selectedVersion.releaseDate}</span>
              <span>📱 {selectedVersion.minAndroid}</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                color: "#7e8aa0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              CHANGELOG
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {selectedVersion.changelog.map((c) => (
                <li
                  key={c}
                  style={{
                    color: "#a7b1c2",
                    fontSize: 12,
                    padding: "4px 0",
                    borderBottom: "1px solid #1e2d42",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#4caf50", marginTop: 1 }}>✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            style={{
              width: "100%",
              padding: "13px",
              background: downloading
                ? "#2a3648"
                : "linear-gradient(135deg, #c62828, #d32f2f)",
              border: "none",
              borderRadius: 8,
              color: "white",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              cursor: downloading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: downloading ? "none" : "0 0 16px rgba(211,47,47,0.35)",
              transition: "all 0.2s",
            }}
          >
            <Download size={16} />
            {downloading
              ? "DOWNLOADING..."
              : `DOWNLOAD APK (${selectedVersion.size})`}
          </button>
        </div>
      </div>

      {/* Installation Guide */}
      <div style={{ ...cardStyle, marginBottom: 28 }}>
        <h2
          style={{
            color: "#f2f5fa",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1,
            marginBottom: 20,
            marginTop: 0,
          }}
        >
          INSTALLATION GUIDE (Step by Step)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {INSTALL_STEPS.map((step, i) => (
            <div
              key={step.id}
              style={{
                background: "#111a28",
                border: "1px solid #2a3648",
                borderRadius: 10,
                padding: 16,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: 16,
                  background: "#e53935",
                  color: "white",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  color: "#e53935",
                  marginBottom: 8,
                  marginTop: 6,
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  color: "#f2f5fa",
                  fontWeight: 700,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                {step.title}
              </div>
              <p
                style={{
                  color: "#a7b1c2",
                  fontSize: 11,
                  lineHeight: 1.6,
                  margin: "0 0 8px",
                }}
              >
                {step.desc}
              </p>
              <div
                style={{
                  background: "#1a2433",
                  border: "1px solid #243044",
                  borderRadius: 6,
                  padding: "6px 10px",
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
              >
                💡 {step.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload New APK (Admin) */}
      <div style={cardStyle}>
        <div className="flex items-center justify-between mb-4">
          <h2
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              margin: 0,
            }}
          >
            UPLOAD NEW APK VERSION (Admin Only)
          </h2>
          <button
            type="button"
            onClick={() => setUploadMode(!uploadMode)}
            style={{
              background: uploadMode ? "#3a1216" : "#1e2d42",
              border: `1px solid ${uploadMode ? "#c62828" : "#2a3648"}`,
              borderRadius: 6,
              padding: "6px 14px",
              color: uploadMode ? "#ff5252" : "#a7b1c2",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
          >
            {uploadMode ? "CANCEL" : "+ UPLOAD APK"}
          </button>
        </div>

        {uploadMode && (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: "100%",
                border: "2px dashed #2a3648",
                borderRadius: 10,
                padding: 32,
                textAlign: "center",
                cursor: "pointer",
                background: "#111a28",
                marginBottom: 16,
                transition: "border-color 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Upload size={32} color="#7e8aa0" />
              <p style={{ color: "#a7b1c2", fontSize: 13, margin: "0 0 4px" }}>
                Click to select APK file
              </p>
              <p style={{ color: "#7e8aa0", fontSize: 11, margin: 0 }}>
                Only .apk files accepted • Max 100 MB
              </p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".apk"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />

            {uploadedFile && (
              <div
                style={{
                  background: "#111a28",
                  border: "1px solid #2a3648",
                  borderRadius: 8,
                  padding: 14,
                }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: 8 }}
                >
                  <span
                    style={{ color: "#f2f5fa", fontSize: 12, fontWeight: 600 }}
                  >
                    📦 {uploadedFile.name}
                  </span>
                  <span style={{ color: "#7e8aa0", fontSize: 11 }}>
                    {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div
                  style={{
                    background: "#1a2433",
                    borderRadius: 4,
                    height: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${uploadProgress}%`,
                      height: "100%",
                      background:
                        uploadProgress === 100 ? "#4caf50" : "#e53935",
                      borderRadius: 4,
                      transition: "width 0.2s",
                    }}
                  />
                </div>
                {uploadProgress === 100 && (
                  <div
                    className="flex items-center gap-2"
                    style={{ marginTop: 8 }}
                  >
                    <CheckCircle2 size={14} color="#4caf50" />
                    <span style={{ color: "#4caf50", fontSize: 12 }}>
                      Upload complete
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!uploadMode && (
          <div
            className="flex items-center gap-3"
            style={{ color: "#7e8aa0", fontSize: 12 }}
          >
            <AlertCircle size={14} color="#f57f17" />
            Admin access required to upload new APK versions.
          </div>
        )}
      </div>
    </div>
  );
}
