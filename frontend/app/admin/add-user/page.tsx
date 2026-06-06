import { Suspense } from "react";
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
      <Suspense fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "200px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "30px", height: "30px", border: "3px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }}></div>
            <div>Loading form...</div>
          </div>
        </div>
      }>
        <AdminAddUserPage />
      </Suspense>
    </AdminShell>
  );
}
