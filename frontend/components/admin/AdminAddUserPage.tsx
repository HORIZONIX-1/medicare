export default function AdminAddUserPage() {
  return (
    <>
      <style>{addUserStyles}</style>
      <section className="add-user-grid">
        <form className="admin-card pad user-form">
          <h2 className="admin-card-title">User Information</h2>
          <div className="form-grid">
            {[
              ["Full Name", "e.g. Dr. Sarah Jenkins", "text"],
              ["Email Address", "sarah.jenkins@clinic.org", "email"],
              ["Phone Number", "+1 (555) 000-0000", "tel"],
              ["Role", "Select Role", "select"],
              ["Username", "sjenk_01", "text"],
              ["Temporary Password", "temporary password", "password"],
              ["Status", "Active", "select"],
              ["Assign Department", "Select Department", "select"],
            ].map(([label, placeholder, type]) => (
              <label key={label}>
                <span>{label}</span>
                {type === "select" ? <select defaultValue=""><option value="">{placeholder}</option></select> : <input type={type} placeholder={placeholder} />}
              </label>
            ))}
          </div>
        </form>

        <aside className="admin-card pad details-card">
          <h2 className="admin-card-title">Additional Details</h2>
          <p>Optional fields for identity verification and record keeping.</p>
          <label><span>NIC / ID Number</span><input placeholder="000000000V" /></label>
          <label><span>Date of Birth</span><input placeholder="mm/dd/yyyy" /></label>
          <label><span>Gender</span><select defaultValue=""><option value="">Select Gender</option></select></label>
          <label><span>Address</span><textarea placeholder="Enter physical address..." /></label>
          <div className="admin-muted-panel details-note">Providing these details helps in audit reports.</div>
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
  .add-user-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:18px}.user-form,.details-card{min-height:390px}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 22px;margin-top:28px}.user-form label,.details-card label{display:block}.user-form span,.details-card span{display:block;font-size:11px;color:#687284;margin-bottom:7px}.user-form input,.user-form select,.details-card input,.details-card select,.details-card textarea{width:100%;height:42px;border:1px solid #cbd1da;background:#fff;border-radius:0;color:#111827;font-size:12px;padding:0 14px}.user-form input:focus,.user-form select:focus,.details-card input:focus,.details-card select:focus,.details-card textarea:focus{box-shadow:none;border-color:#111827}.details-card p{font-size:11px;color:#687284;margin:28px 0 22px}.details-card label{margin-bottom:18px}.details-card textarea{height:96px;padding-top:12px;resize:none}.details-note{font-size:11px;line-height:1.35;padding:16px 18px;margin-top:20px}.guideline-card{margin-top:18px;min-height:108px;padding:40px 20px;color:#6b7280;background:linear-gradient(rgba(255,255,255,.84),rgba(255,255,255,.84)),repeating-linear-gradient(0deg,#e8ebef 0 1px,transparent 1px 19px)}.guideline-card strong{text-transform:uppercase;color:#b5bbc5;letter-spacing:.1em}.guideline-card p{font-size:12px;color:#111827}
  @media (max-width:900px){.add-user-grid{grid-template-columns:1fr}.details-card{min-height:auto}}
  @media (max-width:560px){.form-grid{grid-template-columns:1fr}.user-form,.details-card{padding:16px}}
`;
