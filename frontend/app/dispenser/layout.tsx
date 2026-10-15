"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  List, 
  Users, 
  BarChart2, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Bell,
  ChevronDown,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import { useRequireRole } from '@/hooks/useAuth';
import { clearSession } from '@/lib/auth';
import { MenuButton, NavBackdrop, useMobileNav } from "@/components/layout/MobileNav";

export default function DispenserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isPrescriptionsActive = pathname?.startsWith('/dispenser/prescriptions');
  const isStockActive = pathname?.startsWith('/dispenser/stock-management');

  const [prescriptionsOpen, setPrescriptionsOpen] = useState(true);
  const [stockManagementOpen, setStockManagementOpen] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const { user: currentUser, ready } = useRequireRole(["DISPENSER"]);
  const nav = useMobileNav();

  useEffect(() => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setFormattedDate(new Date().toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  const isActive = (href: string) => {
    if (href === '/dispenser') {
      return pathname === '/dispenser';
    }
    return pathname?.startsWith(href);
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
        /* Hide default headers and footers for dispenser routes */
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

      <div className={`disp-layout ${nav.open ? "shell-open" : ""}`}>
        <NavBackdrop onClick={nav.close} />
        {/* Sidebar */}
        <aside className="disp-sidebar">
          {/* Logo Area */}
          <div className="disp-sidebar-logo">
            <div className="disp-logo-icon">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="disp-logo-text">
              <span className="disp-logo-title">MediCore</span>
              <span className="disp-logo-subtitle">Pharmacy Suite</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="disp-sidebar-nav">
            <Link 
              href="/dispenser" 
              className={`disp-nav-item ${isActive('/dispenser') ? 'active' : ''}`}
            >
              <div className="disp-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </Link>
            
            {/* Prescriptions Collapsible */}
            <div style={{ marginTop: "0.25rem" }}>
              <button
                onClick={() => setPrescriptionsOpen(!prescriptionsOpen)}
                className={`disp-nav-item w-full ${isPrescriptionsActive ? 'active' : ''}`}
                style={{ background: "transparent" }}
              >
                <div className="disp-nav-item-left">
                  <FileText size={18} />
                  <span>Prescriptions</span>
                </div>
                <ChevronDown 
                  size={14} 
                  style={{ transform: prescriptionsOpen ? 'rotate(180deg)' : 'none', transition: "transform 0.2s" }} 
                />
              </button>
              
              {prescriptionsOpen && (
                <div style={{ paddingLeft: "1.25rem", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <Link 
                    href="/dispenser/prescriptions/dispensing-queue" 
                    className={`disp-nav-item ${pathname === '/dispenser/prescriptions/dispensing-queue' ? 'active' : ''}`}
                    style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
                  >
                    <span>Dispensing Queue</span>
                  </Link>
                  <Link 
                    href="/dispenser/prescriptions/dispensing-history" 
                    className={`disp-nav-item ${pathname === '/dispenser/prescriptions/dispensing-history' ? 'active' : ''}`}
                    style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
                  >
                    <span>Dispensing History</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Stock Management Collapsible */}
            <div style={{ marginTop: "0.25rem" }}>
              <button
                onClick={() => setStockManagementOpen(!stockManagementOpen)}
                className={`disp-nav-item w-full ${isStockActive ? 'active' : ''}`}
                style={{ background: "transparent" }}
              >
                <div className="disp-nav-item-left">
                  <Package size={18} />
                  <span>Stock Management</span>
                </div>
                <ChevronDown 
                  size={14} 
                  style={{ transform: stockManagementOpen ? 'rotate(180deg)' : 'none', transition: "transform 0.2s" }} 
                />
              </button>
              
              {stockManagementOpen && (
                <div style={{ paddingLeft: "1.25rem", marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <Link 
                    href="/dispenser/stock-management/add" 
                    className={`disp-nav-item ${pathname === '/dispenser/stock-management/add' ? 'active' : ''}`}
                    style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
                  >
                    <span>Add Drug Stock</span>
                  </Link>
                  <Link 
                    href="/dispenser/stock-management/table" 
                    className={`disp-nav-item ${pathname === '/dispenser/stock-management/table' ? 'active' : ''}`}
                    style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
                  >
                    <span>Stock Table</span>
                  </Link>
                  <Link 
                    href="/dispenser/stock-management/log" 
                    className={`disp-nav-item ${pathname === '/dispenser/stock-management/log' ? 'active' : ''}`}
                    style={{ fontSize: "0.8125rem", padding: "0.5rem 0.75rem" }}
                  >
                    <span>Stock Update Log</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/dispenser/drug-list" className={`disp-nav-item ${isActive('/dispenser/drug-list') ? 'active' : ''}`}>
              <div className="disp-nav-item-left">
                <List size={18} />
                <span>Drug List</span>
              </div>
            </Link>

            <Link href="/dispenser/deals" className={`disp-nav-item ${isActive('/dispenser/deals') ? 'active' : ''}`}>
              <div className="disp-nav-item-left">
                <Users size={18} />
                <span>Deals / Dealers</span>
              </div>
            </Link>

            <Link href="/dispenser/reports" className={`disp-nav-item ${isActive('/dispenser/reports') ? 'active' : ''}`}>
              <div className="disp-nav-item-left">
                <BarChart2 size={18} />
                <span>Reports</span>
              </div>
            </Link>

            <Link href="/dispenser/expiry-alerts" className={`disp-nav-item ${isActive('/dispenser/expiry-alerts') ? 'active' : ''}`}>
              <div className="disp-nav-item-left">
                <AlertTriangle size={18} />
                <span>Expiry Alerts</span>
              </div>
            </Link>

            <Link href="/dispenser/settings" className={`disp-nav-item ${isActive('/dispenser/settings') ? 'active' : ''}`}>
              <div className="disp-nav-item-left">
                <Settings size={18} />
                <span>Settings</span>
              </div>
            </Link>
          </nav>

          {/* Logout */}
          <div className="disp-sidebar-footer">
            <button onClick={handleLogout} className="disp-logout-btn">
              <LogOut size={18} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="disp-main-content">
          {/* Top Header */}
          <header className="disp-header">
            <div className="shell-header-left">
              <MenuButton open={nav.open} onClick={nav.toggle} />
              <span className="shell-header-brand">MediCore</span>
              <div className="disp-header-date">
                <CalendarIcon size={16} className="text-blue-600" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            <div className="disp-header-right">
              <Link href="/dispenser/expiry-alerts" className="disp-bell-btn" aria-label="Stock alerts">
                <Bell size={18} />
              </Link>
              
              <div className="disp-profile-badge">
                <div style={{ display: "flex", width: "2.25rem", height: "2.25rem", borderRadius: "9999px", backgroundColor: "#dbeafe", color: "#1e40af", fontWeight: 800, fontSize: "0.95rem", alignItems: "center", justifyContent: "center" }}>{(currentUser?.name || "D").charAt(0).toUpperCase()}</div>
                <div className="disp-profile-info">
                  <span className="disp-profile-name">
                    {currentUser?.name || "Dispenser Account"}
                  </span>
                  <span className="disp-profile-role">Pharmacist</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="disp-content-scroll">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
