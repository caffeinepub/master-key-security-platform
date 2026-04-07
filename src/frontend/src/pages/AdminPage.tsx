import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  type DbRecord,
  type UserStatus,
  addRecord,
  deleteRecord,
  globalDb,
  updateRecord,
} from "../store/database";

const ACTIVITY_LOGS = [
  {
    id: "AL-001",
    action: "User added",
    by: "Admin",
    detail: "Ravi Kumar Sharma added",
    time: "2026-01-10 09:12",
  },
  {
    id: "AL-002",
    action: "Status changed",
    by: "Admin",
    detail: "Priya Singh: normal → suspicious",
    time: "2026-01-16 14:30",
  },
  {
    id: "AL-003",
    action: "User added",
    by: "Admin",
    detail: "Mohammad Asif Khan added",
    time: "2026-02-01 11:05",
  },
  {
    id: "AL-004",
    action: "Search flagged",
    by: "System",
    detail: "Face match 94% — criminal alert triggered",
    time: "2026-03-15 16:42",
  },
  {
    id: "AL-005",
    action: "User added",
    by: "Admin",
    detail: "Anita Devi Gupta added",
    time: "2026-02-10 10:00",
  },
];

function StatusBadge({ status }: { status: UserStatus }) {
  const styles: Record<UserStatus, React.CSSProperties> = {
    criminal: {
      background: "#3a1216",
      border: "1px solid #c62828",
      color: "#ff5252",
    },
    suspicious: {
      background: "#2a1f0a",
      border: "1px solid #f57f17",
      color: "#ffb300",
    },
    normal: {
      background: "#0a2010",
      border: "1px solid #2e7d32",
      color: "#4caf50",
    },
  };
  const icons = {
    criminal: <AlertTriangle size={10} />,
    suspicious: <AlertTriangle size={10} />,
    normal: <CheckCircle size={10} />,
  };
  return (
    <span
      style={{
        ...styles[status],
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {icons[status]}
      {status === "criminal" ? "🚨 CRIMINAL" : status.toUpperCase()}
    </span>
  );
}

export default function AdminPage() {
  // Force re-render when globalDb changes by tracking length
  const [dbVersion, setDbVersion] = useState(0);
  const refresh = () => setDbVersion((v) => v + 1);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "logs" | "add">("users");
  const [editId, setEditId] = useState<number | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    status: "normal" as UserStatus,
    flagReason: "",
    photo: null as string | null,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _dep = dbVersion; // consumed so eslint doesn't complain

  const filteredUsers = globalDb.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search),
  );

  const handleDelete = (id: number) => {
    deleteRecord(id);
    refresh();
    toast.success("User record deleted");
  };

  const handleResetCode = (id: number) => {
    const newCode = `MK-${Math.floor(1000 + Math.random() * 9000)}`;
    updateRecord(id, { accessCode: newCode });
    refresh();
    toast.success(`Access code reset to ${newCode}`);
  };

  const handleStatusChange = (id: number, status: UserStatus) => {
    updateRecord(id, { status });
    refresh();
    setEditId(null);
    toast.success("Status updated");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      setForm((prev) => ({ ...prev, photo: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.address.trim()) {
      toast.error("Name, Mobile, and Address are required");
      return;
    }
    addRecord({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      altNumbers: [],
      address: form.address.trim(),
      email: "",
      dob: "",
      aadhaar: "XXXX-XXXX-0000",
      pan: "",
      nationality: "Indian",
      state: form.state.trim() || "India",
      status: form.status,
      flagReason: form.flagReason.trim() || null,
      photo: form.photo,
      criminalHistory: [],
      social: { facebook: "", instagram: "", twitter: "", linkedin: "" },
      lastSeenLocations: [],
      newsLinks: [],
      internetSources: [],
      vehicleInfo: "",
      associates: [],
    });
    refresh();
    setForm({
      name: "",
      mobile: "",
      address: "",
      state: "",
      status: "normal",
      flagReason: "",
      photo: null,
    });
    setPhotoPreview(null);
    setActiveTab("users");
    toast.success("✅ User record added — now searchable in Search page");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    background: "#111a28",
    border: "1px solid #2a3648",
    borderRadius: 8,
    color: "#f2f5fa",
    fontSize: 13,
    outline: "none",
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-6">
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
            ADMIN PANEL
          </h1>
          <p style={{ color: "#7e8aa0", fontSize: 12, margin: "4px 0 0" }}>
            Restricted — Authorized Personnel Only &nbsp;·&nbsp;{" "}
            {globalDb.length} total records
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toast.info("Export initiated — PDF generating...")}
            style={{
              background: "transparent",
              border: "1px solid #2a3648",
              color: "#a7b1c2",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Download size={12} /> EXPORT PDF
          </button>
          <button
            type="button"
            onClick={() => toast.info("Export initiated — Excel generating...")}
            style={{
              background: "transparent",
              border: "1px solid #2a3648",
              color: "#a7b1c2",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Download size={12} /> EXPORT EXCEL
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["users", "add", "logs"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTab(t)}
            style={
              {
                padding: "8px 18px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                background:
                  activeTab === t
                    ? "linear-gradient(135deg, #c62828, #d32f2f)"
                    : "#1a2433",
                color: activeTab === t ? "white" : "#7e8aa0",
                border: activeTab === t ? "none" : "1px solid #2a3648",
                display: "flex",
                alignItems: "center",
                gap: 6,
              } as React.CSSProperties
            }
          >
            {t === "users" && <Users size={12} />}
            {t === "add" && <Plus size={12} />}
            {t === "logs" && <Activity size={12} />}
            {t === "users"
              ? "MANAGE USERS"
              : t === "add"
                ? "ADD USER"
                : "ACTIVITY LOGS"}
          </button>
        ))}
      </div>

      {/* Users Table */}
      {activeTab === "users" && (
        <div className="security-card" style={{ padding: 24 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={13}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#7e8aa0",
                }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by name or mobile..."
                style={{ ...inputStyle, paddingLeft: 30 }}
              />
            </div>
            <span style={{ color: "#7e8aa0", fontSize: 12 }}>
              {filteredUsers.length} records
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "ID",
                    "PHOTO",
                    "NAME",
                    "MOBILE",
                    "ADDRESS",
                    "STATE",
                    "STATUS",
                    "ACCESS CODE",
                    "CREATED",
                    "ACTIONS",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: "#7e8aa0",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textAlign: "left",
                        padding: "8px 12px",
                        borderBottom: "1px solid #2a3648",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#7e8aa0",
                        fontSize: 13,
                      }}
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      style={{ borderBottom: "1px solid #1e2d42" }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        #{u.id}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        {u.photo ? (
                          <img
                            src={u.photo}
                            alt={u.name}
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 6,
                              objectFit: "cover",
                              border: "1px solid #2a3648",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 6,
                              background: "#1e2d42",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Users size={14} style={{ color: "#7e8aa0" }} />
                          </div>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#f2f5fa",
                          fontSize: 13,
                          fontWeight: 600,
                          minWidth: 140,
                        }}
                      >
                        {u.name}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#a7b1c2",
                          fontSize: 12,
                          fontFamily: "monospace",
                        }}
                      >
                        {u.mobile}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          maxWidth: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {u.address}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#7e8aa0",
                          fontSize: 11,
                        }}
                      >
                        {u.state}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        {editId === u.id ? (
                          <select
                            value={u.status}
                            onChange={(e) =>
                              handleStatusChange(
                                u.id,
                                e.target.value as UserStatus,
                              )
                            }
                            style={{
                              ...inputStyle,
                              padding: "4px 8px",
                              width: "auto",
                            }}
                          >
                            <option value="normal">Normal</option>
                            <option value="suspicious">Suspicious</option>
                            <option value="criminal">Criminal</option>
                          </select>
                        ) : (
                          <StatusBadge status={u.status} />
                        )}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {u.accessCode}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#7e8aa0",
                          fontSize: 11,
                        }}
                      >
                        {u.createdAt}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setEditId(editId === u.id ? null : u.id)
                            }
                            style={{
                              background: "#1e2d42",
                              border: "none",
                              borderRadius: 6,
                              padding: "5px 8px",
                              cursor: "pointer",
                              color: "#a7b1c2",
                            }}
                            title="Edit status"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResetCode(u.id)}
                            style={{
                              background: "#1e2d42",
                              border: "none",
                              borderRadius: 6,
                              padding: "5px 8px",
                              cursor: "pointer",
                              color: "#42a5f5",
                            }}
                            title="Reset access code"
                          >
                            <RotateCcw size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(u.id)}
                            style={{
                              background: "#3a1216",
                              border: "none",
                              borderRadius: 6,
                              padding: "5px 8px",
                              cursor: "pointer",
                              color: "#ff5252",
                            }}
                            title="Delete record"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Form */}
      {activeTab === "add" && (
        <div className="security-card" style={{ padding: 32, maxWidth: 580 }}>
          <h2
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 1,
              marginBottom: 24,
            }}
          >
            ADD USER RECORD
          </h2>
          <form
            onSubmit={handleAddUser}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Photo Upload */}
            <div>
              <label
                htmlFor="photo-upload"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                PHOTO (OPTIONAL)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      objectFit: "cover",
                      border: "2px solid #2a3648",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      background: "#1e2d42",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #2a3648",
                    }}
                  >
                    <Users size={24} style={{ color: "#7e8aa0" }} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => photoRef.current?.click()}
                  style={{
                    background: "#1e2d42",
                    border: "1px solid #2a3648",
                    color: "#a7b1c2",
                    padding: "8px 16px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Upload size={12} />
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                </button>
                <input
                  id="photo-upload"
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="add-name"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                FULL NAME *
              </label>
              <input
                id="add-name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Rahul Kumar Singh"
                style={inputStyle}
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="add-mobile"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                MOBILE NUMBER *
              </label>
              <div style={{ position: "relative" }}>
                <Phone
                  size={13}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7e8aa0",
                  }}
                />
                <input
                  id="add-mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                  placeholder="+91-9876543210"
                  style={{ ...inputStyle, paddingLeft: 30 }}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="add-address"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                ADDRESS *
              </label>
              <input
                id="add-address"
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Full residential address"
                style={inputStyle}
                required
              />
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="add-state"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                STATE
              </label>
              <input
                id="add-state"
                type="text"
                value={form.state}
                onChange={(e) =>
                  setForm((p) => ({ ...p, state: e.target.value }))
                }
                placeholder="e.g. Delhi, Maharashtra, UP"
                style={inputStyle}
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="add-status"
                style={{
                  color: "#7e8aa0",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                STATUS
              </label>
              <select
                id="add-status"
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as UserStatus,
                  }))
                }
                style={inputStyle}
              >
                <option value="normal">Normal</option>
                <option value="suspicious">Suspicious</option>
                <option value="criminal">Criminal 🚨</option>
              </select>
            </div>

            {/* Flag Reason (only if suspicious/criminal) */}
            {(form.status === "suspicious" || form.status === "criminal") && (
              <div>
                <label
                  htmlFor="add-flag"
                  style={{
                    color: "#7e8aa0",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  FLAG REASON
                </label>
                <input
                  id="add-flag"
                  type="text"
                  value={form.flagReason}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, flagReason: e.target.value }))
                  }
                  placeholder="Reason for flagging (e.g. FIR No. 123/2026, fraud case)"
                  style={inputStyle}
                />
              </div>
            )}

            {form.status === "criminal" && (
              <div
                style={{
                  background: "#3a1216",
                  border: "1px solid #c62828",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <p style={{ color: "#ff8a80", fontSize: 12, margin: 0 }}>
                  🚨 This user will be flagged with a RED ALERT upon search.
                </p>
              </div>
            )}

            <div
              style={{
                background: "#0a1628",
                border: "1px solid #1e3a5f",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <p style={{ color: "#42a5f5", fontSize: 11, margin: 0 }}>
                ℹ️ After adding, this user will instantly appear in Search page
                results.
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="btn-danger"
                style={{
                  flex: 1,
                  padding: "12px",
                  fontSize: 13,
                  letterSpacing: 1,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ADD USER RECORD
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("users")}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontSize: 13,
                  letterSpacing: 1,
                  border: "1px solid #2a3648",
                  background: "transparent",
                  color: "#a7b1c2",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activity Logs */}
      {activeTab === "logs" && (
        <div className="security-card" style={{ padding: 24 }}>
          <h2
            style={{
              color: "#f2f5fa",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1,
              marginBottom: 16,
            }}
          >
            SYSTEM ACTIVITY LOGS
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "LOG ID",
                    "ACTION",
                    "PERFORMED BY",
                    "DETAILS",
                    "TIMESTAMP",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: "#7e8aa0",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textAlign: "left",
                        padding: "8px 12px",
                        borderBottom: "1px solid #2a3648",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACTIVITY_LOGS.map((log) => (
                  <tr
                    key={log.id}
                    style={{ borderBottom: "1px solid #1e2d42" }}
                  >
                    <td
                      style={{
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      {log.id}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          background: "#1e2d42",
                          color: "#a7b1c2",
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#a7b1c2",
                        fontSize: 12,
                      }}
                    >
                      {log.by}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 12,
                      }}
                    >
                      {log.detail}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      {log.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
