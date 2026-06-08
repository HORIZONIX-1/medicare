"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, orgRes, activitiesRes] = await Promise.all([
        api.get("/api/v1/admin/dashboard/stats"),
        api.get("/api/v1/admin/organization"),
        api.get("/api/v1/admin/dashboard/activities"),
      ]);
      setStats(statsRes.data.data);
      setOrganizations(orgRes.data.data || []);
      setActivities(activitiesRes.data.data || []);
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatActivity = (item: any) => {
    const actorName = item.actor?.name || "System";
    const actorRole = item.actor?.role || "SYSTEM";
    const timeStr = new Date(item.createdAt).toLocaleString();
    
    let desc = `${item.action} on ${item.entity}`;
    if (item.action === "USER_CREATED") {
      desc = `Created new user ${item.metadata?.email || ""} (${item.metadata?.role || ""}) for Org ID ${item.metadata?.organizationId || "Global"}`;
    } else if (item.action === "USER_UPDATED") {
      desc = `Updated user ID ${item.entityId} (fields: ${item.metadata?.changedFields?.join(", ") || ""})`;
    } else if (item.action === "USER_SOFT_DELETED") {
      desc = `Soft deleted user ${item.metadata?.email || ""}`;
    } else if (item.action === "USER_ACTIVATED") {
      desc = `Activated user ${item.metadata?.email || ""}`;
    } else if (item.action === "USER_DEACTIVATED") {
      desc = `Deactivated user ${item.metadata?.email || ""}`;
    } else if (item.action === "USER_PASSWORD_RESET") {
      desc = `Reset password for user ${item.metadata?.email || ""}`;
    } else if (item.action === "ORGANIZATION_CREATED") {
      desc = `Created new organization "${item.metadata?.name || ""}"`;
    } else if (item.action === "ORGANIZATION_UPDATED") {
      desc = `Updated organization profile ID ${item.entityId} (fields: ${item.metadata?.changedFields?.join(", ") || ""})`;
    } else if (item.action === "ORGANIZATION_LOGO_UPDATED") {
      desc = `Uploaded new logo for organization ID ${item.entityId}`;
    }
    
    return {
      desc,
      meta: `${timeStr} - Actor: ${actorName} (${actorRole})`,
      ip: item.ipAddress ? `IP: ${item.ipAddress}` : ""
    };
  };

  const getFullLogoUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `http://localhost:4000${url}`;
  };

  if (loading) {
    return (
      <div className="admin-card pad" style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
          <div>Loading dashboard...</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card pad" style={{ color: "#df2028", border: "1px solid #fca5a5", background: "#fff1f1" }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  const metrics = [
    { label: "Total Organizations", value: organizations.length, note: "Registered clinics" },
    { label: "Total Patients", value: stats?.patients?.totalPatients ?? 0, note: "Combined patient registry" },
    { label: "Active Doctors", value: stats?.users?.totalDoctors ?? 0, note: "Doctors on duty" },
    { label: "Support Staff", value: stats?.users?.totalStaff ?? 0, note: "Reception & pharmacists" },
    { label: "Active Users", value: stats?.users?.activeUsers ?? 0, note: "Enabled credentials" },
  ];

  return (
    <>
      <style>{dashboardStyles}</style>
      
      {/* ── METRICS SUMMARY ── */}
      <section className="admin-grid dashboard-metrics">
        {metrics.map((metric) => (
          <article className="admin-card metric-card" key={metric.label}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <span className="metric-note">{metric.note}</span>
          </article>
        ))}
      </section>

      {/* ── ORGANIZATIONS LIST ── */}
      <section style={{ marginBottom: "24px" }}>
        <div className="admin-card pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 className="admin-card-title">Manage Organizations</h2>
              <p className="admin-card-subtitle">Select an organization to manage profiles, add accounts, and check statistics.</p>
            </div>
            <Link href="/admin/organization" className="admin-btn" style={{ fontSize: "11px", height: "32px", padding: "0 14px" }}>
              + Add Organization
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table" style={{ minWidth: "800px" }}>
              <thead>
                <tr>
                  <th>Organization Name</th>
                  <th>Contact Details</th>
                  <th>Website</th>
                  <th>Users</th>
                  <th>Patients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", color: "#6b7280", fontStyle: "italic", height: "80px" }}>
                      No organizations registered. Click Add Organization to create one.
                    </td>
                  </tr>
                ) : (
                  organizations.map((org) => (
                    <tr key={org.id}>
                      <td style={{ fontWeight: "700" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {org.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={getFullLogoUrl(org.logoUrl)} 
                              alt="" 
                              style={{ width: "32px", height: "32px", objectFit: "contain", border: "1px solid #e5e7eb", padding: "2px" }}
                            />
                          ) : (
                            <div style={{ width: "32px", height: "32px", background: "#f3f4f6", border: "1px solid #cfd5de", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: "900", color: "#8b95a3" }}>
                              {org.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            {org.name}
                            {org.description && <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: "normal", marginTop: "2px" }}>{org.description.slice(0, 50)}...</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: "11px" }}>
                          <div>{org.email || "No email"}</div>
                          <div style={{ color: "#6b7280", marginTop: "2px" }}>{org.phone || "No phone"}</div>
                        </div>
                      </td>
                      <td>
                        {org.website ? (
                          <a href={org.website} target="_blank" rel="noopener noreferrer" style={{ color: "#0ea5e9", textDecoration: "none" }}>
                            {org.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        ) : (
                          <span style={{ color: "#cbd5e1" }}>-</span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontWeight: "bold" }}>{org.usersCount}</span> users
                      </td>
                      <td>
                        <span style={{ fontWeight: "bold" }}>{org.patientsCount}</span> patients
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Link 
                            href={`/admin/add-user?orgId=${org.id}`}
                            className="action-btn"
                            style={{
                              padding: "4px 8px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              border: "1px solid #111827",
                              background: "#111827",
                              color: "#fff",
                              textDecoration: "none"
                            }}
                          >
                            + Add User
                          </Link>
                          <Link 
                            href={`/admin/users?orgId=${org.id}`}
                            className="action-btn"
                            style={{
                              padding: "4px 8px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              border: "1px solid #cfd5de",
                              background: "#fff",
                              color: "#111827",
                              textDecoration: "none"
                            }}
                          >
                            View Users
                          </Link>
                          <Link 
                            href={`/admin/organization?orgId=${org.id}`}
                            className="action-btn"
                            style={{
                              padding: "4px 8px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              border: "1px solid #cfd5de",
                              background: "#fff",
                              color: "#111827",
                              textDecoration: "none"
                            }}
                          >
                            Profile
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SYSTEM ACTIVITIES ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        <article className="admin-card pad activity-card" style={{ minHeight: "auto" }}>
          <h2 className="admin-card-title">Recent System Activities</h2>
          <p className="admin-card-subtitle" style={{ marginBottom: "15px" }}>Live audit logs of recent administrative and user actions.</p>
          <div className="stock-list" style={{ marginTop: "10px" }}>
            {activities.length === 0 ? (
              <div style={{ color: "#6b7280", fontStyle: "italic", padding: "20px 0", textAlign: "center" }}>No recent activities found in system audit logs.</div>
            ) : (
              activities.slice(0, 10).map((activity) => {
                const formatted = formatActivity(activity);
                return (
                  <div className="stock-row" key={activity.id} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px 0" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#111827", marginTop: "5px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: "12px", display: "block" }}>{formatted.desc}</strong>
                      <small style={{ color: "#6b7280", fontSize: "10px", marginTop: "2px", display: "block" }}>
                        {formatted.meta} {formatted.ip && `| ${formatted.ip}`}
                      </small>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </article>
      </section>
    </>
  );
}

const dashboardStyles = `
  .dashboard-metrics{grid-template-columns:repeat(5,minmax(0,1fr));gap:0;margin:-18px -22px 18px;border-bottom:1px solid #d5d9e0}.metric-card{border-left:0;border-top:0;border-bottom:0;border-radius:0;min-height:112px;padding:26px 24px}.metric-label{text-transform:uppercase;color:#6b7280;font-size:12px;letter-spacing:.04em}.metric-value{font-size:28px;font-weight:800;margin-top:10px;color:#111827}.metric-note{display:inline-flex;background:#f4f5f6;color:#6b7280;font-size:9px;padding:2px 6px;text-transform:uppercase}
  .activity-card{min-height:220px}.stock-list{margin-top:22px}.stock-row{display:flex;justify-content:space-between;border-bottom:1px solid #e7e9ed;padding:13px 0}.action-btn:hover{background:#f3f4f6!important}
  @media (max-width:980px){.dashboard-metrics{grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 14px}.metric-card{border:1px solid #d5d9e0}}
  @media (max-width:640px){.dashboard-metrics{grid-template-columns:1fr}.metric-card{min-height:auto}}
`;
