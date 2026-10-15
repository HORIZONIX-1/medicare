"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function InvoicesListPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(userString));
      setIsCheckingAuth(false);
    }
  }, [router]);


  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await api.get("/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Failed to load invoices list:", error);
      } finally {
        setLoading(false);
      }
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      fetchInvoices();
    }
  }, []);


  const filteredInvoices = invoices.filter((inv: any) => {
    const query = searchQuery.toLowerCase();
    const patientName = inv.consultation?.patient?.name?.toLowerCase() || "";
    const patientCode = inv.consultation?.patient?.patient_code?.toLowerCase() || "";
    const doctorName = inv.consultation?.doctor?.name?.toLowerCase() || "";
    return patientName.includes(query) || patientCode.includes(query) || doctorName.includes(query);
  });

  if (isCheckingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>

      <div className="dr-page-header">
        <h1 className="dr-page-title">Invoices Directory</h1>
      </div>

      {/* Central White Content Card */}
      <div className="white-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 className="white-card-title" style={{ marginBottom: "0.25rem" }}>Invoice Records</h2>
            <p className="white-card-subtitle" style={{ marginBottom: 0 }}>List of all generated patient billing statements.</p>
          </div>
                
          {/* Search Input */}
          <div style={{ display: "flex", gap: "0.5rem", width: "100%", maxWidth: "400px" }}>
            <input
              type="text"
              placeholder="Search by patient, ID, or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="light-input"
              style={{ flex: 1, height: "40px" }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-slate-400 text-xs mt-3">Loading invoices...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "2.5rem 1.5rem",
            backgroundColor: "#f8fafc",
            border: "1px dashed #cbd5e1",
            borderRadius: "0.5rem"
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem", opacity: 0.6 }}>🧾</span>
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#475569" }}>No Invoices Found</p>
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
              No invoices match the criteria or none have been generated.
            </p>
          </div>
        ) : (
          <div className="light-table-container">
            <table className="light-table">
              <thead>
                <tr>
                  <th>Invoice Code</th>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Issued Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Total Amount</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv: any) => (
                  <tr key={inv.invoice_id}>
                    <td className="light-table-code">INV{String(inv.invoice_id).padStart(5, "0")}</td>
                    <td>{inv.consultation?.patient?.patient_code || "—"}</td>
                    <td className="light-table-name">{inv.consultation?.patient?.name || "—"}</td>
                    <td>Dr. {inv.consultation?.doctor?.name || "—"}</td>
                    <td>{new Date(inv.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.is_finalized 
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                          : "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}>
                        {inv.is_finalized ? "Finalized" : "Pending"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: "bold" }}>LKR {inv.total_amount.toFixed(2)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => router.push(
                          `/doctor/invoice/${inv.prescription_id || inv.consultation_id}/preview?doctorFee=${inv.doctor_fee}&discount=${inv.discount}${inv.is_patient_denied ? '&patientDenied=1' : ''}`
                        )}
                        className="btn-light-outline"
                        style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
