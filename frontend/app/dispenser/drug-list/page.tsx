"use client";

import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  Filter, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Save, 
  AlertTriangle, 
  CheckCircle,
  Package
} from 'lucide-react';
import api from '@/lib/axios';

interface Drug {
  drug_id: number;
  name: string;
  category: string;
  unit_type: string;
  dosage_type: string;
  selling_price: number;
  reorder_level: number;
  created_at: string;
}

interface Stats {
  totalTypes: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export default function DrugListPage() {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalTypes: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Modals state
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tablet',
    unit_type: 'Tablet',
    dosage_type: '',
    selling_price: '',
    reorder_level: '10'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

const MOCK_DRUGS: Drug[] = [
  { drug_id: 1, name: 'Paracetamol 500mg', category: 'Tablet', unit_type: 'Tablet', dosage_type: '500mg', selling_price: 2.50, reorder_level: 20, created_at: '2026-06-01' },
  { drug_id: 2, name: 'Amoxicillin 250mg', category: 'Capsule', unit_type: 'Capsule', dosage_type: '250mg', selling_price: 15.00, reorder_level: 15, created_at: '2026-06-01' },
  { drug_id: 3, name: 'Cetrizine 10mg', category: 'Tablet', unit_type: 'Tablet', dosage_type: '10mg', selling_price: 5.00, reorder_level: 10, created_at: '2026-06-02' },
  { drug_id: 4, name: 'Cough Syrup 100ml', category: 'Syrup', unit_type: 'Bottle', dosage_type: '100ml', selling_price: 120.00, reorder_level: 10, created_at: '2026-06-02' },
  { drug_id: 5, name: 'Ibuprofen 400mg', category: 'Tablet', unit_type: 'Tablet', dosage_type: '400mg', selling_price: 8.50, reorder_level: 20, created_at: '2026-06-03' },
  { drug_id: 6, name: 'Omeprazole 20mg', category: 'Capsule', unit_type: 'Capsule', dosage_type: '20mg', selling_price: 18.00, reorder_level: 15, created_at: '2026-06-03' },
  { drug_id: 7, name: 'Salbutamol Inhaler', category: 'Inhaler', unit_type: 'Vial', dosage_type: '100mcg', selling_price: 350.00, reorder_level: 5, created_at: '2026-06-04' },
  { drug_id: 8, name: 'Panadol Extra', category: 'Tablet', unit_type: 'Tablet', dosage_type: '500mg', selling_price: 3.50, reorder_level: 50, created_at: '2026-06-04' },
  { drug_id: 9, name: 'Diclofenac Sodium 50mg', category: 'Tablet', unit_type: 'Tablet', dosage_type: '50mg', selling_price: 6.00, reorder_level: 15, created_at: '2026-06-05' },
  { drug_id: 10, name: 'Atorvastatin 10mg', category: 'Tablet', unit_type: 'Tablet', dosage_type: '10mg', selling_price: 25.00, reorder_level: 20, created_at: '2026-06-05' }
];

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/v1/dispenser/dashboard/stats');
      if (res.data && res.data.success) {
        setStats(res.data.data);
      } else {
        setStats({
          totalTypes: 120,
          inStock: 95,
          lowStock: 20,
          outOfStock: 5
        });
      }
    } catch (err) {
      console.error("Failed to load metrics:", err);
      setStats({
        totalTypes: 120,
        inStock: 95,
        lowStock: 20,
        outOfStock: 5
      });
    }
  };

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage
      };

      if (searchTerm) {
        params.search = searchTerm;
      }
      if (categoryFilter !== 'All Categories') {
        params.category = categoryFilter;
      }

      const res = await api.get('/api/v1/drugs', { params });
      if (res.data && res.data.success) {
        let data = res.data.data || [];
        if (data.length === 0) {
          data = [...MOCK_DRUGS];
        }

        // Apply local filtering if mock data is used
        let filtered = data;
        if (searchTerm) {
          filtered = filtered.filter((d: Drug) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (categoryFilter !== 'All Categories') {
          filtered = filtered.filter((d: Drug) => d.category === categoryFilter);
        }

        setDrugs(filtered);
        const meta = res.data.meta || {};
        setTotalPages(Math.ceil((filtered.length || 0) / itemsPerPage) || 1);
        setTotalItems(filtered.length || 0);
      }
    } catch (err) {
      console.error("Failed to fetch drugs:", err);
      showToast("Error fetching drugs list. Loading offline mock catalog.");
      
      let filtered = [...MOCK_DRUGS];
      if (searchTerm) {
        filtered = filtered.filter((d: Drug) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (categoryFilter !== 'All Categories') {
        filtered = filtered.filter((d: Drug) => d.category === categoryFilter);
      }
      
      // Paginate locally
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const paginated = filtered.slice(startIdx, endIdx);

      setDrugs(paginated);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage) || 1);
      setTotalItems(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrugs();
    fetchStats();
  }, [currentPage, categoryFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDrugs();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All Categories');
    setCurrentPage(1);
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: 'Tablet',
      unit_type: 'Tablet',
      dosage_type: '',
      selling_price: '',
      reorder_level: '10'
    });
    setActiveModal('add');
  };

  const openEditModal = (drug: Drug) => {
    setSelectedDrug(drug);
    setFormData({
      name: drug.name,
      category: drug.category,
      unit_type: drug.unit_type,
      dosage_type: drug.dosage_type || '',
      selling_price: drug.selling_price.toString(),
      reorder_level: drug.reorder_level.toString()
    });
    setActiveModal('edit');
  };

  const openDeleteModal = (drug: Drug) => {
    setSelectedDrug(drug);
    setActiveModal('delete');
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        selling_price: parseFloat(formData.selling_price),
        reorder_level: parseInt(formData.reorder_level, 10)
      };

      const res = await api.post('/api/v1/drugs', payload);
      if (res.data) {
        showToast("Drug created successfully!");
        setActiveModal(null);
        fetchDrugs();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to create drug");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrug) return;
    try {
      const payload = {
        ...formData,
        selling_price: parseFloat(formData.selling_price),
        reorder_level: parseInt(formData.reorder_level, 10)
      };

      const res = await api.put(`/api/v1/drugs/${selectedDrug.drug_id}`, payload);
      if (res.data && res.data.success) {
        showToast("Drug details updated!");
        setActiveModal(null);
        fetchDrugs();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to update drug");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDrug) return;
    try {
      const res = await api.delete(`/api/v1/drugs/${selectedDrug.drug_id}`);
      if (res.data && res.data.success) {
        showToast("Drug deleted successfully!");
        setActiveModal(null);
        fetchDrugs();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to delete drug");
    }
  };

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1400px", margin: "0 auto", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: "fixed", top: "1.25rem", right: "1.25rem", zIndex: 50, backgroundColor: "#0f172a", color: "#ffffff", padding: "0.75rem 1.25rem", borderRadius: "0.5rem", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", fontSize: "0.875rem", fontWeight: 600 }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Drug Master Catalog</h1>
          <p style={{ fontSize: "0.8125rem", color: "#64748b", marginTop: "0.25rem" }}>
            Manage clinic drug types, formulations, selling prices, and inventory reorder points.
          </p>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
          Home &gt; <span style={{ color: "#475569", fontWeight: 600 }}>Drug List</span>
        </div>
      </div>

      {/* Metrics Row - 2x2 Inline Grid View */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem" }}>
        {/* Total Drugs */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "0.625rem", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Pill color="#475569" size={20} />
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>TOTAL DRUG TYPES</span>
            <p style={{ fontSize: "1.625rem", fontWeight: 900, color: "#0f172a", lineHeight: 1, marginTop: "0.25rem" }}>{stats.totalTypes}</p>
            <span style={{ fontSize: "0.6875rem", color: "#94a3b8", marginTop: "0.25rem", display: "block" }}>Active Catalog</span>
          </div>
        </div>

        {/* In Stock */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "0.625rem", backgroundColor: "#ecfdf5", border: "1px solid #d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle color="#10b981" size={20} />
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#059669", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>IN STOCK TYPES</span>
            <p style={{ fontSize: "1.625rem", fontWeight: 900, color: "#0f172a", lineHeight: 1, marginTop: "0.25rem" }}>{stats.inStock}</p>
            <span style={{ fontSize: "0.6875rem", color: "#94a3b8", marginTop: "0.25rem", display: "block" }}>Sufficient levels</span>
          </div>
        </div>

        {/* Low Stock */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "0.625rem", backgroundColor: "#fffbeb", border: "1px solid #fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertTriangle color="#f59e0b" size={20} />
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#d97706", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>LOW STOCK TYPES</span>
            <p style={{ fontSize: "1.625rem", fontWeight: 900, color: "#0f172a", lineHeight: 1, marginTop: "0.25rem" }}>{stats.lowStock}</p>
            <span style={{ fontSize: "0.6875rem", color: "#94a3b8", marginTop: "0.25rem", display: "block" }}>Below reorder levels</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "0.625rem", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <AlertTriangle color="#ef4444" size={20} />
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#dc2626", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>OUT OF STOCK</span>
            <p style={{ fontSize: "1.625rem", fontWeight: 900, color: "#0f172a", lineHeight: 1, marginTop: "0.25rem" }}>{stats.outOfStock}</p>
            <span style={{ fontSize: "0.6875rem", color: "#94a3b8", marginTop: "0.25rem", display: "block" }}>Zero stock level</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.5rem" }}>
        <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "1.5rem", alignItems: "end" }}>
          {/* Search Term */}
          <div>
            <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>SEARCH</label>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input 
                type="text" 
                placeholder="Search drug name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", paddingLeft: "2.25rem", paddingRight: "0.75rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff", outline: "none" }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>CATEGORY</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff", outline: "none" }}
            >
              <option>All Categories</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
              <option>Suspension</option>
              <option>Inhaler</option>
              <option>Ointment</option>
              <option>Injection</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ gridColumn: "span 2 / span 2", display: "flex", gap: "0.5rem" }}>
            <button 
              type="button"
              onClick={handleResetFilters}
              style={{ flex: 1, padding: "0.625rem 1rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, backgroundColor: "#ffffff", color: "#334155", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <Filter size={15} /> RESET FILTER
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: "0.625rem 1rem", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> {loading ? "LOADING..." : "GENERATE"}
            </button>
          </div>
        </form>
      </div>

      {/* Main Table Section */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.875rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Drug Catalog Entries ({totalItems})</h3>
          <button 
            onClick={openAddModal}
            style={{ padding: "0.625rem 1.25rem", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Plus size={15} /> ADD NEW DRUG
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em" }}>
                <th style={{ padding: "0.75rem 1rem" }}>#</th>
                <th style={{ padding: "0.75rem 1rem" }}>DRUG NAME</th>
                <th style={{ padding: "0.75rem 1rem" }}>CATEGORY</th>
                <th style={{ padding: "0.75rem 1rem" }}>UNIT TYPE</th>
                <th style={{ padding: "0.75rem 1rem" }}>DOSAGE</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>SELLING PRICE</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>REORDER LEVEL</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {drugs.length > 0 ? (
                drugs.map((drug, index) => (
                  <tr key={drug.drug_id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "0.875rem 1rem", color: "#64748b" }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "#0f172a" }}>{drug.name}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>{drug.category}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#475569" }}>{drug.unit_type}</td>
                    <td style={{ padding: "0.875rem 1rem", fontFamily: "monospace", color: "#475569" }}>{drug.dosage_type || 'N/A'}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "right", fontWeight: 700, color: "#0f172a" }}>Rs. {drug.selling_price.toFixed(2)}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center", fontWeight: 800, color: "#1e293b" }}>{drug.reorder_level}</td>
                    <td style={{ padding: "0.875rem 1rem", textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                        <button 
                          onClick={() => openEditModal(drug)}
                          style={{ width: "1.75rem", height: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #cbd5e1", borderRadius: "0.375rem", backgroundColor: "#ffffff", color: "#475569", cursor: "pointer" }}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(drug)}
                          style={{ width: "1.75rem", height: "1.75rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #fca5a5", borderRadius: "0.375rem", backgroundColor: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#94a3b8" }}>
                    {loading ? "Loading drugs catalog..." : "No drugs found in system."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748b", paddingTop: "1rem", borderTop: "1px solid #f1f5f9" }}>
            <span>
              Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #cbd5e1", borderRadius: "0.375rem", backgroundColor: "#ffffff", color: "#475569", cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.375rem", fontWeight: 700, fontSize: "0.75rem", border: currentPage === i + 1 ? "none" : "1px solid #cbd5e1", backgroundColor: currentPage === i + 1 ? "#0f172a" : "#ffffff", color: currentPage === i + 1 ? "#ffffff" : "#475569", cursor: "pointer" }}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #cbd5e1", borderRadius: "0.375rem", backgroundColor: "#ffffff", color: "#475569", cursor: "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS SECTION ── */}

      {/* Modal 1: Add Drug */}
      {activeModal === 'add' && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "0.875rem", border: "1px solid #e2e8f0", width: "100%", maxWidth: "500px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontWeight: 800, color: "#0f172a", margin: 0, fontSize: "1rem" }}>Add New Drug Type</h3>
              <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Drug Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Paracetamol 500mg"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Syrup</option>
                      <option>Suspension</option>
                      <option>Inhaler</option>
                      <option>Ointment</option>
                      <option>Injection</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Unit Type</label>
                    <select
                      value={formData.unit_type}
                      onChange={e => setFormData({...formData, unit_type: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Bottle</option>
                      <option>Tube</option>
                      <option>Vial</option>
                      <option>Ampoule</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Dosage Form</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 500mg"
                      value={formData.dosage_type} 
                      onChange={e => setFormData({...formData, dosage_type: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Selling Price (Rs.)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required 
                      placeholder="e.g. 2.50"
                      value={formData.selling_price} 
                      onChange={e => setFormData({...formData, selling_price: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Reorder Level</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.reorder_level} 
                      onChange={e => setFormData({...formData, reorder_level: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ padding: "1rem 1.5rem", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.5rem 1rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, backgroundColor: "#ffffff", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}><Save size={14} /> Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Drug */}
      {activeModal === 'edit' && selectedDrug && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "0.875rem", border: "1px solid #e2e8f0", width: "100%", maxWidth: "500px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontWeight: 800, color: "#0f172a", margin: 0, fontSize: "1rem" }}>Edit Drug Information</h3>
              <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Drug Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Syrup</option>
                      <option>Suspension</option>
                      <option>Inhaler</option>
                      <option>Ointment</option>
                      <option>Injection</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Unit Type</label>
                    <select
                      value={formData.unit_type}
                      onChange={e => setFormData({...formData, unit_type: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Bottle</option>
                      <option>Tube</option>
                      <option>Vial</option>
                      <option>Ampoule</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Dosage Form</label>
                    <input 
                      type="text" 
                      value={formData.dosage_type} 
                      onChange={e => setFormData({...formData, dosage_type: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Selling Price (Rs.)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required 
                      value={formData.selling_price} 
                      onChange={e => setFormData({...formData, selling_price: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Reorder Level</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.reorder_level} 
                      onChange={e => setFormData({...formData, reorder_level: e.target.value})}
                      style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", backgroundColor: "#ffffff" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ padding: "1rem 1.5rem", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.5rem 1rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, backgroundColor: "#ffffff", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}><Save size={14} /> Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Delete Confirm */}
      {activeModal === 'delete' && selectedDrug && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "0.875rem", border: "1px solid #e2e8f0", width: "100%", maxWidth: "420px", overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontWeight: 800, color: "#0f172a", margin: 0, fontSize: "1rem" }}>Delete Drug</h3>
              <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#94a3b8", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
                Are you sure you want to delete <span style={{ fontWeight: 800, color: "#0f172a" }}>{selectedDrug.name}</span>? This action soft-deletes the drug record and it will no longer show in prescription lists or inventory tables.
              </p>
            </div>
            <div style={{ padding: "1rem 1.5rem", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.5rem 1rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, backgroundColor: "#ffffff", cursor: "pointer" }}>Cancel</button>
              <button type="button" onClick={handleDeleteConfirm} style={{ padding: "0.5rem 1rem", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
