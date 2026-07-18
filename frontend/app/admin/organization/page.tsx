"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import api from "@/lib/axios";

function OrganizationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  // List View states
  const [organizations, setOrganizations] = useState<any[]>([]);
  
  // Edit View states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [orgUsersCount, setOrgUsersCount] = useState(0);
  const [orgPatientsCount, setOrgPatientsCount] = useState(0);

  // Common UI states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPhone, setCreatePhone] = useState("");
  const [createWebsite, setCreateWebsite] = useState("");
  const [createAddress, setCreateAddress] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchOrganizations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/api/v1/admin/organization");
      setOrganizations(response.data.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load organizations.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleOrganization = async (id: string) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await api.get(`/api/v1/admin/organization/${id}`);
      const data = response.data.data;
      if (data) {
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setWebsite(data.website || "");
        setAddress(data.address || "");
        setDescription(data.description || "");
        setLogoUrl(data.logoUrl || "");
        setOrgUsersCount(data.usersCount || 0);
        setOrgPatientsCount(data.patientsCount || 0);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load organization details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orgId) {
      fetchSingleOrganization(orgId);
    } else {
      fetchOrganizations();
    }
  }, [orgId]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCreating(true);
    try {
      const response = await api.post("/api/v1/admin/organization", {
        name: createName,
        email: createEmail || null,
        phone: createPhone || null,
        website: createWebsite || null,
        address: createAddress || null,
        description: createDescription || null,
      });
      setSuccess(`Organization "${response.data.data.name}" created successfully!`);
      setCreateName("");
      setCreateEmail("");
      setCreatePhone("");
      setCreateWebsite("");
      setCreateAddress("");
      setCreateDescription("");
      setShowCreateModal(false);
      await fetchOrganizations();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.details) {
        const details = err.response.data.details
          .map((d: any) => `${d.field}: ${d.message}`)
          .join(", ");
        setError(`Creation Failed: ${details}`);
      } else {
        setError(err.response?.data?.message || "Failed to create organization.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgId) return;
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const response = await api.patch(`/api/v1/admin/organization/${orgId}`, {
        name,
        email: email || null,
        phone: phone || null,
        website: website || null,
        address: address || null,
        description: description || null,
      });
      setSuccess("Organization details saved successfully!");
      const data = response.data.data;
      if (data) {
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setWebsite(data.website || "");
        setAddress(data.address || "");
        setDescription(data.description || "");
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.details) {
        const details = err.response.data.details
          .map((d: any) => `${d.field}: ${d.message}`)
          .join(", ");
        setError(`Update Failed: ${details}`);
      } else {
        setError(err.response?.data?.message || "Failed to update settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !orgId) return;

    setError("");
    setSuccess("");
    setLogoLoading(true);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await api.patch(`/api/v1/admin/organization/${orgId}/logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLogoUrl(response.data.data.logoUrl);
      setSuccess("Organization logo updated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload logo. Ensure it's a JPEG, PNG, WEBP, or SVG image under 2MB.");
    } finally {
      setLogoLoading(false);
    }
  };

  const handleDelete = async (id: string, orgName: string) => {
    if (!window.confirm(`Are you sure you want to delete organization "${orgName}"? All users and patients belonging to this organization will lose access or be dissociated.`)) {
      return;
    }
    setError("");
    setSuccess("");
    setDeletingId(id);
    try {
      await api.delete(`/api/v1/admin/organization/${id}`);
      setSuccess(`Organization "${orgName}" deleted successfully.`);
      await fetchOrganizations();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete organization.");
    } finally {
      setDeletingId(null);
    }
  };

  const getFullLogoUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `http://localhost:4000${url}`;
  };

  // Dual State Rendering
  if (orgId) {
    // ── EDIT/MANAGE STATE ──
    return (
      <AdminShell
        eyebrow="Dashboard / Organization / Manage"
        title={`Manage: ${name || "Organization"}`}
        description="Edit organization profile, update logo, and check stats."
      >
        <style>{styles}</style>
        <div style={{ marginBottom: "20px" }}>
          <button 
            onClick={() => router.push("/admin/organization")}
            className="action-btn"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              padding: "8px 14px", 
              fontSize: "11px", 
              textTransform: "uppercase", 
              fontWeight: "bold", 
              border: "1px solid #cbd1da", 
              background: "#fff", 
              color: "#111827", 
              cursor: "pointer" 
            }}
          >
            ← Back to List
          </button>
        </div>

        {loading ? (
          <div className="admin-card pad" style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
              <div>Loading organization details...</div>
            </div>
          </div>
        ) : (
          <div className="org-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              
              {/* Badges for metrics */}
              <div style={{ display: "flex", gap: "12px" }}>
                <div className="admin-card pad" style={{ flex: 1, padding: "16px 20px" }}>
                  <div style={{ fontSize: "13.5px", textTransform: "uppercase", color: "#374151", fontWeight: "750", letterSpacing: "0.03em" }}>Total Users</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>{orgUsersCount}</div>
                </div>
                <div className="admin-card pad" style={{ flex: 1, padding: "16px 20px" }}>
                  <div style={{ fontSize: "13.5px", textTransform: "uppercase", color: "#374151", fontWeight: "750", letterSpacing: "0.03em" }}>Total Patients</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}>{orgPatientsCount}</div>
                </div>
              </div>

              <form className="admin-card pad org-form" onSubmit={handleEditSubmit}>
                <h2 className="admin-card-title">Profile Information</h2>
                <p className="admin-card-subtitle" style={{ marginBottom: "24px" }}>Configure details that appear on reports, prescriptions, and invoices.</p>

                {error && (
                  <div style={{ color: "#df2028", border: "1px solid #fca5a5", background: "#fff1f1", padding: "12px", marginBottom: "16px", fontSize: "12px" }}>
                    {error}
                  </div>
                )}

                {success && (
                  <div style={{ color: "#14b8a6", border: "1px solid #a7f3d0", background: "#f0fdf4", padding: "12px", marginBottom: "16px", fontSize: "12px" }}>
                    {success}
                  </div>
                )}

                <div className="form-grid">
                  <label>
                    <span>Institution Name *</span>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hope Medical Center"
                      required
                    />
                  </label>

                  <label>
                    <span>Contact Email</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@institution.org"
                    />
                  </label>

                  <label>
                    <span>Phone Number</span>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </label>

                  <label>
                    <span>Website URL</span>
                    <input 
                      type="url" 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://institution.org"
                    />
                  </label>

                  <label style={{ gridColumn: "1 / -1" }}>
                    <span>Physical Address</span>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Health Ave, Clinic Suite 10"
                    />
                  </label>

                  <label style={{ gridColumn: "1 / -1" }}>
                    <span>Short Description / Tagline</span>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Providing state of the art medical services..."
                      style={{ width: "100%", height: "80px", border: "1px solid #cbd1da", padding: "10px 14px", fontSize: "12px", resize: "none" }}
                    />
                  </label>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <button 
                    type="submit" 
                    className="admin-btn"
                    disabled={saving}
                    style={{ cursor: "pointer" }}
                  >
                    {saving ? "Saving Changes..." : "Save Settings"}
                  </button>
                </div>
              </form>
            </div>

            <aside className="admin-card pad logo-card" style={{ height: "fit-content" }}>
              <h2 className="admin-card-title">Branding Logo</h2>
              <p className="admin-card-subtitle" style={{ marginBottom: "20px" }}>Institutional logo for clinical outputs.</p>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px", border: "1px dashed #cfd5de", background: "#f9fafb", textAlign: "center" }}>
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={getFullLogoUrl(logoUrl)} 
                    alt="Organization Logo" 
                    style={{ maxWidth: "160px", maxHeight: "160px", objectFit: "contain" }}
                  />
                ) : (
                  <div style={{ width: "80px", height: "80px", border: "1px solid #cfd5de", display: "grid", placeItems: "center", color: "#8b95a3", fontSize: "24px", fontWeight: "bold" }}>
                    LOGO
                  </div>
                )}
                
                <div>
                  <label className="logo-upload-btn" style={{ 
                    display: "inline-block", 
                    padding: "8px 16px", 
                    border: "1px solid #111827", 
                    background: "#111827", 
                    color: "#fff", 
                    fontSize: "11px", 
                    fontWeight: "bold", 
                    cursor: "pointer",
                    textTransform: "uppercase"
                  }}>
                    {logoLoading ? "Uploading..." : "Upload Logo"}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      style={{ display: "none" }} 
                      disabled={logoLoading}
                    />
                  </label>
                </div>
              </div>
            </aside>
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminShell>
    );
  }

  // ── LIST STATE ──
  return (
    <AdminShell
      eyebrow="Dashboard"
      title="Organizations"
      description="Manage multi-organization profiles, active medical sites, and their metrics."
    >
      <style>{styles}</style>

      {/* Message banners */}
      {error && (
        <div style={{ color: "#df2028", border: "1px solid #fca5a5", background: "#fff1f1", padding: "12px", marginBottom: "16px", fontSize: "12px" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "#14b8a6", border: "1px solid #a7f3d0", background: "#f0fdf4", padding: "12px", marginBottom: "16px", fontSize: "12px" }}>
          {success}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button 
          onClick={() => setShowCreateModal(true)} 
          className="admin-btn"
          style={{ cursor: "pointer" }}
        >
          + Create Organization
        </button>
      </div>

      {loading ? (
        <div className="admin-card pad" style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
            <div>Loading organizations...</div>
          </div>
        </div>
      ) : (
        <div className="admin-card pad">
          <div className="admin-table-wrap">
            <table className="admin-table" style={{ minWidth: "850px" }}>
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
                      No organizations registered. Click Create Organization to register one.
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
                          <button 
                            onClick={() => router.push(`/admin/organization?orgId=${org.id}`)}
                            className="action-btn"
                            style={{
                              padding: "4px 8px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              border: "1px solid #111827",
                              background: "#111827",
                              color: "#fff",
                              cursor: "pointer"
                            }}
                          >
                            Manage
                          </button>
                          <Link 
                            href={`/admin/add-user?orgId=${org.id}`}
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
                            Users
                          </Link>
                          <button 
                            onClick={() => handleDelete(String(org.id), org.name)}
                            disabled={deletingId === String(org.id)}
                            className="action-btn"
                            style={{
                              padding: "4px 8px",
                              fontSize: "10px",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              border: "1px solid #fca5a5",
                              background: "#fff1f1",
                              color: "#df2028",
                              cursor: "pointer"
                            }}
                          >
                            {deletingId === String(org.id) ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CREATE MODAL OVERLAY ── */}
      {showCreateModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 className="admin-card-title" style={{ margin: 0 }}>Register New Organization</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6b7280" }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit} className="org-form">
              <div className="form-grid" style={{ marginBottom: "20px" }}>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>Institution Name *</span>
                  <input 
                    type="text" 
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="e.g. City General Clinic"
                    required
                  />
                </label>

                <label>
                  <span>Contact Email</span>
                  <input 
                    type="email" 
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    placeholder="contact@clinic.com"
                  />
                </label>

                <label>
                  <span>Phone Number</span>
                  <input 
                    type="text" 
                    value={createPhone}
                    onChange={(e) => setCreatePhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </label>

                <label>
                  <span>Website URL</span>
                  <input 
                    type="url" 
                    value={createWebsite}
                    onChange={(e) => setCreateWebsite(e.target.value)}
                    placeholder="https://clinic.com"
                  />
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  <span>Physical Address</span>
                  <input 
                    type="text" 
                    value={createAddress}
                    onChange={(e) => setCreateAddress(e.target.value)}
                    placeholder="456 Medical Blvd, Suite 100"
                  />
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  <span>Short Description / Tagline</span>
                  <textarea 
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                    placeholder="e.g. Specialized pediatric and internal medicine clinic."
                    style={{ width: "100%", height: "70px", border: "1px solid #cbd1da", padding: "10px 14px", fontSize: "12px", resize: "none" }}
                  />
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="action-btn"
                  style={{ 
                    padding: "8px 16px", 
                    fontSize: "11px", 
                    textTransform: "uppercase", 
                    fontWeight: "bold", 
                    border: "1px solid #cbd1da", 
                    background: "#fff", 
                    color: "#111827", 
                    cursor: "pointer" 
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn"
                  disabled={creating}
                  style={{ cursor: "pointer" }}
                >
                  {creating ? "Creating..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AdminShell>
  );
}

export default function OrganizationPage() {
  return (
    <Suspense fallback={
      <AdminShell eyebrow="Dashboard / Organization" title="Organization Settings" description="Loading...">
        <div style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
            <div>Loading...</div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </AdminShell>
    }>
      <OrganizationPageContent />
    </Suspense>
  );
}

const styles = `
  .org-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px}.org-form,.logo-card{min-height:360px}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 22px;margin-top:10px}.org-form label{display:block}.org-form span{display:block;font-size:13.5px;color:#374151;font-weight:750;margin-bottom:7px;letter-spacing:0.02em}.org-form input{width:100%;height:42px;border:1px solid #cbd1da;background:#fff;border-radius:0;color:#111827;font-size:12px;padding:0 14px}.org-form input:focus,.org-form textarea:focus{box-shadow:none;border-color:#111827}
  .admin-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .admin-modal-content {
    background: #fff;
    width: 100%;
    max-width: 600px;
    padding: 24px;
    border: 1px solid #111827;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  }
  .action-btn:hover{background:#f3f4f6!important}
  @media (max-width:900px){.org-grid{grid-template-columns:1fr}}
  @media (max-width:560px){.form-grid{grid-template-columns:1fr}.org-form{padding:16px}}
`;
