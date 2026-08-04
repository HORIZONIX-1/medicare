"use client";

import { useState } from "react";

const rolesData = [
  {
    role: "ADMIN",
    name: "Administrator",
    desc: "Full access to all administrative modules, user credentials management, audit logs, and organization settings.",
    permissions: ["Full system control", "Manage all users", "View system audits", "Edit organization details"]
  },
  {
    role: "DOCTOR",
    name: "Doctor",
    desc: "Access to patient medical profiles, OPD vital signs, diagnostic notes, examination outcomes, and digital prescriptions.",
    permissions: ["View patients", "Record consultations", "Create prescriptions", "Record examinations"]
  },
  {
    role: "RECEPTIONIST",
    name: "Receptionist",
    desc: "Manage front-office patient registrations, queue check-ins, medical scheduling, and initial intake documentation.",
    permissions: ["Register patients", "Manage check-in queue", "Manage appointments", "Print queue tickets"]
  },
  {
    role: "DISPENSER",
    name: "Pharmacist / Dispenser",
    desc: "Access to pharmacy inventory levels, drug dispensation status, stock batch entry, invoice finalizing, and billing records.",
    permissions: ["Dispense prescriptions", "Manage pharmacy stock", "Generate invoice billing", "Stock batch reordering"]
  }
];

export default function AdminRolesPage() {
  const [selectedRole, setSelectedRole] = useState(rolesData[0]);

  return (
    <>
      <style>{rolesStyles}</style>
      <section className="roles-layout">
        <aside className="roles-list">
          <div className="roles-head">
            <h2>System Roles</h2>
          </div>
          {rolesData.map((roleObj) => (
            <article 
              className={selectedRole.role === roleObj.role ? "role-card selected" : "role-card"} 
              key={roleObj.role}
              onClick={() => setSelectedRole(roleObj)}
              style={{ cursor: "pointer" }}
            >
              <div className="role-icon">{roleObj.role.slice(0, 2)}</div>
              <strong>{roleObj.name}</strong>
              <p style={{ marginTop: "4px", fontSize: "10px" }}>{roleObj.role}</p>
            </article>
          ))}
        </aside>

        <div className="admin-card permissions-card">
          <div className="permissions-head">
            <div>
              <h1>Access Control & Authorization</h1>
              <p>Predefined permissions for the <strong>{selectedRole.name}</strong> role</p>
            </div>
            <div className="permission-indicator">
              Predefined Role
            </div>
          </div>
          
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#111827", marginBottom: "8px" }}>Role Description</h3>
            <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", marginBottom: "20px" }}>
              {selectedRole.desc}
            </p>

            <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#111827", marginBottom: "12px" }}>Assigned Permissions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {selectedRole.permissions.map((perm) => (
                <div key={perm} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "1px solid #e5e7eb", background: "#f9fafb" }}>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>✔</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#1f2937" }}>{perm}</span>
                </div>
              ))}
            </div>

            <div className="admin-muted-panel" style={{ marginTop: "32px", padding: "16px", fontSize: "11px", lineHeight: "1.5" }}>
              <strong>Notice:</strong> Authorization rules are statically defined in the backend codebase (using role-based route middleware: `requireRoles`). Dynamic permission modification is not supported on this deployment to ensure strict database schema integrity.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const rolesStyles = `
  .roles-layout{display:grid;grid-template-columns:220px 1fr;gap:18px}.roles-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}.roles-head h2{font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;font-weight:800}.role-card{background:#fff;border:1px solid #cfd5de;border-radius:2px;padding:16px 14px;margin-bottom:8px;min-height:76px;transition:all 0.15s ease}.role-card:hover{border-color:#111827;background:#f9fafb}.role-card.selected{border:2px solid #111827;background:#fff}.role-icon{float:left;width:28px;height:28px;border:1px solid #111827;background:#111827;color:#fff;font-weight:900;display:grid;place-items:center;margin-right:12px;font-size:10px}.role-card strong{font-size:13px;display:block;color:#111827}.permissions-card{padding:22px}.permissions-head{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid #e5e7eb;padding-bottom:16px}.permissions-head h1{font-size:22px;font-weight:800;color:#111827}.permissions-head p{font-size:11px;color:#6b7280;margin-top:4px}.permission-indicator{height:28px;background:#f3f4f6;border:1px solid #cfd5de;padding:0 12px;font-size:10px;text-transform:uppercase;font-weight:800;display:grid;place-items:center;color:#4b5563}
  @media (max-width:900px){.roles-layout{grid-template-columns:1fr}.roles-list{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.roles-head{grid-column:1/-1}.role-card{margin-bottom:0}}
  @media (max-width:560px){.roles-list{grid-template-columns:1fr}.permissions-card{padding:14px}}
`;
