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

  return (
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "1400px", margin: "0 auto", minHeight: "100vh", backgroundColor: "#07101e", color: "#f8fafc", fontFamily: "'Poppins', sans-serif" }}>
          {/* Toast Notification */}
          {toastMessage && (
            <div style={{ position: "fixed", top: "1.25rem", right: "1.25rem", zIndex: 50, backgroundColor: "#0e1e38", border: "1px solid rgba(56, 189, 248, 0.4)", color: "#38bdf8", padding: "0.75rem 1.25rem", borderRadius: "0.625rem", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", fontSize: "0.875rem", fontWeight: 700 }}>
              {toastMessage}
            </div>
          )}

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#f0f9ff", margin: 0, letterSpacing: "-0.025em" }}>Drug Master Catalog</h1>
              <p style={{ fontSize: "0.8125rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                Manage clinic drug types, formulations, selling prices, and inventory reorder points.
              </p>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Home &gt; <span style={{ color: "#38bdf8", fontWeight: 600 }}>Drug List</span>
            </div>
          </div>

          {/* Metrics Row - 2x2 Inline Grid View (MediCare Dark Portal Theme) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem" }}>
            {/* Total Drugs */}
            <div style={{ backgroundColor: "rgba(15, 34, 59, 0.85)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "1rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1.25rem", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
              <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.75rem", backgroundColor: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Pill color="#38bdf8" size={22} />
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "#38bdf8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>TOTAL DRUG TYPES</span>
                <p style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginTop: "0.25rem" }}>{stats.totalTypes}</p>
                <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.25rem", display: "block" }}>Active Catalog</span>
              </div>
            </div>

            {/* In Stock */}
            <div style={{ backgroundColor: "rgba(15, 34, 59, 0.85)", border: "1px solid rgba(52, 211, 153, 0.25)", borderRadius: "1rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1.25rem", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
              <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.75rem", backgroundColor: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle color="#34d399" size={22} />
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "#34d399", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>IN STOCK TYPES</span>
                <p style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginTop: "0.25rem" }}>{stats.inStock}</p>
                <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.25rem", display: "block" }}>Sufficient levels</span>
              </div>
            </div>

            {/* Low Stock */}
            <div style={{ backgroundColor: "rgba(15, 34, 59, 0.85)", border: "1px solid rgba(251, 191, 36, 0.25)", borderRadius: "1rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1.25rem", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
              <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.75rem", backgroundColor: "rgba(251, 191, 36, 0.12)", border: "1px solid rgba(251, 191, 36, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AlertTriangle color="#fbbf24" size={22} />
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "#fbbf24", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>LOW STOCK TYPES</span>
                <p style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginTop: "0.25rem" }}>{stats.lowStock}</p>
                <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.25rem", display: "block" }}>Below reorder levels</span>
              </div>
            </div>

            {/* Out of Stock */}
            <div style={{ backgroundColor: "rgba(15, 34, 59, 0.85)", border: "1px solid rgba(248, 113, 113, 0.25)", borderRadius: "1rem", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1.25rem", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
              <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.75rem", backgroundColor: "rgba(248, 113, 113, 0.12)", border: "1px solid rgba(248, 113, 113, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AlertTriangle color="#f87171" size={22} />
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "#f87171", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>OUT OF STOCK</span>
                <p style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginTop: "0.25rem" }}>{stats.outOfStock}</p>
                <span style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.25rem", display: "block" }}>Zero stock level</span>
              </div>
            </div>
          </div>

          {/* Filters and Actions Section */}
          <div style={{ backgroundColor: "rgba(15, 34, 59, 0.8)", border: "1px solid rgba(56, 189, 248, 0.18)", borderRadius: "1rem", padding: "1.5rem", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
            <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "1.5rem", alignItems: "end" }}>
              {/* Search Term */}
              <div>
                <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>SEARCH</label>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="text"
                    placeholder="Search drug name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "100%", paddingLeft: "2.5rem", paddingRight: "0.75rem", paddingTop: "0.65rem", paddingBottom: "0.65rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#f8fafc", outline: "none" }}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>CATEGORY</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ width: "100%", padding: "0.65rem 0.75rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "#0b192e", color: "#f8fafc", outline: "none" }}
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
              <div style={{ gridColumn: "span 2 / span 2", display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{ flex: 1, padding: "0.65rem 1rem", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.625rem", fontSize: "0.8125rem", fontWeight: 700, backgroundColor: "rgba(255, 255, 255, 0.04)", color: "#cbd5e1", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <Filter size={15} /> RESET FILTER
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ flex: 1, padding: "0.65rem 1rem", background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #06b6d4 100%)", color: "#ffffff", border: "none", borderRadius: "0.625rem", fontSize: "0.8125rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(14, 165, 233, 0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> {loading ? "LOADING..." : "GENERATE"}
                </button>
              </div>
            </form>
          </div>

          {/* Main Table Section */}
          <div style={{ backgroundColor: "rgba(15, 34, 59, 0.8)", border: "1px solid rgba(56, 189, 248, 0.18)", borderRadius: "1rem", padding: "1.5rem", boxShadow: "0 15px 35px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#f0f9ff", margin: 0 }}>Drug Catalog Entries ({totalItems})</h3>
              <button
                onClick={openAddModal}
                style={{ padding: "0.65rem 1.25rem", background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #06b6d4 100%)", color: "#ffffff", border: "none", borderRadius: "0.625rem", fontSize: "0.8125rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(14, 165, 233, 0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                <Plus size={16} /> ADD NEW DRUG
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(7, 20, 38, 0.9)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "0.6875rem", color: "#38bdf8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>
                    <th style={{ padding: "0.875rem 1rem" }}>#</th>
                    <th style={{ padding: "0.875rem 1rem" }}>DRUG NAME</th>
                    <th style={{ padding: "0.875rem 1rem" }}>CATEGORY</th>
                    <th style={{ padding: "0.875rem 1rem" }}>UNIT TYPE</th>
                    <th style={{ padding: "0.875rem 1rem" }}>DOSAGE</th>
                    <th style={{ padding: "0.875rem 1rem", textAlign: "right" }}>SELLING PRICE</th>
                    <th style={{ padding: "0.875rem 1rem", textAlign: "center" }}>REORDER LEVEL</th>
                    <th style={{ padding: "0.875rem 1rem", textAlign: "center" }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.length > 0 ? (
                    drugs.map((drug, index) => (
                      <tr key={drug.drug_id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                        <td style={{ padding: "0.95rem 1rem", color: "#64748b" }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td style={{ padding: "0.95rem 1rem", fontWeight: 700, color: "#f8fafc" }}>{drug.name}</td>
                        <td style={{ padding: "0.95rem 1rem", color: "#cbd5e1" }}>
                          <span style={{ backgroundColor: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.2)", padding: "0.2rem 0.6rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600 }}>
                            {drug.category}
                          </span>
                        </td>
                        <td style={{ padding: "0.95rem 1rem", color: "#94a3b8" }}>{drug.unit_type}</td>
                        <td style={{ padding: "0.95rem 1rem", fontFamily: "monospace", color: "#34d399", fontWeight: 600 }}>{drug.dosage_type || 'N/A'}</td>
                        <td style={{ padding: "0.95rem 1rem", textAlign: "right", fontWeight: 800, color: "#38bdf8" }}>Rs. {drug.selling_price.toFixed(2)}</td>
                        <td style={{ padding: "0.95rem 1rem", textAlign: "center" }}>
                          <span style={{ backgroundColor: drug.reorder_level > 15 ? "rgba(52, 211, 153, 0.1)" : "rgba(251, 191, 36, 0.12)", color: drug.reorder_level > 15 ? "#34d399" : "#fbbf24", border: drug.reorder_level > 15 ? "1px solid rgba(52, 211, 153, 0.2)" : "1px solid rgba(251, 191, 36, 0.2)", padding: "0.2rem 0.5rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 800 }}>
                            {drug.reorder_level}
                          </span>
                        </td>
                        <td style={{ padding: "0.95rem 1rem", textAlign: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                            <button
                              onClick={() => openEditModal(drug)}
                              style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "0.5rem", backgroundColor: "rgba(56, 189, 248, 0.08)", color: "#38bdf8", cursor: "pointer" }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(drug)}
                              style={{ width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(248, 113, 113, 0.3)", borderRadius: "0.5rem", backgroundColor: "rgba(248, 113, 113, 0.08)", color: "#f87171", cursor: "pointer" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ padding: "3rem 1rem", textAlign: "center", color: "#64748b" }}>
                        {loading ? "Loading drugs catalog..." : "No drugs found in system."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", fontSize: "0.875rem", color: "#94a3b8", paddingTop: "1.25rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <span>
                  Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                </span>
                <div style={{ display: "flex", gap: "0.375rem" }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.5rem", backgroundColor: "rgba(255, 255, 255, 0.03)", color: "#cbd5e1", cursor: "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      style={{ width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", fontWeight: 800, fontSize: "0.8125rem", border: currentPage === i + 1 ? "none" : "1px solid rgba(255, 255, 255, 0.12)", background: currentPage === i + 1 ? "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)" : "rgba(255, 255, 255, 0.03)", color: currentPage === i + 1 ? "#ffffff" : "#cbd5e1", cursor: "pointer" }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{ width: "2.25rem", height: "2.25rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.5rem", backgroundColor: "rgba(255, 255, 255, 0.03)", color: "#cbd5e1", cursor: "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── MODALS SECTION (MediCare Dark Theme) ── */}

          {/* Modal 1: Add Drug */}
          {activeModal === 'add' && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(3, 10, 20, 0.75)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
              <div style={{ backgroundColor: "#0b192e", borderRadius: "1.25rem", border: "1px solid rgba(56, 189, 248, 0.25)", width: "100%", maxWidth: "520px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#071324" }}>
                  <h3 style={{ fontWeight: 800, color: "#f0f9ff", margin: 0, fontSize: "1.125rem" }}>Add New Drug Type</h3>
                  <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleAddSubmit}>
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Drug Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Paracetamol 500mg"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Category</label>
                        <select
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "#0b192e", color: "#ffffff" }}
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
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Unit Type</label>
                        <select
                          value={formData.unit_type}
                          onChange={e => setFormData({ ...formData, unit_type: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "#0b192e", color: "#ffffff" }}
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
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Dosage Form</label>
                        <input
                          type="text"
                          placeholder="e.g. 500mg"
                          value={formData.dosage_type}
                          onChange={e => setFormData({ ...formData, dosage_type: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Selling Price (Rs.)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="e.g. 2.50"
                          value={formData.selling_price}
                          onChange={e => setFormData({ ...formData, selling_price: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Reorder Level</label>
                        <input
                          type="number"
                          required
                          value={formData.reorder_level}
                          onChange={e => setFormData({ ...formData, reorder_level: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.25rem 1.75rem", backgroundColor: "#071324", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                    <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 700, backgroundColor: "transparent", color: "#cbd5e1", cursor: "pointer" }}>Cancel</button>
                    <button type="submit" style={{ padding: "0.6rem 1.25rem", background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}><Save size={16} /> Create</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal 2: Edit Drug */}
          {activeModal === 'edit' && selectedDrug && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(3, 10, 20, 0.75)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
              <div style={{ backgroundColor: "#0b192e", borderRadius: "1.25rem", border: "1px solid rgba(56, 189, 248, 0.25)", width: "100%", maxWidth: "520px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#071324" }}>
                  <h3 style={{ fontWeight: 800, color: "#f0f9ff", margin: 0, fontSize: "1.125rem" }}>Edit Drug Information</h3>
                  <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Drug Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Category</label>
                        <select
                          value={formData.category}
                          onChange={e => setFormData({ ...formData, category: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "#0b192e", color: "#ffffff" }}
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
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Unit Type</label>
                        <select
                          value={formData.unit_type}
                          onChange={e => setFormData({ ...formData, unit_type: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "#0b192e", color: "#ffffff" }}
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
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Dosage Form</label>
                        <input
                          type="text"
                          value={formData.dosage_type}
                          onChange={e => setFormData({ ...formData, dosage_type: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Selling Price (Rs.)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={formData.selling_price}
                          onChange={e => setFormData({ ...formData, selling_price: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.375rem" }}>Reorder Level</label>
                        <input
                          type="number"
                          required
                          value={formData.reorder_level}
                          onChange={e => setFormData({ ...formData, reorder_level: e.target.value })}
                          style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "0.625rem", fontSize: "0.875rem", backgroundColor: "rgba(7, 20, 38, 0.8)", color: "#ffffff" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.25rem 1.75rem", backgroundColor: "#071324", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                    <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 700, backgroundColor: "transparent", color: "#cbd5e1", cursor: "pointer" }}>Cancel</button>
                    <button type="submit" style={{ padding: "0.6rem 1.25rem", background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}><Save size={16} /> Update</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal 3: Delete Confirm */}
          {activeModal === 'delete' && selectedDrug && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(3, 10, 20, 0.75)", backdropFilter: "blur(8px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
              <div style={{ backgroundColor: "#0b192e", borderRadius: "1.25rem", border: "1px solid rgba(248, 113, 113, 0.3)", width: "100%", maxWidth: "440px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#071324" }}>
                  <h3 style={{ fontWeight: 800, color: "#f87171", margin: 0, fontSize: "1.125rem" }}>Delete Drug</h3>
                  <button onClick={() => setActiveModal(null)} style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer" }}>
                    <X size={20} />
                  </button>
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                    Are you sure you want to delete <span style={{ fontWeight: 800, color: "#ffffff" }}>{selectedDrug.name}</span>? This action soft-deletes the drug record and it will no longer show in prescription lists or inventory tables.
                  </p>
                </div>
                <div style={{ padding: "1.25rem 1.75rem", backgroundColor: "#071324", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button type="button" onClick={() => setActiveModal(null)} style={{ padding: "0.6rem 1.25rem", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 700, backgroundColor: "transparent", color: "#cbd5e1", cursor: "pointer" }}>Cancel</button>
                  <button type="button" onClick={handleDeleteConfirm} style={{ padding: "0.6rem 1.25rem", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

