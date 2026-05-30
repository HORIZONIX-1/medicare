import AdminRolesPage from "@/components/admin/AdminRolesPage";
import AdminShell from "@/components/admin/AdminShell";

export default function RolesPermissionsPage() {
  return (
    <AdminShell eyebrow="Dashboard / Roles & Permissions">
      <AdminRolesPage />
    </AdminShell>
  );
}
