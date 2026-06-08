"use client";

import { useEffect, useState, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";
import api from "@/lib/axios";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {
        page,
        limit,
        sortOrder: "desc",
      };

      if (search.trim()) params.search = search.trim();
      if (actionFilter) params.action = actionFilter;
      if (dateFrom) params.dateFrom = new Date(dateFrom).toISOString();
      if (dateTo) params.dateTo = new Date(dateTo).toISOString();

      const response = await api.get("/api/v1/admin/audit-logs", { params });
      setLogs(response.data.data || []);
      if (response.data.meta) {
        setTotalPages(response.data.meta.totalPages || 1);
        setTotal(response.data.meta.total || 0);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, actionFilter, dateFrom, dateTo]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActionFilter(e.target.value);
    setPage(1);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
    setPage(1);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
    setPage(1);
  };

  const formatMetadata = (metadata: any) => {
    if (!metadata) return "-";
    try {
      if (typeof metadata === "string") {
        return metadata;
      }
      return JSON.stringify(metadata);
    } catch (_e) {
      return "-";
    }
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, " ");
  };

  return (
    <AdminShell
      eyebrow="Dashboard / Audit Logs"
      title="System Audit Logs"
      description="View immutable history of user management and clinic setting changes."
    >
      <style>{styles}</style>
      
      <div className="admin-card logs-filters">
        <input 
          placeholder="Search by action, actor..." 
          value={search}
          onChange={handleSearchChange}
        />
        <select value={actionFilter} onChange={handleActionChange}>
          <option value="">All Actions</option>
          <option value="USER_CREATED">User Created</option>
          <option value="USER_UPDATED">User Updated</option>
          <option value="USER_SOFT_DELETED">User Deleted</option>
          <option value="USER_ACTIVATED">User Activated</option>
          <option value="USER_DEACTIVATED">User Deactivated</option>
          <option value="USER_PASSWORD_RESET">Password Reset</option>
          <option value="ORGANIZATION_UPDATED">Organization Updated</option>
          <option value="ORGANIZATION_LOGO_UPDATED">Logo Updated</option>
        </select>
        <div className="date-inputs">
          <label>
            <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#6b7280", display: "block", marginBottom: "2px" }}>From</span>
            <input type="date" value={dateFrom} onChange={handleDateFromChange} />
          </label>
          <label>
            <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#6b7280", display: "block", marginBottom: "2px" }}>To</span>
            <input type="date" value={dateTo} onChange={handleDateToChange} />
          </label>
        </div>
        <button onClick={fetchLogs} style={{ alignSelf: "end", height: "32px" }}>Refresh</button>
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
              <th style={{ width: "160px" }}>Timestamp</th>
              <th style={{ width: "180px" }}>Actor</th>
              <th style={{ width: "150px" }}>Action</th>
              <th style={{ width: "120px" }}>Entity</th>
              <th>Details</th>
              <th style={{ width: "120px" }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", height: "120px" }}>
                  <div style={{ display: "inline-block", width: "20px", height: "20px", border: "2px solid #e5e7eb", borderTopColor: "#111827", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                  <div style={{ marginTop: "8px" }}>Loading logs...</div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", height: "80px", color: "#6b7280", fontStyle: "italic" }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                const dateStr = new Date(log.createdAt).toLocaleString();
                const actorName = log.actor?.name || "System";
                const actorRole = log.actor?.role || "SYSTEM";
                
                return (
                  <tr key={log.id}>
                    <td>{dateStr}</td>
                    <td>
                      <div>
                        <strong>{actorName}</strong>
                        <div style={{ fontSize: "10px", color: "#6b7280" }}>{actorRole}</div>
                      </div>
                    </td>
                    <td style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                      {formatAction(log.action)}
                    </td>
                    <td>
                      <div>
                        <strong>{log.entity}</strong>
                        {log.entityId && <div style={{ fontSize: "10px", color: "#6b7280" }}>ID: {log.entityId}</div>}
                      </div>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: "10px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                      {formatMetadata(log.metadata)}
                    </td>
                    <td>{log.ipAddress || "-"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <div className="table-foot">
          <span>
            Showing {logs.length > 0 ? (page - 1) * limit + 1 : 0}-
            {Math.min(page * limit, total)} of {total} logs
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
    </AdminShell>
  );
}

const styles = `
  .logs-filters{display:grid;grid-template-columns:1fr 160px 240px 100px;gap:16px;padding:18px;margin-bottom:10px}.logs-filters input,.logs-filters select,.logs-filters button{height:32px;border:1px solid #cfd5de;background:#fff;color:#111827;border-radius:0;font-size:11px;padding:0 14px}.logs-filters input:focus,.logs-filters select:focus{box-shadow:none;border-color:#111827}.date-inputs{display:grid;grid-template-columns:1fr 1fr;gap:8px}.date-inputs label{display:block}.date-inputs input{width:100%;height:22px;padding:0 6px!important}.table-foot{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-top:1px solid #dce0e6;font-size:11px;color:#5f6877}.table-foot button{width:30px;height:30px;background:#fff;border:1px solid #cfd5de;color:#111827}.table-foot button.active{background:#050505;color:#fff}.table-foot button:disabled{opacity:0.5;cursor:not-allowed}
  @media (max-width:980px){.logs-filters{grid-template-columns:1fr 1fr}.date-inputs{grid-column:span 2}}
  @media (max-width:560px){.logs-filters{grid-template-columns:1fr}.date-inputs{grid-column:span 1}.table-foot{display:block;height:auto;padding:14px}.table-foot div{margin-top:10px}}
`;
