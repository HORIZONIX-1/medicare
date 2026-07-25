"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Bell,
  ChevronDown,
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("Wednesday, June 12, 2024");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(userString));
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setFormattedDate(new Date().toLocaleDateString("en-US", options));
    } catch (e) {
      // fallback
    }
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Hide default headers and footers for receptionist routes */
        .header-main,
        .footer {
          display: none !important;
        }
        .main-content {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <div className="dr-layout">
        {/* Sidebar */}
        <aside className="dr-sidebar">
          {/* Logo Area */}
          <div className="dr-sidebar-logo">
            <div className="dr-logo-icon" style={{ backgroundColor: "#10b981" }}>
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="dr-logo-text">
              <span className="dr-logo-title">MediCore</span>
              <span className="dr-logo-subtitle" style={{ borderColor: "#10b981" }}>Reception Suite</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="dr-sidebar-nav">
            <Link
              href="/receptionist/dashboard"
              className={`dr-nav-item ${isActive("/receptionist/dashboard") ? "active" : ""}`}
            >
              <div className="dr-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link
              href="/receptionist/patients"
              className={`dr-nav-item ${isActive("/receptionist/patients") ? "active" : ""}`}
            >
              <div className="dr-nav-item-left">
                <Users size={18} />
                <span>Patient Registration</span>
              </div>
            </Link>
          </nav>

          {/* Logout */}
          <div className="dr-sidebar-footer">
            <button onClick={handleLogout} className="dr-logout-btn">
              <LogOut size={18} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="dr-main-content">
          {/* Top Header */}
          <header className="dr-header">
            <div className="dr-header-date">
              <CalendarIcon size={16} className="text-emerald-600" />
              <span>{formattedDate}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <div className="dr-header-right">
              <button className="dr-bell-btn">
                <Bell size={18} />
                <span className="dr-bell-badge">2</span>
              </button>

              <div className="dr-profile-badge">
                <div style={{
                  display: "flex",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  R
                </div>
                <div className="dr-profile-info">
                  <span className="dr-profile-name">
                    {currentUser?.name || "Receptionist Account"}
                  </span>
                  <span className="dr-profile-role">Receptionist</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="dr-content-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
