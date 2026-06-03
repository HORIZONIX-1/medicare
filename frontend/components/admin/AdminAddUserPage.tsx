"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";

export default function AdminAddUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DOCTOR");
  const [isActive, setIsActive] = useState(true);
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isOrgLocked, setIsOrgLocked] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const orgIdParam = searchParams.get("orgId");

  // Fetch organizations list on mount
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await api.get("/api/v1/admin/organization");
        setOrganizations(response.data.data || []);
      } catch (err) {
        console.error("Failed to load organizations:", err);
      }
    };
    fetchOrgs();
  }, []);

  // Sync url param
  useEffect(() => {
    if (orgIdParam) {
      setOrganizationId(orgIdParam);
      setIsOrgLocked(true);
    } else {
      setOrganizationId("");
      setIsOrgLocked(false);
    }
  }, [orgIdParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!name || !email || !password || !role) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/v1/admin/users", {
        name,
        email,
        password,
        role,
        isActive,
        organizationId: organizationId ? Number(organizationId) : null,
      });
      
      setSuccess("User created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.details) {
        // Validation errors
        const details = err.response.data.details
          .map((d: any) => `${d.field}: ${d.message}`)
          .join(", ");
        setError(`Validation Failed: ${details}`);
      } else {
        setError(err.response?.data?.message || "Failed to create user. Please check credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{addUserStyles}</style>
      <section className="add-user-grid">
        <form className="admin-card pad user-form" onSubmit={handleSubmit}>
          <h2 className="admin-card-title">User Information</h2>
          <p className="admin-card-subtitle" style={{ marginBottom: "20px" }}>Create credentials and details for new clinic staff.</p>

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
              <span>Full Name *</span>
              <input 
                type="text" 
                placeholder="e.g. Dr. Sarah Jenkins" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Email Address *</span>
              <input 
                type="email" 
                placeholder="sarah.jenkins@clinic.org" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Password *</span>
              <input 
                type="password" 
                placeholder="Minimum 8 chars (1 upper, 1 lower, 1 num)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Role *</span>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="DOCTOR">Doctor</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="DISPENSER">Dispenser</option>
              </select>
            </label>
            <label>
              <span>Account Status *</span>
              <select value={isActive ? "true" : "false"} onChange={(e) => setIsActive(e.target.value === "true")}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </label>
            <label>
              <span>Organization</span>
              <select 
                value={organizationId} 
                onChange={(e) => setOrganizationId(e.target.value)}
                disabled={isOrgLocked}
              >
                <option value="">Global / No Organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={String(org.id)}>
                    {org.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
            <button 
              type="submit" 
              className="admin-btn"
              disabled={loading}
              style={{ cursor: "pointer" }}
            >
              {loading ? "Creating..." : "Save User"}
            </button>
            <button 
              type="button" 
              className="admin-btn secondary"
              onClick={() => router.push("/admin/users")}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </form>

        <aside className="admin-card pad details-card">
          <h2 className="admin-card-title">Security Notice</h2>
          <p style={{ marginTop: "16px", fontSize: "11px", color: "#687284", lineHeight: "1.5" }}>
            Passwords must contain at least:
          </p>
          <ul style={{ fontSize: "11px", color: "#687284", paddingLeft: "16px", marginTop: "8px", lineHeight: "1.6" }}>
            <li>8 characters in length</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One numeric digit</li>
          </ul>
          <div className="admin-muted-panel details-note" style={{ marginTop: "24px" }}>
            Newly created users will have is_first_login enabled, requiring password changes where applicable in clinical portals.
          </div>
        </aside>
      </section>

      <div className="admin-card guideline-card">
        <strong>Guideline</strong>
        <p>All administrative users must undergo verification before accessing sensitive records.</p>
      </div>
    </>
  );
}

const addUserStyles = `
  .add-user-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px}.user-form,.details-card{min-height:390px}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 22px;margin-top:10px}.user-form label,.details-card label{display:block}.user-form span,.details-card span{display:block;font-size:11px;color:#687284;margin-bottom:7px}.user-form input,.user-form select,.details-card input,.details-card select,.details-card textarea{width:100%;height:42px;border:1px solid #cbd1da;background:#fff;border-radius:0;color:#111827;font-size:12px;padding:0 14px}.user-form input:focus,.user-form select:focus,.details-card input:focus,.details-card select:focus,.details-card textarea:focus{box-shadow:none;border-color:#111827}.details-card p{font-size:11px;color:#687284;margin:28px 0 22px}.details-card label{margin-bottom:18px}.details-card textarea{height:96px;padding-top:12px;resize:none}.details-note{font-size:11px;line-height:1.35;padding:16px 18px;margin-top:20px}.guideline-card{margin-top:18px;min-height:108px;padding:40px 20px;color:#6b7280;background:linear-gradient(rgba(255,255,255,.84),rgba(255,255,255,.84)),repeating-linear-gradient(0deg,#e8ebef 0 1px,transparent 1px 19px)}.guideline-card strong{text-transform:uppercase;color:#b5bbc5;letter-spacing:.1em}.guideline-card p{font-size:12px;color:#111827}
  @media (max-width:900px){.add-user-grid{grid-template-columns:1fr}.details-card{min-height:auto}}
  @media (max-width:560px){.form-grid{grid-template-columns:1fr}.user-form,.details-card{padding:16px}}
`;
