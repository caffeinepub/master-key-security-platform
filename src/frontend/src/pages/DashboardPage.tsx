import {
  Activity,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+127 this month",
    icon: Users,
    color: "#4caf50",
  },
  {
    label: "Active Alerts",
    value: "234",
    change: "+12 today",
    icon: AlertTriangle,
    color: "#e53935",
  },
  {
    label: "Criminal Records",
    value: "89",
    change: "3 new flags",
    icon: Shield,
    color: "#ff5252",
  },
  {
    label: "Reports Filed",
    value: "1,456",
    change: "+45 this week",
    icon: FileText,
    color: "#42a5f5",
  },
  {
    label: "Searches Today",
    value: "1,203",
    change: "Real-time",
    icon: Search,
    color: "#ab47bc",
  },
  {
    label: "Blocked Users",
    value: "18",
    change: "2 auto-blocked",
    icon: AlertTriangle,
    color: "#ff7043",
  },
];

const recentActivity = [
  {
    id: "SL-8821",
    user: "M.Officer #441",
    type: "Mobile Search",
    query: "+1-555-0124",
    ip: "192.168.1.41",
    status: "normal",
    time: "2 min ago",
  },
  {
    id: "SL-8820",
    user: "M.Officer #382",
    type: "Face Match",
    query: "Photo upload",
    ip: "10.0.0.12",
    status: "criminal",
    time: "5 min ago",
  },
  {
    id: "SL-8819",
    user: "Analyst #117",
    type: "Mobile Search",
    query: "+1-555-0198",
    ip: "172.16.0.8",
    status: "suspicious",
    time: "11 min ago",
  },
  {
    id: "SL-8818",
    user: "M.Officer #204",
    type: "Mobile Search",
    query: "+44-7700-900123",
    ip: "192.168.2.5",
    status: "normal",
    time: "18 min ago",
  },
  {
    id: "SL-8817",
    user: "Analyst #089",
    type: "Face Match",
    query: "Photo upload",
    ip: "10.0.1.33",
    status: "normal",
    time: "24 min ago",
  },
];

const TREND_DATA = [
  { month: "Jan", val: 40 },
  { month: "Feb", val: 65 },
  { month: "Mar", val: 45 },
  { month: "Apr", val: 80 },
  { month: "May", val: 55 },
  { month: "Jun", val: 90 },
  { month: "Jul", val: 70 },
  { month: "Aug", val: 95 },
  { month: "Sep", val: 60 },
  { month: "Oct", val: 85 },
  { month: "Nov", val: 75 },
  { month: "Dec", val: 100 },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "criminal")
    return (
      <span
        className="status-criminal"
        style={{
          padding: "2px 10px",
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        🚨 CRIMINAL
      </span>
    );
  if (status === "suspicious")
    return (
      <span
        className="status-suspicious"
        style={{
          padding: "2px 10px",
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        ⚠️ SUSPICIOUS
      </span>
    );
  return (
    <span
      className="status-normal"
      style={{
        padding: "2px 10px",
        borderRadius: 12,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      ✅ NORMAL
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            style={{
              color: "#f2f5fa",
              fontWeight: 900,
              fontSize: 24,
              letterSpacing: 2,
              margin: 0,
            }}
          >
            COMMAND DASHBOARD
          </h1>
          <p style={{ color: "#7e8aa0", fontSize: 13, margin: "4px 0 0" }}>
            Security Overview — Real-time Intelligence Summary
          </p>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ color: "#7e8aa0", fontSize: 12 }}
        >
          <Clock size={14} /> Last updated: just now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="security-card"
            style={{ padding: "20px 16px", textAlign: "center" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div
              style={{
                color: stat.color,
                fontSize: 22,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                color: "#a7b1c2",
                fontSize: 11,
                fontWeight: 600,
                margin: "6px 0 4px",
                letterSpacing: 0.5,
              }}
            >
              {stat.label}
            </div>
            <div style={{ color: "#7e8aa0", fontSize: 10 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Logs */}
        <div className="lg:col-span-2">
          <div className="security-card" style={{ padding: 24 }}>
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  color: "#f2f5fa",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                RECENT SEARCH ACTIVITY
              </h2>
              <Link
                to="/admin"
                style={{
                  color: "#e53935",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                VIEW ALL LOGS
              </Link>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {[
                      "ID",
                      "USER",
                      "TYPE",
                      "QUERY",
                      "IP",
                      "RESULT",
                      "TIME",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          color: "#7e8aa0",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: 1,
                          textAlign: "left",
                          padding: "8px 10px",
                          borderBottom: "1px solid #2a3648",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((row) => (
                    <tr
                      key={row.id}
                      style={{ borderBottom: "1px solid #1e2d42" }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {row.id}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#a7b1c2",
                          fontSize: 12,
                        }}
                      >
                        {row.user}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#a7b1c2",
                          fontSize: 12,
                        }}
                      >
                        {row.type}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {row.query}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#7e8aa0",
                          fontSize: 11,
                          fontFamily: "monospace",
                        }}
                      >
                        {row.ip}
                      </td>
                      <td style={{ padding: "10px" }}>
                        <StatusBadge status={row.status} />
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          color: "#7e8aa0",
                          fontSize: 11,
                        }}
                      >
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions + Alerts */}
        <div className="flex flex-col gap-4">
          <div className="security-card" style={{ padding: 24 }}>
            <h2
              style={{
                color: "#f2f5fa",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1,
                margin: "0 0 16px",
              }}
            >
              QUICK ACTIONS
            </h2>
            <div className="flex flex-col gap-2">
              <Link to="/search">
                <button
                  type="button"
                  className="btn-danger"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 12,
                    letterSpacing: 1,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Search size={14} /> NEW SEARCH
                </button>
              </Link>
              <Link to="/admin">
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 12,
                    letterSpacing: 1,
                    border: "1px solid #2a3648",
                    background: "transparent",
                    color: "#a7b1c2",
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontWeight: 600,
                  }}
                >
                  <Users size={14} /> MANAGE USERS
                </button>
              </Link>
              <Link to="/reports">
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: 12,
                    letterSpacing: 1,
                    border: "1px solid #2a3648",
                    background: "transparent",
                    color: "#a7b1c2",
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontWeight: 600,
                  }}
                >
                  <FileText size={14} /> VIEW REPORTS
                </button>
              </Link>
            </div>
          </div>

          {/* Alert panel */}
          <div
            className="security-card"
            style={{
              padding: 24,
              border: "1px solid #c62828",
              background: "#1a0e10",
            }}
          >
            <h2
              style={{
                color: "#ff5252",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 1,
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <AlertTriangle size={14} /> ACTIVE CRIMINAL ALERTS
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "Marcus T.", flag: "Warrant #4821", time: "Today" },
                {
                  name: "Unknown ID",
                  flag: "Face Match 97%",
                  time: "Yesterday",
                },
                {
                  name: "Elena V.",
                  flag: "Criminal Level 3",
                  time: "2 days ago",
                },
              ].map((alert) => (
                <div
                  key={alert.name}
                  style={{
                    background: "#2d0e12",
                    border: "1px solid #7f1010",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{ color: "#ff5252", fontSize: 13, fontWeight: 700 }}
                  >
                    {alert.name}
                  </div>
                  <div style={{ color: "#ff8a80", fontSize: 11, marginTop: 2 }}>
                    {alert.flag}
                  </div>
                  <div style={{ color: "#7e8aa0", fontSize: 10, marginTop: 2 }}>
                    {alert.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats mini chart */}
          <div className="security-card" style={{ padding: 24 }}>
            <h2
              style={{
                color: "#f2f5fa",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1,
                margin: "0 0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <TrendingUp size={14} style={{ color: "#4caf50" }} /> SEARCH TREND
            </h2>
            <div className="flex items-end gap-2" style={{ height: 60 }}>
              {TREND_DATA.map((d, i) => (
                <div
                  key={d.month}
                  style={{
                    flex: 1,
                    height: `${d.val}%`,
                    background:
                      "linear-gradient(180deg, #e53935 0%, #7f0000 100%)",
                    borderRadius: "2px 2px 0 0",
                    opacity: i === 11 ? 1 : 0.5 + i * 0.04,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span style={{ color: "#7e8aa0", fontSize: 10 }}>Jan</span>
              <span style={{ color: "#7e8aa0", fontSize: 10 }}>Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
