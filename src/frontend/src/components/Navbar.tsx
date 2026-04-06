import { Bell, LogIn, Menu, Search, Shield, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/search", label: "Search" },
    { href: "/admin", label: "Admin Panel" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <nav
      style={{
        background: "#111b2d",
        borderBottom: "1px solid #243044",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div
              style={{
                background: "linear-gradient(135deg, #c62828, #d32f2f)",
                borderRadius: 8,
                padding: "6px",
              }}
            >
              <Shield size={20} color="white" />
            </div>
            <div>
              <div
                className="font-black text-lg leading-none"
                style={{ letterSpacing: 2 }}
              >
                <span style={{ color: "#f2f5fa" }}>MASTER</span>
                <span style={{ color: "#e53935" }}>KEY</span>
              </div>
              <div style={{ color: "#7e8aa0", fontSize: 9, letterSpacing: 2 }}>
                SECURITY INTELLIGENCE PLATFORM
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  color: isActive(link.href) ? "#e53935" : "#a7b1c2",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textDecoration: "none",
                  borderBottom: isActive(link.href)
                    ? "2px solid #e53935"
                    : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              style={{
                color: "#a7b1c2",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Bell size={18} />
            </button>
            <Link to="/login">
              <Button
                size="sm"
                style={{
                  background: "linear-gradient(135deg, #c62828, #d32f2f)",
                  color: "white",
                  border: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                <LogIn size={14} className="mr-1" />
                LOGIN
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              color: "#a7b1c2",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: "#111b2d",
              borderTop: "1px solid #243044",
              padding: "12px 0",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  color: isActive(link.href) ? "#e53935" : "#a7b1c2",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "10px 16px",
                color: "#e53935",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
