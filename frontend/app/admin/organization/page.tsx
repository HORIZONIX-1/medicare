import AdminShell from "@/components/admin/AdminShell";

export default function OrganizationPage() {
  return (
    <AdminShell
      eyebrow="Dashboard / Organization"
      title="Organization"
      description="Institution profile, contact details, and branding settings."
    >
      <div className="admin-card pad">
        <h2 className="admin-card-title">Organization Settings</h2>
        <p className="admin-card-subtitle">This section is ready for the existing organization API integration.</p>
      </div>
    </AdminShell>
  );
}
