import Link from "next/link";

const users = [
  ["Dr. Sarah Jenkins", "s.jenkins@medcenter.org", "+1 (555) 012-3456", "Physician", "Active", "2 hours ago"],
  ["Michael Chen", "m.chen@medcenter.org", "+1 (555) 012-7890", "Administrator", "Active", "Oct 24, 2023"],
  ["Elena Rodriguez", "e.rodriguez@medcenter.org", "+1 (555) 012-4422", "Staff", "Inactive", "3 days ago"],
];

export default function AdminUsersPage() {
  return (
    <>
      <style>{usersStyles}</style>
      <div className="admin-card users-filters">
        <input placeholder="Filter by name or email..." />
        <select defaultValue="all"><option value="all">All Roles</option></select>
        <select defaultValue="all"><option value="all">Status: All</option></select>
        <button>Date Range</button>
        <button aria-label="Refresh">Refresh</button>
      </div>

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Last Login</th></tr>
          </thead>
          <tbody>
            {users.map(([name, email, phone, role, status, login]) => (
              <tr key={email}>
                <td><span className="user-avatar-mini">ID</span>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{role}</td>
                <td><span className={status === "Active" ? "admin-status" : "admin-status inactive"}>{status}</span></td>
                <td>{login}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-foot">
          <span>Showing 1-10 of 48 users</span>
          <div><button>{"<"}</button><button className="active">1</button><button>2</button><button>3</button><button>{">"}</button></div>
        </div>
      </div>

      <section className="users-lower">
        <article className="admin-card pad health-card">
          <h2 className="admin-card-title">System Health</h2>
          <strong>99.9%</strong>
          <span>Uptime Status</span>
          <div />
        </article>
        <article className="admin-card pad map-card">
          <div className="map-head"><h2 className="admin-card-title">Regional Activity Map</h2><Link href="/admin/reports">View Details</Link></div>
          <div className="map-ghost">Data Visualization Overlay</div>
        </article>
      </section>
    </>
  );
}

const usersStyles = `
  .users-filters{display:grid;grid-template-columns:minmax(220px,1fr) 140px 140px 120px 34px;gap:16px;padding:18px;margin-bottom:10px}.users-filters input,.users-filters select,.users-filters button{height:32px;border:1px solid #cfd5de;background:#fff;color:#111827;border-radius:0;font-size:11px;padding:0 14px}.users-filters input:focus,.users-filters select:focus{box-shadow:none;border-color:#111827}.user-avatar-mini{display:inline-grid;place-items:center;width:26px;height:26px;border:1px solid #cfd5de;background:#f4f5f7;margin-right:14px;color:#8b95a3}.table-foot{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-top:1px solid #dce0e6;font-size:11px;color:#5f6877}.table-foot button{width:30px;height:30px;background:#fff;border:1px solid #cfd5de;color:#111827}.table-foot button.active{background:#050505;color:#fff}.users-lower{display:grid;grid-template-columns:300px 1fr;gap:20px;margin-top:28px}.health-card{height:238px}.health-card strong{display:block;font-size:34px;margin-top:70px}.health-card span{text-transform:uppercase;font-size:11px;letter-spacing:.12em}.health-card div{height:4px;background:#111827;margin-top:62px}.map-card{height:238px}.map-head{display:flex;align-items:center;justify-content:space-between}.map-head a{font-size:10px;color:#4b5563;text-decoration:none}.map-ghost{height:152px;margin-top:28px;background:linear-gradient(rgba(255,255,255,.72),rgba(255,255,255,.72)),repeating-linear-gradient(0deg,#e9edf2 0 1px,transparent 1px 19px),repeating-linear-gradient(90deg,#e9edf2 0 1px,transparent 1px 64px);display:grid;place-items:center;color:#9199a6;text-transform:uppercase;font-weight:900;letter-spacing:.14em}
  @media (max-width:900px){.users-filters{grid-template-columns:1fr 1fr}.users-lower{grid-template-columns:1fr}}
  @media (max-width:560px){.users-filters{grid-template-columns:1fr}.table-foot{display:block;height:auto;padding:14px}.table-foot div{margin-top:10px}}
`;
