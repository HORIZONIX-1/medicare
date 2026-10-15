"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Calendar as CalendarIcon,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Receipt,
  Settings as SettingsIcon,
  Stethoscope,
  Users,
} from "lucide-react";
import { useRequireRole } from "@/hooks/useAuth";
import { MenuButton, NavBackdrop, useMobileNav } from "@/components/layout/MobileNav";
import { clearSession } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctor/patients", label: "Patients", icon: Users },
  { href: "/doctor/opd", label: "OPD / Consultation", icon: Stethoscope },
  { href: "/doctor/prescription", label: "Prescriptions", icon: FileText },
  { href: "/doctor/invoice", label: "Invoices", icon: Receipt },
  { href: "/doctor/calendar", label: "Calendar", icon: CalendarIcon },
  { href: "/doctor/settings", label: "Settings", icon: SettingsIcon },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useRequireRole(["DOCTOR"]);
  const [formattedDate, setFormattedDate] = useState("");
  const nav = useMobileNav();

  useEffect(() => {
    // The date depends on the viewer's clock, so it is only formatted on the client
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

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

  const displayName = user?.name ? `Dr. ${user.name.replace(/^Dr\.?\s*/i, "")}` : "Doctor";

  return (
    <>
      <style>{`
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
        <aside className="dr-sidebar" id="app-sidebar">
          <div className="dr-sidebar-logo">
            <div className="dr-logo-icon">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="dr-logo-text">
              <span className="dr-logo-title">MediCore</span>
              <span className="dr-logo-subtitle">Clinic Suite</span>
            </div>
          </div>

          <nav className="dr-sidebar-nav">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} className={`dr-nav-item ${active ? "active" : ""}`}>
                  <div className="dr-nav-item-left">
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="dr-sidebar-footer">
            <button onClick={handleLogout} className="dr-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="dr-main-content">
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
              <Link href="/doctor/calendar" className="dr-bell-btn" aria-label="Today's schedule">
                <Bell size={18} />
              </Link>

              <div className="dr-profile-badge">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold text-blue-800">
                  {displayName.replace(/^Dr\.\s*/, "").charAt(0).toUpperCase()}
                </div>
                <div className="dr-profile-info">
                  <span className="dr-profile-name">{displayName}</span>
                  <span className="dr-profile-role">Doctor</span>
                </div>
              </div>
            </div>
          </header>

          <main className="dr-content-scroll">{children}</main>
        </div>
      </div>
    </>
  );
}
