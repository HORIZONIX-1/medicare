"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, AlertTriangle, FileText, Clock, Check, X } from 'lucide-react';

interface DrugItem {
  name: string;
  strength: string;
  type: string;
  qty: number;
}

interface PrescriptionQueueItem {
  id: number;
  name: string;
  pid: string;
  date: string;
  age: string;
  gender: string;
  diagnosis: string;
  doctor: string;
  drugs: DrugItem[];
  alerts: string[];
  notes?: string;
}

const MOCK_QUEUES: PrescriptionQueueItem[] = [
  {
    id: 1,
    name: 'Kamal Perera',
    pid: 'P000123',
    date: '2026-06-07',
    age: '32 Years',
    gender: 'Male',
    diagnosis: 'Viral Fever',
    doctor: 'Dr. Kamal Perera',
    drugs: [
      { name: 'Paracetamol', strength: '500mg', type: 'Tablet', qty: 10 },
      { name: 'Cetrizine', strength: '10mg', type: 'Tablet', qty: 20 },
      { name: 'Cough Syrup', strength: '100ml', type: 'Syrup', qty: 1 },
    ],
    alerts: [
      'Paracetamol 500mg is low in stock. Only 5 tablets available.',
      'Cough Syrup 100ml is out of stock.'
    ]
  },
  {
    id: 2,
    name: 'Nimal Silva',
    pid: 'P000124',
    date: '2026-06-07',
    age: '41 Years',
    gender: 'Male',
    diagnosis: 'Chronic Gastritis',
    doctor: 'Dr. S. Alwis',
    drugs: [
      { name: 'Omeprazole', strength: '20mg', type: 'Capsule', qty: 14 },
      { name: 'Gaviscon Liquid', strength: '150ml', type: 'Liquid', qty: 2 }
    ],
    alerts: []
  },
  {
    id: 3,
    name: 'Dilini Fernando',
    pid: 'P000125',
    date: '2026-06-06',
    age: '29 Years',
    gender: 'Female',
    diagnosis: 'Allergic Asthma',
    doctor: 'Dr. R. Perera',
    drugs: [
      { name: 'Salbutamol Inhaler', strength: '100mcg', type: 'Inhaler', qty: 1 },
      { name: 'Prednisolone', strength: '5mg', type: 'Tablet', qty: 10 }
    ],
    alerts: [
      'Prednisolone 5mg is low in stock. Only 8 tablets available.'
    ]
  },
  {
    id: 4,
    name: 'Saman Wijesinghe',
    pid: 'P000126',
    date: '2026-06-06',
    age: '55 Years',
    gender: 'Male',
    diagnosis: 'Hypertension',
    doctor: 'Dr. S. Alwis',
    drugs: [
      { name: 'Amlodipine', strength: '5mg', type: 'Tablet', qty: 30 },
      { name: 'Losartan', strength: '50mg', type: 'Tablet', qty: 30 }
    ],
    alerts: []
  },
  {
    id: 5,
    name: 'Chathuri Desilva',
    pid: 'P000127',
    date: '2026-06-05',
    age: '34 Years',
    gender: 'Female',
    diagnosis: 'Acute Tonsillitis',
    doctor: 'Dr. Kamal Perera',
    drugs: [
      { name: 'Amoxicillin', strength: '250mg', type: 'Capsule', qty: 21 },
      { name: 'Paracetamol', strength: '500mg', type: 'Tablet', qty: 15 }
    ],
    alerts: [
      'Paracetamol 500mg is low in stock. Only 5 tablets available.'
    ]
  },
  {
    id: 6,
    name: 'Ramesh Bandara',
    pid: 'P000128',
    date: '2026-06-05',
    age: '48 Years',
    gender: 'Male',
    diagnosis: 'Diabetes Mellitus',
    doctor: 'Dr. R. Perera',
    drugs: [
      { name: 'Metformin', strength: '500mg', type: 'Tablet', qty: 60 },
      { name: 'Atorvastatin', strength: '10mg', type: 'Tablet', qty: 30 }
    ],
    alerts: []
  }
];

export default function DispensingQueue() {
  const [queues] = useState<PrescriptionQueueItem[]>(MOCK_QUEUES);
  const [selectedItem, setSelectedItem] = useState<PrescriptionQueueItem | null>(MOCK_QUEUES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDispense = (type: 'full' | 'partial' | 'cancel') => {
    if (!selectedItem) return;
    if (type === 'full') {
      showToast(`✅ Prescription dispensed successfully for ${selectedItem.name}!`);
    } else if (type === 'partial') {
      showToast(`⚠️ Prescription marked as partially dispensed for ${selectedItem.name}.`);
    } else {
      showToast(`❌ Dispensation cancelled for ${selectedItem.name}.`);
    }
  };

  const filteredQueues = useMemo(() => {
    return queues.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [queues, searchQuery]);

  // Keep selected item updated if search results change
  React.useEffect(() => {
    if (filteredQueues.length > 0) {
      if (!selectedItem || !filteredQueues.some(item => item.id === selectedItem.id)) {
        setSelectedItem(filteredQueues[0]);
      }
    } else {
      setSelectedItem(null);
    }
  }, [filteredQueues, selectedItem]);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontSize: "0.875rem",
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#10b981" }}></div>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", marginLeft: "0.5rem" }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="dr-page-title" style={{ fontSize: "1.75rem" }}>Prescription Dispensing</h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>View pending prescriptions and dispense medicines to patients.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))", gap: "2rem" }}>
        {/* Left Column: Queue List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="white-card" style={{ padding: "2rem", marginBottom: 0, height: "550px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1rem" }}>PRESCRIPTION QUEUE</h3>
            
            {/* Search & Filter */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexShrink: 0 }}>
              <div style={{ position: "relative", flex: 1, display: "flex", border: "1px solid #cbd5e1", borderRadius: "0.5rem", padding: "0 0.75rem", alignItems: "center", backgroundColor: "#ffffff" }}>
                <Search size={16} className="text-gray-400" style={{ marginRight: "0.5rem" }} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Patient Name / ID" 
                  style={{ border: "none", width: "100%", height: "38px", fontSize: "0.8125rem", outline: "none", color: "#0f172a" }}
                />
              </div>
              <button className="btn-light-blue" style={{ height: "40px", padding: "0 1.25rem" }}>
                SEARCH
              </button>
              <button className="btn-light-outline" style={{ height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <Filter size={16} />
              </button>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "0.5rem" }}>
              <table className="light-table" style={{ border: "none", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "40px" }}>#</th>
                    <th>PATIENT NAME</th>
                    <th>PRESCRIPTION ID</th>
                    <th>DATE</th>
                    <th style={{ textAlign: "center" }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueues.length > 0 ? (
                    filteredQueues.map((row, idx) => (
                      <tr 
                        key={row.id} 
                        onClick={() => {
                          setSelectedItem(row);
                          setCustomNotes('');
                        }}
                        style={{ cursor: "pointer", backgroundColor: selectedItem?.id === row.id ? "#eff6ff" : "transparent" }}
                      >
                        <td style={{ fontWeight: 700 }}>{idx + 1}</td>
                        <td style={{ fontWeight: 800, color: "#0f172a" }}>{row.name}</td>
                        <td style={{ fontFamily: "monospace", color: "#2563eb", fontWeight: 700 }}>{row.pid}</td>
                        <td>{row.date}</td>
                        <td style={{ textAlign: "center" }}>
                          <span className="patient-status-badge">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                        No pending prescriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.25rem", fontSize: "0.75rem", color: "#64748b", flexShrink: 0 }}>
              <span>Showing {filteredQueues.length} of {queues.length} entries</span>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button className="btn-light-outline" style={{ padding: "0.25rem 0.5rem" }} disabled>&lt;</button>
                <button className="btn-light-blue" style={{ padding: "0.25rem 0.75rem" }}>1</button>
                <button className="btn-light-outline" style={{ padding: "0.25rem 0.5rem" }} disabled>&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Bottom Left */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            <div className="white-card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", marginBottom: 0 }}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FileText size={18} className="text-gray-500" />
              </div>
              <div>
                <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>18</p>
                <p style={{ fontSize: "0.6875rem", color: "#64748b", marginTop: "2px", fontWeight: 600 }}>Total Prescriptions</p>
              </div>
            </div>
            <div className="white-card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", marginBottom: 0 }}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", backgroundColor: "#fffbeb", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock size={18} className="text-amber-500" />
              </div>
              <div>
                <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>12</p>
                <p style={{ fontSize: "0.6875rem", color: "#64748b", marginTop: "2px", fontWeight: 600 }}>Pending</p>
              </div>
            </div>
            <div className="white-card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", marginBottom: 0 }}>
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", backgroundColor: "#e0f2fe", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={18} className="text-blue-500" />
              </div>
              <div>
                <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>6</p>
                <p style={{ fontSize: "0.6875rem", color: "#64748b", marginTop: "2px", fontWeight: 600 }}>Dispensed Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prescription Details */}
        <div className="white-card" style={{ padding: "2rem", marginBottom: 0, display: "flex", flexDirection: "column", minHeight: "600px" }}>
          {selectedItem ? (
            <>
              <h3 style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1.25rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>PRESCRIPTION DETAILS</h3>
              
              {/* Patient Info Banner */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", width: "3.5rem", height: "3.5rem", borderRadius: "9999px", backgroundColor: "#f1f5f9", color: "#64748b", fontSize: "1.5rem", alignItems: "center", justifyContent: "center" }}>👤</div>
                  <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.15 }}>{selectedItem.name}</h2>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", display: "flex", gap: "0.5rem", marginTop: "4px" }}>
                      <span style={{ fontFamily: "monospace", color: "#2563eb", fontWeight: 700 }}>{selectedItem.pid}</span>
                      <span>•</span>
                      <span>{selectedItem.age}</span>
                      <span>•</span>
                      <span>{selectedItem.gender}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Prescription Date</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "0.25rem", padding: "0.35rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#334155", backgroundColor: "#f8fafc" }}>
                    <span>{selectedItem.date}</span>
                    <Calendar size={12} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Doctor */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Diagnosis</span>
                  <div style={{ border: "1px solid #cbd5e1", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", backgroundColor: "#f8fafc" }}>
                    {selectedItem.diagnosis}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Prescribing Doctor</span>
                  <div style={{ border: "1px solid #cbd5e1", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", fontSize: "0.8125rem", fontWeight: 700, color: "#334155", backgroundColor: "#f8fafc" }}>
                    {selectedItem.doctor}
                  </div>
                </div>
              </div>

              {/* Prescribed Medicines */}
              <div style={{ flex: 1, marginBottom: "1.5rem", overflowY: "auto" }}>
                <h4 style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.25rem" }}>PRESCRIBED MEDICINES</h4>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem", overflow: "hidden" }}>
                  <table className="light-table" style={{ border: "none", width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "30px" }}>#</th>
                        <th>DRUG NAME</th>
                        <th>STRENGTH / FORM</th>
                        <th style={{ width: "80px", textAlign: "center" }}>QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.drugs.map((drug, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: 700 }}>{index + 1}</td>
                          <td style={{ fontWeight: 700, color: "#0f172a" }}>{drug.name}</td>
                          <td>{drug.strength} / {drug.type}</td>
                          <td style={{ textAlign: "center", fontWeight: 800, color: "#2563eb" }}>{drug.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alerts */}
              {selectedItem.alerts && selectedItem.alerts.length > 0 && (
                <div style={{ display: "flex", gap: "0.75rem", padding: "0.875rem 1.15rem", border: "1px solid #fca5a5", borderRadius: "0.375rem", backgroundColor: "#fef2f2", marginBottom: "1.25rem", flexShrink: 0 }}>
                  <AlertTriangle size={18} className="text-red-500" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: "0.6875rem", color: "#b91c1c", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>ALERTS</span>
                    <ul style={{ fontSize: "0.75rem", color: "#b91c1c", paddingLeft: "1rem", margin: 0 }}>
                      {selectedItem.alerts.map((alert, idx) => (
                        <li key={idx}>{alert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
                <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>NOTES (OPTIONAL)</span>
                <textarea 
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Enter notes..." 
                  className="light-input"
                  style={{ minHeight: "70px", padding: "0.5rem 0.75rem" }}
                ></textarea>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto", borderTop: "1px solid #f1f5f9", paddingTop: "1rem", flexShrink: 0 }}>
                <button 
                  onClick={() => handleDispense('full')}
                  className="btn-light-blue"
                  style={{ flex: 1, padding: "0.75rem 0" }}
                >
                  DISPENSE AVAILABLE
                </button>
                <button 
                  onClick={() => handleDispense('partial')}
                  className="btn-light-outline"
                  style={{ flex: 1, padding: "0.75rem 0" }}
                >
                  MARK AS PARTIAL
                </button>
                <button 
                  onClick={() => handleDispense('cancel')}
                  className="btn-light-outline"
                  style={{ padding: "0.75rem 1rem", color: "#ef4444", borderColor: "#fca5a5" }}
                >
                  CANCEL
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
              <FileText size={48} style={{ color: "#cbd5e1", marginBottom: "0.5rem" }} />
              <p style={{ fontSize: "0.875rem" }}>Select a prescription record from the queue to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
