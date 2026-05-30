const roles = [
  ["Administrator", "Full access to all system modules and configuration settings."],
  ["Doctor", "Access to patient records, consultations, and prescriptions."],
  ["Receptionist", "Manage patient registrations and appointment scheduling."],
  ["Dispenser", "Stock management and pharmacy inventory controls."],
];

const modules = [
  ["Patient Management", "Patient Records", "Vital Statistics"],
  ["Consultation / OPD", "Consultation History", "Diagnostic Reports"],
  ["Prescription", "Prescription Creation"],
  ["Pharmacy / Stock", "Inventory Levels"],
];

const permissions = ["View", "Create", "Edit", "Delete", "Export", "Print"];

const permissionRows = modules.flatMap(([group, ...rows]) => [
  { key: `${group}-module`, group, label: group, module: true, rowIndex: -1 },
  ...rows.map((row, rowIndex) => ({
    key: `${group}-${row}`,
    group,
    label: row,
    module: false,
    rowIndex,
  })),
]);

export default function AdminRolesPage() {
  return (
    <>
      <style>{rolesStyles}</style>
      <section className="roles-layout">
        <aside className="roles-list">
          <div className="roles-head"><h2>Roles</h2><button>+ Add Role</button></div>
          {roles.map(([name, desc], index) => (
            <article className={index === 0 ? "role-card selected" : "role-card"} key={name}>
              <div className="role-icon">ID</div>
              <strong>{name}</strong>
              <p>{desc}</p>
            </article>
          ))}
          <div className="role-placeholder" />
        </aside>

        <div className="admin-card permissions-card">
          <div className="permissions-head">
            <div><h1>Permissions Matrix</h1><p>Configure access levels for the Administrator role</p></div>
            <div className="permission-legend"><span /> Granted <i /> Partial <em /> None <button>Administrator</button></div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table permissions-table">
              <thead><tr><th>Module / Feature</th>{permissions.map((permission) => <th key={permission}>{permission}</th>)}</tr></thead>
              <tbody>
                {permissionRows.map((row) => (
                  row.module ? (
                    <tr className="module-row" key={row.key}><td colSpan={7}>{row.label}</td></tr>
                  ) : (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      {permissions.map((permission, index) => {
                        const checked = row.rowIndex === 0 || index === 0 || index === 5 || (row.group !== "Consultation / OPD" && index < 4) || index === 4;
                        return <td key={permission}><span className={checked ? "check on" : "check"}>{checked ? "X" : ""}</span></td>;
                      })}
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
          <div className="permissions-actions"><button className="admin-btn ghost">Reset Changes</button><button className="admin-btn">Save Permissions</button></div>
        </div>
      </section>

      <section className="admin-three-col roles-stats">
        <article className="admin-card pad"><span>Users within this Role</span><strong>12 Active</strong></article>
        <article className="admin-card pad"><span>Compliance Rating</span><strong>98% Secure</strong></article>
        <article className="admin-card pad"><span>Last Audit</span><strong>2 hours ago</strong></article>
      </section>
    </>
  );
}

const rolesStyles = `
  .roles-layout{display:grid;grid-template-columns:196px 1fr;gap:8px}.roles-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.roles-head h2{font-size:18px;color:#111827}.roles-head button{height:30px;background:#050505;color:#fff;font-size:11px;font-weight:800;padding:0 13px}.role-card{background:#fff;border:1px solid #cfd5de;border-radius:5px;padding:16px 14px;margin-bottom:8px;min-height:86px}.role-card.selected{border:2px solid #111827}.role-icon{float:left;width:24px;height:24px;border:1px solid #cfd5de;display:grid;place-items:center;margin-right:12px}.role-card strong{font-size:12px}.role-card p{clear:both;color:#6b7280;font-size:11px;line-height:1.25;margin-top:12px}.role-placeholder{height:120px;background:#f4f5f7;border:1px solid #cfd5de;border-radius:5px}.permissions-card{padding:22px}.permissions-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}.permissions-head h1{font-size:22px;color:#111827}.permissions-head p{font-size:11px;color:#6b7280}.permission-legend{display:flex;align-items:center;gap:10px;font-size:10px}.permission-legend span,.permission-legend i,.permission-legend em{width:9px;height:9px;border-radius:50%;display:inline-block}.permission-legend span{background:#050505}.permission-legend i{background:#89909a}.permission-legend em{background:#e2e5e9}.permission-legend button{height:32px;background:#f7f8fa;border:1px solid #cfd5de;padding:0 12px;margin-left:12px}.permissions-table th:not(:first-child),.permissions-table td:not(:first-child){text-align:center}.module-row td{height:28px!important;background:#f7f8fa!important;text-transform:uppercase;font-weight:900;font-size:10px!important;letter-spacing:.08em;color:#111827!important}.check{width:16px;height:16px;border:1px solid #c9ced7;display:inline-grid;place-items:center;border-radius:2px;font-size:12px}.check.on{background:#050505;color:#fff;border-color:#050505}.permissions-actions{display:flex;justify-content:flex-end;gap:14px;margin-top:18px}.roles-stats{margin-top:16px;margin-left:204px}.roles-stats span{display:block;color:#6b7280;font-size:10px}.roles-stats strong{display:block;font-size:16px;margin-top:3px}
  @media (max-width:900px){.roles-layout{grid-template-columns:1fr}.roles-list{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.roles-head{grid-column:1/-1}.role-card{margin-bottom:0}.role-placeholder{display:none}.permissions-head{display:block}.permission-legend{margin-top:12px;flex-wrap:wrap}.roles-stats{margin-left:0}}
  @media (max-width:560px){.roles-list{grid-template-columns:1fr}.permissions-card{padding:14px}.permissions-actions{display:grid;grid-template-columns:1fr}.permissions-actions .admin-btn{width:100%}}
`;
