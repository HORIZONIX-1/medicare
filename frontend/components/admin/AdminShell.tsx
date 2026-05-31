"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type AdminShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const navGroups: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: (
          <>
            <rect x="4" y="4" width="6" height="6" />
            <rect x="14" y="4" width="6" height="6" />
            <rect x="4" y="14" width="6" height="6" />
            <rect x="14" y="14" width="6" height="6" />
          </>
        ),
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        icon: (
          <>
            <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        ),
      },
      {
        label: "Roles & Permissions",
        href: "/admin/roles-permissions",
        icon: (
          <>
            <path d="M12 3 4 6v5c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-3Z" />
            <path d="m9 12 2 2 4-5" />
          </>
        ),
      },
      {
        label: "Organization",
        href: "/admin/organization",
        icon: (
          <>
            <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
            <path d="M9 21v-4h3v4M8 7h1M12 7h1M8 11h1M12 11h1" />
          </>
        ),
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Audit Logs",
        href: "/admin/audit-logs",
        icon: (
          <>
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 3v6h6M12 7v5l3 2" />
          </>
        ),
      },
    ],
  },
];

export default function AdminShell({ children, eyebrow, title, description, action }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.push("/");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "ADMIN") {
        router.push("/");
        return;
      }
      setAdminName(user.name || "Administrator");
      setAdminRole(user.role || "ADMIN");

      // Generate Initials
      const names = (user.name || "Admin").split(" ");
      const init = names.map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
      setInitials(init || "AD");
    } catch (_error) {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontFamily: "sans-serif", background: "#f7f8fa", color: "#111827" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
          <div>Loading Admin Portal...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-root">
        <aside className="admin-sidebar">
          <Link href="/admin" className="admin-brand" aria-label="Medical Admin dashboard">
            <span className="admin-brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="5" y="5" width="14" height="14" rx="2" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </span>
            <span>
              <strong>Medical Admin</strong>
              <small>Institutional Portal</small>
            </span>
          </Link>

          <nav className="admin-nav" aria-label="Admin navigation">
            {navGroups.map((group, index) => (
              <div className="admin-nav-group" key={group.title || index}>
                {group.title ? <div className="admin-nav-title">{group.title}</div> : null}
                {group.items.map((item) => {
                  const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`admin-nav-link ${active ? "active" : ""}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <a href="/" onClick={handleLogout} className="admin-nav-link danger" style={{ width: "100%", display: "flex" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M10 17 15 12l-5-5M15 12H3" /><path d="M13 4h6v16h-6" /></svg>
              <span>Logout</span>
            </a>
          </div>
        </aside>

        <div className="admin-main">
          <header className="admin-topbar">
            <div className="admin-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input aria-label="Search" placeholder="Search clinical records..." />
            </div>
            <div className="admin-top-actions">
              <button aria-label="Notifications" className="admin-icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
              </button>
              <button aria-label="Support" className="admin-icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.2-1.6 2.6M12 17h.01" /></svg>
              </button>
              <div className="admin-profile">
                <span>
                  <strong>{adminName}</strong>
                  <small>{adminRole}</small>
                </span>
                <div className="admin-avatar">{initials}</div>
              </div>
            </div>
          </header>

          <main className="admin-content">
            {(title || eyebrow || action) && (
              <div className="admin-page-head">
                <div>
                  {eyebrow ? <div className="admin-breadcrumb">{eyebrow}</div> : null}
                  {title ? <h1>{title}</h1> : null}
                  {description ? <p>{description}</p> : null}
                </div>
                {action ? <div>{action}</div> : null}
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

const adminStyles = `
  .header-main,.footer{display:none!important}.main-content{max-width:none!important;margin:0!important;padding:0!important;width:100%!important}.root-body{background:#f7f8fa!important;color:#111827!important;overflow-x:hidden}
  .admin-root{min-height:100dvh;background:#f7f8fa;color:#111827;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex}
  .admin-sidebar{width:238px;background:#fff;border-right:1px solid #d9dde4;display:flex;flex-direction:column;position:fixed;inset:0 auto 0 0;z-index:30}
  .admin-brand{height:58px;padding:14px 24px 12px;display:flex;align-items:center;gap:11px;text-decoration:none;color:#0f172a;border-bottom:1px solid #e4e7ec}
  .admin-brand-mark{width:32px;height:32px;background:#111827;color:#fff;display:grid;place-items:center;border-radius:2px;flex:0 0 auto}.admin-brand-mark svg{width:19px;height:19px}
  .admin-brand strong{display:block;font-size:14px;line-height:1;font-weight:800;letter-spacing:.01em}.admin-brand small{display:block;margin-top:5px;color:#8b95a3;text-transform:uppercase;font-size:8px;letter-spacing:.14em;font-weight:700}
  .admin-nav{padding:20px 16px 10px;overflow-y:auto;flex:1}.admin-nav-group+.admin-nav-group{margin-top:20px}.admin-nav-title{font-size:9px;color:#9aa3af;text-transform:uppercase;font-weight:800;letter-spacing:.12em;margin:0 0 9px 8px}
  .admin-nav-link{height:32px;border-radius:3px;padding:0 8px;display:flex;align-items:center;gap:10px;color:#4b5563;text-decoration:none;font-size:12px;font-weight:600;border:1px solid transparent}.admin-nav-link:hover{background:#f3f4f6;color:#111827}.admin-nav-link.active{background:#f0f1f3;color:#111827;font-weight:800}.admin-nav-link.danger{color:#d3222a}
  .admin-nav-link svg{width:15px;height:15px;flex:0 0 auto}.admin-sidebar-footer{border-top:1px solid #eceff3;padding:14px 16px 18px}
  .admin-main{margin-left:238px;min-width:0;flex:1}.admin-topbar{height:58px;background:#fff;border-bottom:1px solid #d9dde4;display:flex;align-items:center;justify-content:space-between;padding:0 22px;position:sticky;top:0;z-index:20}
  .admin-search{width:min(380px,42vw);height:32px;background:#f6f6f8;border:1px solid #e3e5e8;border-radius:3px;display:flex;align-items:center;gap:10px;padding:0 12px;color:#6b7280}.admin-search svg{width:15px;height:15px}.admin-search input{border:0;background:transparent;padding:0;width:100%;height:100%;font-size:11px;color:#111827}.admin-search input:focus{box-shadow:none}
  .admin-top-actions{display:flex;align-items:center;gap:14px}.admin-icon-btn{width:28px;height:28px;background:#fff;color:#111827;display:grid;place-items:center;border-radius:4px}.admin-icon-btn:hover{background:#f3f4f6}.admin-icon-btn svg{width:15px;height:15px}
  .admin-profile{display:flex;align-items:center;gap:10px;border-left:1px solid #e5e7eb;padding-left:16px}.admin-profile span{text-align:left}.admin-profile strong{display:block;font-size:11px;line-height:1.1}.admin-profile small{display:block;font-size:9px;color:#6b7280;margin-top:3px}.admin-avatar{width:31px;height:31px;border-radius:2px;background:linear-gradient(135deg,#9bd7db,#2f8e98);display:grid;place-items:center;color:#fff;font-weight:900;font-size:10px}
  .admin-content{padding:18px 22px 28px}.admin-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:18px}.admin-page-head h1{font-size:30px;line-height:1.05;color:#111827;margin:4px 0 3px;letter-spacing:0;font-weight:800}.admin-page-head p{font-size:12px;color:#596273}.admin-breadcrumb{font-size:10px;color:#778295;font-weight:600}
  .admin-btn{height:38px;border:1px solid #111827;background:#111827;color:#fff;border-radius:2px;padding:0 18px;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}.admin-btn.secondary{background:#fff;color:#111827;border-color:#bfc5cf}.admin-btn.ghost{background:#fff;color:#111827;border-color:#d7dbe2}.admin-btn svg{width:14px;height:14px}
  .admin-card{background:#fff;border:1px solid #d5d9e0;border-radius:2px}.admin-card.pad{padding:20px}.admin-card-title{font-size:14px;font-weight:800;color:#111827;margin:0}.admin-card-subtitle{font-size:10px;color:#6b7280;margin-top:3px}.admin-grid{display:grid;gap:8px}.admin-two-col{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:8px}.admin-three-col{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.admin-table-wrap{overflow:auto}
  .admin-table{width:100%;border-collapse:collapse;font-size:12px;min-width:720px}.admin-table th{background:#f1f2f4;color:#5b6573;text-align:left;text-transform:uppercase;letter-spacing:.08em;font-size:10px;height:46px;padding:0 22px}.admin-table td{height:58px;border-top:1px solid #dce0e6;padding:0 22px;color:#222936}.admin-status{display:inline-flex;height:22px;align-items:center;padding:0 11px;background:#eef0f3;color:#536070;font-size:9px;text-transform:uppercase;font-weight:900}.admin-status.inactive{color:#a4abb7}.admin-muted-panel{border:1px dashed #d3d7df;background:rgba(248,249,251,.82);color:#737d8d}
  @media (max-width:980px){.admin-sidebar{position:static;width:100%;height:auto;border-right:0}.admin-root{display:block}.admin-main{margin-left:0}.admin-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:none}.admin-nav-group+.admin-nav-group{margin-top:0}.admin-sidebar-footer{display:none}.admin-topbar{top:0}.admin-two-col,.admin-three-col{grid-template-columns:1fr}.admin-search{width:48vw}}
  @media (max-width:640px){.admin-brand{padding-left:14px}.admin-topbar{padding:0 12px}.admin-search{width:100%;max-width:none}.admin-profile{display:none}.admin-content{padding:14px 12px 24px}.admin-page-head{display:block}.admin-page-head>div+div{margin-top:12px}.admin-page-head h1{font-size:25px}.admin-nav{grid-template-columns:1fr}.admin-card.pad{padding:16px}}
`;
