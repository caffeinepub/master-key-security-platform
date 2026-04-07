import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Edit,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type UserStatus = "normal" | "suspicious" | "criminal";

interface UserRecord {
  id: number;
  name: string;
  mobile: string;
  address: string;
  status: UserStatus;
  accessCode: string;
  createdAt: string;
}

const INITIAL_USERS: UserRecord[] = [
  {
    id: 1,
    name: "Marcus T. Thompson",
    mobile: "+1-555-0124",
    address: "247 East Harbor Blvd, LA",
    status: "criminal",
    accessCode: "MK-4821",
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    name: "Sarah L. Chen",
    mobile: "+1-555-0198",
    address: "88 Riverview Dr, SF",
    status: "suspicious",
    accessCode: "MK-3312",
    createdAt: "2026-02-05",
  },
  {
    id: 3,
    name: "James O. Williams",
    mobile: "+1-555-0201",
    address: "1502 Maple St, Chicago",
    status: "normal",
    accessCode: "MK-7792",
    createdAt: "2026-02-18",
  },
  {
    id: 4,
    name: "Elena Vasquez",
    mobile: "+1-555-0088",
    address: "320 Pine Ave, New York",
    status: "normal",
    accessCode: "MK-5541",
    createdAt: "2026-03-01",
  },
  {
    id: 5,
    name: "Robert K. Chang",
    mobile: "+44-7700-900123",
    address: "14 Baker St, London",
    status: "suspicious",
    accessCode: "MK-2200",
    createdAt: "2026-03-14",
  },
];

const FORM_FIELDS = [
  {
    key: "name" as const,
    label: "FULL NAME",
    placeholder: "Full legal name",
    type: "text",
  },
  {
    key: "mobile" as const,
    label: "MOBILE NUMBER",
    placeholder: "+1 (555) 000-0000",
    type: "tel",
  },
  {
    key: "address" as const,
    label: "ADDRESS",
    placeholder: "Full residential address",
    type: "text",
  },
  {
    key: "accessCode" as const,
    label: "ACCESS CODE (leave blank to auto-generate)",
    placeholder: "e.g. MK-1234",
    type: "text",
  },
];

const ACTIVITY_LOGS = [
  {
    id: "AL-001",
    action: "User added",
    by: "Admin",
    detail: "Marcus T. Thompson added",
    time: "2026-01-12 09:12",
  },
  {
    id: "AL-002",
    action: "Status changed",
    by: "Admin",
    detail: "Sarah Chen: normal → suspicious",
    time: "2026-02-06 14:30",
  },
  {
    id: "AL-003",
    action: "Access code reset",
    by: "Admin",
    detail: "James Williams — new code issued",
    time: "2026-02-20 11:05",
  },
  {
    id: "AL-004",
    action: "Search flagged",
    by: "System",
    detail: "Face match 97% — criminal alert triggered",
    time: "2026-03-15 16:42",
  },
  {
    id: "AL-005",
    action: "User deleted",
    by: "Admin",
    detail: "Record #0092 purged",
    time: "2026-03-28 10:00",
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
      {icons[status]}{" "}
      {status === "criminal" ? "🚨 CRIMINAL" : status.toUpperCase()}
    </span>
  );
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "logs" | "add">("users");
  const [editUser, setEditUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    status: "normal" as UserStatus,
    accessCode: "",
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search),
  );

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("User record deleted");
  };

  const handleResetCode = (id: number) => {
    const newCode = `MK-${Math.floor(1000 + Math.random() * 9000)}`;
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, accessCode: newCode } : u)),
    );
    toast.success(`Access code reset to ${newCode}`);
  };

  const handleStatusChange = (id: number, status: UserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    toast.success("Status updated");
    setEditUser(null);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserRecord = {
      id: Date.now(),
      name: form.name,
      mobile: form.mobile,
      address: form.address,
      status: form.status,
      accessCode:
        form.accessCode || `MK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setForm({
      name: "",
      mobile: "",
      address: "",
      status: "normal",
      accessCode: "",
    });
    setActiveTab("users");
    toast.success("User record added successfully");
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
            Restricted — Authorized Personnel Only
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
                placeholder="Search users..."
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
                    "NAME",
                    "MOBILE",
                    "ADDRESS",
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
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #1e2d42" }}>
                    <td
                      style={{
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      #{u.id}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#f2f5fa",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {u.name}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#a7b1c2",
                        fontSize: 12,
                        fontFamily: "monospace",
                      }}
                    >
                      {u.mobile}
                    </td>
                    <td
                      style={{
                        padding: "12px",
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
                    <td style={{ padding: "12px" }}>
                      {editUser?.id === u.id ? (
                        <select
                          value={editUser.status}
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
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 11,
                        fontFamily: "monospace",
                      }}
                    >
                      {u.accessCode}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#7e8aa0",
                        fontSize: 11,
                      }}
                    >
                      {u.createdAt}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setEditUser(editUser?.id === u.id ? null : u)
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Form */}
      {activeTab === "add" && (
        <div className="security-card" style={{ padding: 32, maxWidth: 560 }}>
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
            {FORM_FIELDS.map((f) => (
              <div key={f.key}>
                <label
                  htmlFor={`add-${f.key}`}
                  style={{
                    color: "#7e8aa0",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                </label>
                <input
                  id={`add-${f.key}`}
                  type={f.type}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  placeholder={f.placeholder}
                  style={inputStyle}
                  required={f.key !== "accessCode"}
                />
              </div>
            ))}
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
                  setForm((prev) => ({
                    ...prev,
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
