import Link from "next/link";
import AdminAddUserPage from "@/components/admin/AdminAddUserPage";
import AdminShell from "@/components/admin/AdminShell";

export default function AddUserPage() {
  return (
    <AdminShell
      eyebrow="Dashboard / Users / Add User"
      title="Add New User"
      description="Create a new user account and assign role and permissions."
      action={<Link href="/admin/users" className="admin-btn secondary">Back to Users</Link>}
    >
      <AdminAddUserPage />
    </AdminShell>
  );
}
