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
import { useRequireRole } from "@/hooks/useAuth";
import { clearSession } from "@/lib/auth";
import { MenuButton, NavBackdrop, useMobileNav } from "@/components/layout/MobileNav";

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");
  const { user: currentUser, ready } = useRequireRole(["RECEPTIONIST"]);
  const nav = useMobileNav();

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
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent" />
        <p className="text-slate-500 text-sm mt-4">Verifying session...</p>
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

      <div className={`dr-layout ${nav.open ? "shell-open" : ""}`}>
        <NavBackdrop onClick={nav.close} />
        {/* Sidebar */}
        <aside className="dr-sidebar">
          {/* Logo Area */}
          <div className="dr-sidebar-logo">
            <div className="dr-logo-icon" style={{ backgroundColor: "#2563eb" }}>
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="dr-logo-text">
              <span className="dr-logo-title">MediCore</span>
              <span className="dr-logo-subtitle" style={{ borderColor: "#2563eb" }}>Reception Suite</span>
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
            <div className="shell-header-left">
              <MenuButton open={nav.open} onClick={nav.toggle} />
              <span className="shell-header-brand">MediCore</span>
              <div className="dr-header-date">
                <CalendarIcon size={16} className="text-blue-600" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <div className="dr-header-right">
              <button className="dr-bell-btn" aria-label="Notifications">
                <Bell size={18} />
              </button>

              <div className="dr-profile-badge">
                <div style={{
                  display: "flex",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "9999px",
                  backgroundColor: "#dbeafe",
                  color: "#1e40af",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {(currentUser?.name || "R").charAt(0).toUpperCase()}
                </div>
                <div className="dr-profile-info">
                  <span className="dr-profile-name">
                    {currentUser?.name || "Receptionist Account"}
                  </span>
                  <span className="dr-profile-role">Receptionist</span>
                </div>
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
