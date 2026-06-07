"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode; title?: string };

const navItems = [
  { label: "Dashboard", href: "/receptionist/dashboard", icon: "🏠", kind: "route" as const },
  { label: "Patient Search", href: "/receptionist/patients", icon: "🔎", kind: "route" as const },
  { label: "Register Patient", href: "/receptionist/patients/register", icon: "➕", kind: "route" as const },
  { label: "Recent Patients", href: "/receptionist/recent-patients", icon: "📋", kind: "route" as const },
];

export default function ReceptionistShell({ children, title }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setName(u.name || "Receptionist");
      }
    } catch (_) {}
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div>
      <style>{shellStyles}</style>
      <div className="rec-frame">
        <div className="rec-root">
          <aside className="rec-sidebar">
            <div className="rec-brand">
              <div className="rec-brand-title">Receptionist Module</div>
            </div>

            <nav className="rec-nav" aria-label="Receptionist navigation">
              {navItems.map((item) => {
                const active = item.kind === "route" && pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={`rec-nav-link ${active ? "active" : ""}`}>
                    <span className="rec-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="rec-footer">
              <a href="#" onClick={handleLogout} className="rec-nav-link">
                <span className="rec-nav-icon">⎋</span>
                <span>Logout</span>
              </a>
            </div>
          </aside>

          <div className="rec-main">
            <header className="rec-topbar">
              <div className="rec-top-left">
                <button className="rec-menu-btn" aria-hidden>
                  ☰
                </button>
                <div className="rec-top-title">{title || "Dashboard"}</div>
              </div>
              <div className="rec-top-right">
                <div className="rec-user">
                  <span>{name || "Receptionist"}</span>
                  <span className="rec-user-icon">👤</span>
                </div>
              </div>
            </header>

            <main className="rec-content">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

const shellStyles = `
.rec-frame{position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;width:100vw;min-height:100vh;background:#050608;padding:12px;box-sizing:border-box;overflow-x:hidden}
.rec-root{display:flex;min-height:calc(100vh - 24px);width:100%;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial;background:#0b0d10;border:1px solid #3a3f46;border-radius:8px;overflow:hidden;color:#e5e7eb}
.rec-sidebar{width:210px;background:#0c0f14;border-right:1px solid #353b43;display:flex;flex-direction:column}
.rec-brand{height:58px;display:flex;align-items:center;padding:0 16px;border-bottom:1px solid #353b43;background:#101318}
.rec-brand-title{font-weight:800;color:#f3f4f6;font-size:14px}
.rec-nav{padding:12px}
.rec-nav-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:4px;color:#d1d5db;text-decoration:none;margin-bottom:6px;border:1px solid transparent;font-size:13px}
.rec-nav-link:hover{background:#131722;border-color:#2f3540}
.rec-nav-link.active{background:#d9dce1;color:#111827;font-weight:800;border-color:#d9dce1}
.rec-nav-icon{width:22px;text-align:center;flex:0 0 auto}
.rec-footer{margin-top:auto;padding:12px;border-top:1px solid #353b43;background:#0b0d10}
.rec-main{flex:1;min-width:0;display:flex;flex-direction:column;background:#0b0d10}
.rec-topbar{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;border-bottom:1px solid #353b43;background:#0e1116;color:#e5e7eb}
.rec-top-left{display:flex;align-items:center;gap:12px}
.rec-menu-btn{background:transparent;border:0;font-size:18px;color:#f3f4f6;line-height:1;cursor:pointer}
.rec-top-title{font-size:15px;font-weight:800;letter-spacing:.01em}
.rec-top-right{display:flex;align-items:center}
.rec-user{display:flex;align-items:center;gap:10px;color:#e5e7eb;font-size:13px;font-weight:600}
.rec-user-icon{font-size:18px}
.rec-content{padding:18px;flex:1;min-width:0;background:linear-gradient(180deg,#0b0d10 0%,#090b0d 100%)}
.rec-content .card,.rec-content .card-modern,.rec-content .card-dark{background:#101318 !important;border:1px solid #353b43 !important;color:#e5e7eb !important}
.rec-content .card-title,.rec-content .card-number,.rec-content .text-slate-100,.rec-content .text-lg,.rec-content .font-semibold,.rec-content .font-bold,.rec-content h1,.rec-content h2,.rec-content h3,.rec-content h4{color:#f3f4f6 !important}
.rec-content .muted{color:#9aa3b2 !important}
.rec-content .btn{background:#1a1f27 !important;border:1px solid #4a5563 !important;color:#f5f7fa !important}
.rec-content .btn:hover{background:#242b36 !important}
.rec-content .btn-primary,.rec-content .btn-cyan{background:#e5e7eb !important;border-color:#e5e7eb !important;color:#111827 !important}
.rec-content .btn-ghost,.rec-content .btn-outline{background:transparent !important;border:1px solid #4a5563 !important;color:#f3f4f6 !important}
.rec-content .input,.rec-content .input-bordered{background:#101318 !important;border:1px solid #4a5563 !important;color:#f3f4f6 !important}
.rec-content .input::placeholder{color:#7d8594}
.rec-content table{color:#e5e7eb}
.rec-content th,.rec-content td{border-color:#353b43 !important}
.rec-content thead tr{background:#11151b}
.rec-content tbody tr:hover{background:#11151b}
@media (max-width:800px){.rec-frame{left:0;right:0;margin:0;padding:0;width:100%}.rec-root{min-height:100vh;border-radius:0}.rec-sidebar{display:none}.rec-top-left .rec-menu-btn{display:block}}
`;
