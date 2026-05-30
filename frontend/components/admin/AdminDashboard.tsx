const metrics = [
  { label: "Low Stock Drugs", value: "07", note: "Critical items" },
  { label: "Total Patients", value: "1,284", note: "+12% from last month" },
  { label: "Active Doctors", value: "42", note: "Steady" },
  { label: "Today's Appointments", value: "18", note: "5 Pending", alert: true },
];

const lowStock = [
  { name: "Paracetamol 500mg", batch: "Batch: HPC882", count: "12 units", level: "Reorder" },
  { name: "Amoxicillin Caps", batch: "Batch: MAX211", count: "45 units", level: "Reorder" },
  { name: "Metformin 850mg", batch: "Batch: MFS504", count: "102 units", level: "Low" },
];

export default function AdminDashboard() {
  return (
    <>
      <style>{dashboardStyles}</style>
      <section className="admin-grid dashboard-metrics">
        {metrics.map((metric) => (
          <article className="admin-card metric-card" key={metric.label}>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <span className={metric.alert ? "metric-note alert" : "metric-note"}>{metric.note}</span>
          </article>
        ))}
      </section>

      <section className="admin-two-col dashboard-main-grid">
        <article className="admin-card pad">
          <div className="chart-head">
            <h2 className="admin-card-title">OPD Visits Trend</h2>
            <div className="chart-tabs"><span>Week</span><span>Month</span></div>
          </div>
          <div className="line-chart" aria-label="OPD visits trend">
            <svg viewBox="0 0 620 260" preserveAspectRatio="none">
              <g className="chart-grid">
                {[80, 180, 280, 380, 480, 580].map((x) => <line key={x} x1={x} y1="20" x2={x} y2="230" />)}
                {[60, 120, 180, 230].map((y) => <line key={y} x1="20" y1={y} x2="600" y2={y} />)}
              </g>
              <polyline points="20,185 120,160 220,135 320,150 420,162 520,100 600,70" fill="none" stroke="#dedfe2" strokeWidth="7" strokeLinecap="square" />
            </svg>
            <div className="chart-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          </div>
        </article>

        <article className="admin-card pad low-stock-card">
          <h2 className="admin-card-title">Low Stock Alerts</h2>
          <div className="stock-list">
            {lowStock.map((item) => (
              <div className="stock-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.batch}</small>
                </div>
                <div>
                  <b>{item.count}</b>
                  <small>{item.level}</small>
                </div>
              </div>
            ))}
          </div>
          <button className="inventory-btn">View Inventory</button>
        </article>
      </section>

      <section className="admin-two-col dashboard-main-grid">
        <article className="admin-card pad activity-card">
          <h2 className="admin-card-title">Recent Activities</h2>
          {[
            "Patient John Doe admitted to Ward 4A",
            "Lab Report uploaded for Case #1293",
            "Drug Inventory updated for Pharmacy B",
          ].map((activity, index) => (
            <div className="activity-row" key={activity}>
              <span />
              <div>
                <strong>{activity}</strong>
                <small>{index === 0 ? "10 minutes ago - Admin: Nurse Lee" : index === 1 ? "45 minutes ago - Pathology Dept" : "1 hour ago - Inventory Mgr"}</small>
              </div>
            </div>
          ))}
        </article>

        <article className="admin-card pad distribution-card">
          <h2 className="admin-card-title">Patient Distribution</h2>
          <div className="donut">
            <span>65%</span>
            <small>Outpatient</small>
          </div>
          <div className="legend"><span /> Outpatient <i /> Inpatient</div>
        </article>
      </section>

      <section className="dashboard-bottom">
        <article className="admin-card pad">
          <span>Total Revenue (Today)</span>
          <strong>$12,450.00</strong>
          <div className="bars"><i /><i /><i /><b /></div>
        </article>
        <article className="admin-card pad">
          <span>Drug Dispensation</span>
          <strong>452 items</strong>
          <small>Top: Ibuprofen<br />82 orders</small>
        </article>
      </section>
    </>
  );
}

const dashboardStyles = `
  .dashboard-metrics{grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin:-18px -22px 18px;border-bottom:1px solid #d5d9e0}.metric-card{border-left:0;border-top:0;border-bottom:0;border-radius:0;min-height:112px;padding:26px 24px}.metric-label{text-transform:uppercase;color:#6b7280;font-size:12px;letter-spacing:.04em}.metric-value{font-size:28px;font-weight:800;margin-top:10px;color:#111827}.metric-note{display:inline-flex;background:#f4f5f6;color:#6b7280;font-size:9px;padding:2px 6px;text-transform:uppercase}.metric-note.alert{background:#fff1f1;color:#df2028}
  .dashboard-main-grid{margin-bottom:8px}.chart-head{display:flex;justify-content:space-between;align-items:flex-start}.chart-tabs{display:flex;gap:18px;text-transform:uppercase;font-size:9px;font-weight:800}.chart-tabs span:first-child{background:#f1f2f4;padding:5px 8px}.line-chart{height:260px;margin-top:10px}.line-chart svg{width:100%;height:220px}.chart-grid line{stroke:#edf0f3;stroke-width:1}.chart-days{display:grid;grid-template-columns:repeat(7,1fr);font-size:9px;text-transform:uppercase;color:#111827}
  .stock-list{margin-top:22px}.stock-row{display:flex;justify-content:space-between;border-bottom:1px solid #e7e9ed;padding:13px 0}.stock-row strong{display:block;font-size:12px}.stock-row small{display:block;color:#6b7280;font-size:9px}.stock-row b{display:block;text-align:right;color:#d82029;font-size:12px}.inventory-btn{width:100%;height:34px;margin-top:26px;background:#fff;border:1px solid #c6cbd4;text-transform:uppercase;font-weight:900;font-size:11px;color:#111827}
  .activity-card{min-height:220px}.activity-row{display:flex;gap:14px;margin-top:20px}.activity-row span{width:7px;height:7px;border-radius:50%;background:#111827;margin-top:4px}.activity-row strong{display:block;font-size:12px}.activity-row small{display:block;color:#6b7280;font-size:9px;margin-top:2px}.distribution-card{min-height:220px}.donut{width:142px;height:142px;border:16px solid #111827;border-left-color:#ededf0;border-top-color:#ededf0;margin:24px auto 20px;display:grid;place-items:center;text-align:center}.donut span{font-size:20px;font-weight:900}.donut small{text-transform:uppercase;font-size:9px;font-weight:800}.legend{text-align:center;font-size:10px}.legend span,.legend i{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 6px}.legend span{background:#111827}.legend i{background:#ededf0}
  .dashboard-bottom{display:grid;grid-template-columns:1fr 1.1fr;gap:8px}.dashboard-bottom article{position:relative;min-height:86px}.dashboard-bottom span{text-transform:uppercase;color:#5b6573;font-size:13px}.dashboard-bottom strong{display:block;font-size:18px}.dashboard-bottom small{position:absolute;right:24px;top:26px;text-align:right;color:#5b6573;font-size:10px}.bars{position:absolute;right:28px;top:33px;display:flex;gap:5px;align-items:end}.bars i,.bars b{display:block;width:20px;background:#8f939a}.bars i{height:11px}.bars i:nth-child(2){height:17px}.bars i:nth-child(3){height:14px}.bars b{height:24px;background:#111827}
  @media (max-width:980px){.dashboard-metrics{grid-template-columns:repeat(2,minmax(0,1fr));margin:0 0 14px}.metric-card{border:1px solid #d5d9e0}.dashboard-bottom{grid-template-columns:1fr}}
  @media (max-width:640px){.dashboard-metrics{grid-template-columns:1fr}.metric-card{min-height:auto}.line-chart{height:220px}.line-chart svg{height:180px}}
`;
