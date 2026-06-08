"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";

export default function AdminUsersPage() {
  const searchParams = useSearchParams();
  const orgIdParam = searchParams.get("orgId");
  const [users, setUsers] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(""); // "", "active", "inactive"
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Fetch organizations list on mount
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await api.get("/api/v1/admin/organization");
        setOrganizations(response.data.data || []);
      } catch (err) {
        console.error("Failed to load organizations:", err);
      }
    };
    fetchOrgs();
  }, []);

  // Sync url param
  useEffect(() => {
    setOrganizationId(orgIdParam || "");
  }, [orgIdParam]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {
        page,
        limit,
        sortBy: "created_at",
        sortOrder: "desc",
      };

      if (search.trim()) {
        params.search = search.trim();
      }
      if (role) {
        params.role = role;
      }
      if (status === "active") {
        params.isActive = true;
      } else if (status === "inactive") {
        params.isActive = false;
      }
      if (organizationId) {
        params.organizationId = organizationId;
      }

      const response = await api.get("/api/v1/admin/users", { params });
      setUsers(response.data.data || []);
      if (response.data.meta) {
        setTotalPages(response.data.meta.totalPages || 1);
        setTotal(response.data.meta.total || 0);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, role, status, organizationId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (userId: number, currentActive: boolean) => {
    setActionLoading(userId);
    try {
      await api.patch(`/api/v1/admin/users/${userId}/status`, { isActive: !currentActive });
      await fetchUsers();
    } catch (e: any) {
      console.error(e);
      alert(e.response?.data?.message || "Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    setActionLoading(userId);
    try {
      await api.delete(`/api/v1/admin/users/${userId}`);
      await fetchUsers();
    } catch (e: any) {
      console.error(e);
      alert(e.response?.data?.message || "Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganizationId(e.target.value);
    setPage(1);
  };

  return (
    <>
      <style>{usersStyles}</style>
      <div className="admin-card users-filters">
        <input 
          placeholder="Filter by name or email..." 
          value={search}
          onChange={handleSearchChange}
        />
        <select value={organizationId} onChange={handleOrganizationChange}>
          <option value="">All Organizations</option>
          {organizations.map((org) => (
            <option key={org.id} value={String(org.id)}>{org.name}</option>
          ))}
        </select>
        <select value={role} onChange={handleRoleChange}>
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="DOCTOR">Doctor</option>
          <option value="RECEPTIONIST">Receptionist</option>
          <option value="DISPENSER">Dispenser</option>
        </select>
        <select value={status} onChange={handleStatusChange}>
          <option value="">Status: All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={fetchUsers}>Refresh</button>
      </div>

      {error && (
        <div className="admin-card pad" style={{ color: "#df2028", border: "1px solid #fca5a5", background: "#fff1f1", marginBottom: "10px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="admin-card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", height: "100px" }}>
                  <div style={{ display: "inline-block", width: "20px", height: "20px", border: "2px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                  <div style={{ marginTop: "8px" }}>Loading users...</div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", height: "80px", color: "#6b7280", fontStyle: "italic" }}>
                  No users found matching the filter criteria.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const initials = (user.name || "U")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                
                return (
                  <tr key={user.id}>
                    <td>
                      <span className="user-avatar-mini">{initials}</span>
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.organizationName ? (
                        <span style={{ fontWeight: "600" }}>{user.organizationName}</span>
                      ) : (
                        <span style={{ color: "#8b95a3", fontStyle: "italic" }}>Global / System</span>
                      )}
                    </td>
                    <td>{user.role}</td>
                    <td>
                      <span className={user.isActive ? "admin-status" : "admin-status inactive"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="action-btn"
                          disabled={actionLoading !== null}
                          onClick={() => handleToggleStatus(user.id, user.isActive)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            border: "1px solid #cfd5de",
                            background: "#fff",
                            cursor: "pointer"
                          }}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button 
                          className="action-btn danger"
                          disabled={actionLoading !== null}
                          onClick={() => handleDeleteUser(user.id)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            border: "1px solid #fca5a5",
                            color: "#df2028",
                            background: "#fff1f1",
                            cursor: "pointer"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="table-foot">
          <span>
            Showing {users.length > 0 ? (page - 1) * limit + 1 : 0}-
            {Math.min(page * limit, total)} of {total} users
          </span>
          <div>
            <button 
              disabled={page <= 1 || loading}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx + 1}
                className={page === idx + 1 ? "active" : ""}
                disabled={loading}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              disabled={page >= totalPages || loading}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

const usersStyles = `
  .users-filters{display:grid;grid-template-columns:minmax(200px,1.2fr) minmax(150px,1fr) 130px 130px 100px;gap:16px;padding:18px;margin-bottom:10px}.users-filters input,.users-filters select,.users-filters button{height:32px;border:1px solid #cfd5de;background:#fff;color:#111827;border-radius:0;font-size:11px;padding:0 14px}.users-filters input:focus,.users-filters select:focus{box-shadow:none;border-color:#111827}.user-avatar-mini{display:inline-grid;place-items:center;width:26px;height:26px;border:1px solid #cfd5de;background:#f4f5f7;margin-right:14px;color:#8b95a3}.table-foot{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-top:1px solid #dce0e6;font-size:11px;color:#5f6877}.table-foot button{width:30px;height:30px;background:#fff;border:1px solid #cfd5de;color:#111827}.table-foot button.active{background:#050505;color:#fff}.table-foot button:disabled{opacity:0.5;cursor:not-allowed}
  .action-btn:hover{background:#f3f4f6!important}.action-btn.danger:hover{background:#fee2e2!important}
  @media (max-width:900px){.users-filters{grid-template-columns:1fr 1fr}}
  @media (max-width:560px){.users-filters{grid-template-columns:1fr}.table-foot{display:block;height:auto;padding:14px}.table-foot div{margin-top:10px}}
`;
