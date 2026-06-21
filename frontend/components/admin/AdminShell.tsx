"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

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

const FAQs = [
  {
    q: "How do I add a new medical staff member?",
    a: "Navigate to Management > Users. Click on 'Add New User', input their credentials, and choose their role (e.g., ADMIN, DOCTOR, RECEPTIONIST, DISPENSER)."
  },
  {
    q: "Can I customize the clinical organization profile?",
    a: "Yes. Go to Management > Organization where you can configure the facility name, address, contact details, and upload the facility's official logo."
  },
  {
    q: "Where do I track administrator and staff actions?",
    a: "System audit logs are located in System > Audit Logs. This screen records critical activities such as user creations, security events, and organization updates."
  },
  {
    q: "How can I reset a user's login password?",
    a: "Under Management > Users, find the user, click their options menu, and select 'Reset Password'. This assigns a new temporary password."
  }
];

export default function AdminShell({ children, eyebrow, title, description, action }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const fetchNotifications = async () => {
    try {
      setNotificationsLoading(true);
      const res = await api.get("/api/v1/admin/notifications?limit=10");
      if (res.data && res.data.data) {
        setNotifications(res.data.data);
      }
      const unreadRes = await api.get("/api/v1/admin/notifications?isRead=false&limit=100");
      setUnreadCount(unreadRes.data.meta?.total || 0);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setNotificationsLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await api.patch(`/api/v1/admin/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.post("/api/v1/admin/notifications/read-all");
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSubject.trim() || !supportMessage.trim()) return;

    try {
      setSupportSubmitting(true);
      setSupportError("");
      await api.post("/api/v1/admin/support", {
        subject: supportSubject,
        message: supportMessage
      });
      setSupportSuccess(true);
      setSupportSubject("");
      setSupportMessage("");
    } catch (err: any) {
      console.error("Failed to submit support ticket:", err);
      const backendError = err.response?.data?.message || err.response?.data?.details?.[0]?.message || "Something went wrong.";
      setSupportError(backendError);
    } finally {
      setSupportSubmitting(false);
    }
  };

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
              <div style={{ position: "relative" }}>
                <button
                  aria-label="Notifications"
                  className={`admin-icon-btn ${showNotifications ? "active" : ""}`}
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ position: "relative" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                    <path d="M10 19a2 2 0 0 0 4 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div className="dropdown-overlay" onClick={() => setShowNotifications(false)} />
                    <div className="notifications-dropdown">
                      <div className="dropdown-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                          <button onClick={handleMarkAllAsRead} className="mark-all-btn">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      
                      <div className="dropdown-body">
                        {notificationsLoading && notifications.length === 0 ? (
                          <div className="dropdown-loading">
                            <div className="spinner" />
                          </div>
                        ) : notifications.length === 0 ? (
                          <div className="dropdown-empty">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M10 19a2 2 0 0 0 4 0" />
                            </svg>
                            <p>No new notifications</p>
                          </div>
                        ) : (
                          <div className="notifications-list">
                            {notifications.map((n) => (
                              <div
                                key={n.id}
                                className={`notification-item ${n.isRead ? "read" : "unread"}`}
                                onClick={() => handleMarkAsRead(n.id)}
                              >
                                <div className={`notification-icon-wrapper type-${n.type.toLowerCase()}`}>
                                  {n.type === "SECURITY" ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                  ) : n.type === "ORGANIZATION" ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M3 21h18M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M5 21V7m14 14V7M9 21v-4h6v4M8 11h2M14 11h2" />
                                    </svg>
                                  ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <circle cx="12" cy="12" r="10" />
                                      <path d="M12 16v-4M12 8h.01" />
                                    </svg>
                                  )}
                                </div>
                                <div className="notification-content">
                                  <div className="notification-title-row">
                                    <h4 className="notification-title">{n.title}</h4>
                                    {!n.isRead && <span className="unread-dot" />}
                                  </div>
                                  <p className="notification-msg">{n.message}</p>
                                  <span className="notification-time">
                                    {new Date(n.createdAt).toLocaleDateString(undefined, {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                aria-label="Support"
                className={`admin-icon-btn ${showSupportModal ? "active" : ""}`}
                onClick={() => {
                  setShowSupportModal(true);
                  setSupportSuccess(false);
                  setSupportError("");
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.9.7-1.6 1.2-1.6 2.6M12 17h.01" />
                </svg>
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

      {showSupportModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <button className="modal-close-btn" onClick={() => setShowSupportModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            
            <div className="support-modal-grid">
              {/* Left Column: FAQ & Documentation */}
              <div className="support-faq-panel">
                <h2>Knowledge Base & FAQ</h2>
                <p className="panel-desc">Quick solutions to common configuration questions.</p>
                
                <div className="faq-list">
                  {FAQs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
                        <button className="faq-question" onClick={() => setOpenFaq(isOpen ? null : index)}>
                          <span>{faq.q}</span>
                          <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div className="faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Right Column: Submit Ticket Form */}
              <div className="support-form-panel">
                {supportSuccess ? (
                  <div className="success-state">
                    <div className="success-icon-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h2>Ticket Submitted</h2>
                    <p>Your support ticket has been received. Our technical team will review the issue and respond shortly.</p>
                    <button className="admin-btn" style={{ marginTop: '20px' }} onClick={() => setSupportSuccess(false)}>
                      Submit Another Ticket
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="ticket-form">
                    <h2>Submit Support Ticket</h2>
                    <p className="panel-desc">Need assistance? File a ticket to notify system developers.</p>
                    
                    {supportError && (
                      <div className="form-error-banner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m15 9-6 6M9 9l6 6" />
                        </svg>
                        <span>{supportError}</span>
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="ticket-subject">Subject</label>
                      <input
                        id="ticket-subject"
                        type="text"
                        placeholder="Brief summary of the issue..."
                        value={supportSubject}
                        onChange={(e) => setSupportSubject(e.target.value)}
                        required
                        minLength={3}
                        maxLength={150}
                        disabled={supportSubmitting}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="ticket-message">Detailed Description</label>
                      <textarea
                        id="ticket-message"
                        rows={5}
                        placeholder="Please explain the problem, including any steps to reproduce..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        required
                        minLength={10}
                        maxLength={1000}
                        disabled={supportSubmitting}
                      />
                      <small className="char-count">
                        {supportMessage.length} / 1000 characters
                      </small>
                    </div>
                    
                    <button type="submit" className="admin-btn" disabled={supportSubmitting} style={{ width: '100%', height: '42px', marginTop: '10px' }}>
                      {supportSubmitting ? (
                        <>
                          <span className="spinner-small" style={{ marginRight: '8px' }} />
                          Submitting Ticket...
                        </>
                      ) : (
                        "Submit Ticket"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const adminStyles = `
  .header-main,.footer{display:none!important}.main-content{max-width:none!important;margin:0!important;padding:0!important;width:100%!important}.root-body{background:#f7f8fa!important;color:#111827!important;overflow-x:hidden}
  .admin-root{min-height:100dvh;background:#f7f8fa;color:#111827;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex;zoom: 1.15;}
  .admin-root input, .admin-root textarea, .admin-root select{color:#111827!important}
  .admin-sidebar{width:238px;background:#fff;border-right:1px solid #d9dde4;display:flex;flex-direction:column;position:fixed;inset:0 auto 0 0;z-index:30}
  .admin-brand{height:58px;padding:14px 24px 12px;display:flex;align-items:center;gap:11px;text-decoration:none;color:#0f172a;border-bottom:1px solid #e4e7ec}
  .admin-brand-mark{width:32px;height:32px;background:#111827;color:#fff;display:grid;place-items:center;border-radius:2px;flex:0 0 auto}.admin-brand-mark svg{width:19px;height:19px}
  .admin-brand strong{display:block;font-size:14px;line-height:1;font-weight:800;letter-spacing:.01em}.admin-brand small{display:block;margin-top:5px;color:#8b95a3;text-transform:uppercase;font-size:8px;letter-spacing:.14em;font-weight:700}
  .admin-nav{padding:20px 16px 10px;overflow-y:auto;flex:1}.admin-nav-group+.admin-nav-group{margin-top:20px}.admin-nav-title{font-size:11px;color:#334155;text-transform:uppercase;font-weight:800;letter-spacing:.12em;margin:0 0 12px 8px}
  .admin-nav-link{height:40px;border-radius:4px;padding:0 12px;display:flex;align-items:center;gap:12px;color:#4b5563;text-decoration:none;font-size:14px;font-weight:600;border:1px solid transparent}.admin-nav-link:hover{background:#f3f4f6;color:#111827}.admin-nav-link.active{background:#f0f1f3;color:#111827;font-weight:800}.admin-nav-link.danger{color:#d3222a}
  .admin-nav-link svg{width:18px;height:18px;flex:0 0 auto}.admin-sidebar-footer{border-top:1px solid #eceff3;padding:14px 16px 18px}
  .admin-main{margin-left:238px;min-width:0;flex:1}.admin-topbar{height:58px;background:#fff;border-bottom:1px solid #d9dde4;display:flex;align-items:center;justify-content:space-between;padding:0 22px;position:sticky;top:0;z-index:20}
  .admin-search {
    width: min(380px, 42vw);
    height: 32px;
    background: #f6f6f8;
    border: 1px solid #e3e5e8;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    color: #6b7280;
  }
  .admin-search svg {
    width: 15px;
    height: 15px;
  }
  .admin-search input {
    border: 0;
    background: transparent;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
  }
  .admin-search input::placeholder {
    color: #64748b;
    font-weight: 500;
  }
  .admin-search input:focus {
    box-shadow: none;
  }
  .admin-top-actions{display:flex;align-items:center;gap:14px}.admin-icon-btn{width:28px;height:28px;background:#fff;color:#111827;display:grid;place-items:center;border-radius:4px}.admin-icon-btn:hover{background:#f3f4f6}.admin-icon-btn svg{width:15px;height:15px}
  .admin-profile{display:flex;align-items:center;gap:10px;border-left:1px solid #e5e7eb;padding-left:16px}.admin-profile span{text-align:left}.admin-profile strong{display:block;font-size:11px;line-height:1.1}.admin-profile small{display:block;font-size:9px;color:#6b7280;margin-top:3px}.admin-avatar{width:31px;height:31px;border-radius:2px;background:linear-gradient(135deg,#9bd7db,#2f8e98);display:grid;place-items:center;color:#fff;font-weight:900;font-size:10px}
  .admin-content{padding:18px 22px 28px}.admin-page-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:18px}.admin-page-head h1{font-size:30px;line-height:1.05;color:#111827;margin:4px 0 3px;letter-spacing:0;font-weight:800}.admin-page-head p{font-size:12px;color:#596273}.admin-breadcrumb{font-size:10px;color:#778295;font-weight:600}
  .admin-btn{height:38px;border:1px solid #111827;background:#111827;color:#fff;border-radius:2px;padding:0 18px;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none}.admin-btn.secondary{background:#fff;color:#111827;border-color:#bfc5cf}.admin-btn.ghost{background:#fff;color:#111827;border-color:#d7dbe2}.admin-btn svg{width:14px;height:14px}
  .admin-card{background:#fff;border:1px solid #d5d9e0;border-radius:2px}.admin-card.pad{padding:20px}.admin-card-title{font-size:14px;font-weight:800;color:#111827;margin:0}.admin-card-subtitle{font-size:12px;color:#5f6877;font-weight:600;margin-top:4px}.admin-grid{display:grid;gap:8px}.admin-two-col{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:8px}.admin-three-col{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.admin-table-wrap{overflow:auto}
  .admin-table{width:100%;border-collapse:collapse;font-size:12px;min-width:720px}.admin-table th{background:#f1f2f4;color:#5b6573;text-align:left;text-transform:uppercase;letter-spacing:.08em;font-size:10px;height:46px;padding:0 22px}.admin-table td{height:58px;border-top:1px solid #dce0e6;padding:0 22px;color:#222936}.admin-status{display:inline-flex;height:22px;align-items:center;padding:0 11px;background:#eef0f3;color:#536070;font-size:9px;text-transform:uppercase;font-weight:900}.admin-status.inactive{color:#a4abb7}.admin-muted-panel{border:1px dashed #d3d7df;background:rgba(248,249,251,.82);color:#737d8d}
  @media (max-width:980px){.admin-sidebar{position:static;width:100%;height:auto;border-right:0}.admin-root{display:block}.admin-main{margin-left:0}.admin-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:none}.admin-nav-group+.admin-nav-group{margin-top:0}.admin-sidebar-footer{display:none}.admin-topbar{top:0}.admin-two-col,.admin-three-col{grid-template-columns:1fr}.admin-search{width:48vw}}
  @media (max-width:640px){.admin-brand{padding-left:14px}.admin-topbar{padding:0 12px}.admin-search{width:100%;max-width:none}.admin-profile{display:none}.admin-content{padding:14px 12px 24px}.admin-page-head{display:block}.admin-page-head>div+div{margin-top:12px}.admin-page-head h1{font-size:25px}.admin-nav{grid-template-columns:1fr}.admin-card.pad{padding:16px}}

  /* Premium interactive systems styles */
  .notification-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: #e11d48;
    color: #ffffff;
    font-size: 8px;
    font-weight: 800;
    min-width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .dropdown-overlay {
    position: fixed;
    inset: 0;
    z-index: 15;
    background: transparent;
  }

  .notifications-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 320px;
    max-height: 420px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid #d9dde4;
    border-radius: 6px;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05);
    z-index: 20;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideDown {
    from { transform: translateY(-5px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .dropdown-header {
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dropdown-header h3 {
    font-size: 13px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
  .mark-all-btn {
    font-size: 11px;
    font-weight: 700;
    color: #6366f1;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s ease;
  }
  .mark-all-btn:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
  .dropdown-body {
    flex: 1;
    overflow-y: auto;
  }
  .dropdown-loading, .dropdown-empty {
    padding: 32px 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748b;
  }
  .dropdown-empty svg {
    width: 32px;
    height: 32px;
    stroke: #94a3b8;
    margin-bottom: 8px;
  }
  .dropdown-empty p {
    font-size: 12px;
    font-weight: 600;
    margin: 0;
  }
  .notifications-list {
    display: flex;
    flex-direction: column;
  }
  .notification-item {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .notification-item:hover {
    background: #f8fafc;
  }
  .notification-item.unread {
    background: rgba(99, 102, 241, 0.03);
  }
  .notification-item.unread:hover {
    background: rgba(99, 102, 241, 0.06);
  }
  .notification-icon-wrapper {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .notification-icon-wrapper.type-system {
    background: #e0f2fe;
    color: #0284c7;
  }
  .notification-icon-wrapper.type-security {
    background: #ffedd5;
    color: #ea580c;
  }
  .notification-icon-wrapper.type-organization {
    background: #dcfce7;
    color: #16a34a;
  }
  .notification-icon-wrapper svg {
    width: 14px;
    height: 14px;
  }
  .notification-content {
    flex: 1;
    min-width: 0;
  }
  .notification-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
  }
  .notification-title {
    font-size: 12px;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .unread-dot {
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .notification-msg {
    font-size: 11px;
    font-weight: 500;
    color: #475569;
    margin: 0 0 4px 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .notification-time {
    font-size: 9px;
    font-weight: 600;
    color: #94a3b8;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    display: grid;
    place-items: center;
    z-index: 100;
    padding: 16px;
    animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-container {
    width: min(840px, 95vw);
    background: #ffffff;
    border: 1px solid #d9dde4;
    border-radius: 8px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    overflow: hidden;
    animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .modal-close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    background: transparent;
    border: 0;
    color: #64748b;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: background 0.15s ease, color 0.15s ease;
    z-index: 10;
  }
  .modal-close-btn:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
  .modal-close-btn svg {
    width: 16px;
    height: 16px;
  }

  .support-modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 480px;
  }
  @media (max-width: 768px) {
    .support-modal-grid {
      grid-template-columns: 1fr;
      max-height: 80vh;
      overflow-y: auto;
    }
  }

  .support-faq-panel {
    background: #f8fafc;
    border-right: 1px solid #e2e8f0;
    padding: 32px;
  }
  @media (max-width: 768px) {
    .support-faq-panel {
      border-right: 0;
      border-bottom: 1px solid #e2e8f0;
      padding: 20px;
    }
  }
  .support-faq-panel h2, .support-form-panel h2 {
    font-size: 18px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 6px 0;
  }
  .panel-desc {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    margin: 0 0 24px 0;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .faq-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.15s ease;
  }
  .faq-item:hover {
    border-color: #cbd5e1;
  }
  .faq-item.open {
    border-color: #6366f1;
    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.05);
  }
  .faq-question {
    width: 100%;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: transparent;
    border: 0;
    text-align: left;
    font-size: 12px;
    font-weight: 700;
    color: #334155;
    cursor: pointer;
  }
  .faq-chevron {
    width: 14px;
    height: 14px;
    color: #64748b;
    transition: transform 0.2s ease;
  }
  .faq-item.open .faq-chevron {
    transform: rotate(180deg);
    color: #6366f1;
  }
  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s cubic-bezier(0, 1, 0, 1);
  }
  .faq-item.open .faq-answer {
    max-height: 200px;
    transition: max-height 0.25s ease-in;
  }
  .faq-answer p {
    margin: 0;
    padding: 0 16px 14px 16px;
    font-size: 11px;
    font-weight: 500;
    color: #475569;
    line-height: 1.5;
  }

  .support-form-panel {
    background: #ffffff;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media (max-width: 768px) {
    .support-form-panel {
      padding: 20px;
    }
  }
  .ticket-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-group label {
    font-size: 11px;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .form-group input, .form-group textarea {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 10px 12px;
    font-size: 12px;
    font-weight: 600;
    background: #ffffff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .form-group input:focus, .form-group textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  .char-count {
    align-self: flex-end;
    font-size: 9px;
    font-weight: 600;
    color: #94a3b8;
  }
  .form-error-banner {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #b91c1c;
    font-size: 11px;
    font-weight: 600;
  }
  .form-error-banner svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .success-state {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .success-icon-badge {
    width: 48px;
    height: 48px;
    background: #dcfce7;
    color: #16a34a;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-bottom: 16px;
  }
  .success-icon-badge svg {
    width: 24px;
    height: 24px;
  }
  .success-state p {
    font-size: 12px;
    font-weight: 500;
    color: #475569;
    margin: 8px 0 0 0;
    max-width: 280px;
    line-height: 1.5;
  }
  
  .spinner-small {
    width: 14px;
    height: 14px;
    border: 2px solid #ffffff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
  }
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #cbd5e1;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
`;
