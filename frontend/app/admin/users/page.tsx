import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import AdminUsersPage from "@/components/admin/AdminUsersPage";

export default function UsersPage() {
  return (
    <AdminShell
      eyebrow="Dashboard / User Management"
      title="User Management"
      description="Manage institutional access, roles, and administrative permissions."
      action={<Link href="/admin/add-user" className="admin-btn">+ Add User</Link>}
    >
      <AdminUsersPage />
    </AdminShell>
  );
}
