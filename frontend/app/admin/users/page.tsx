import { Suspense } from "react";
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
      <Suspense fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
            <div>Loading users...</div>
          </div>
        </div>
      }>
        <AdminUsersPage />
      </Suspense>
    </AdminShell>
  );
}
