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
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-800 text-sm flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drug List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage drug catalog, descriptions, prices and levels.</p>
        </div>
        <div className="text-xs text-gray-400">
          Home &gt; <span className="text-gray-600 font-medium">Drug List</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Drugs */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Pill className="text-gray-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">TOTAL DRUG TYPES</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.totalTypes}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Active Catalog</span>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle className="text-emerald-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">IN STOCK TYPES</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.inStock}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Sufficient levels</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-orange-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-orange-500 uppercase font-bold tracking-wider">LOW STOCK TYPES</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.lowStock}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Below reorder levels</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-red-500 uppercase font-bold tracking-wider">OUT OF STOCK</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.outOfStock}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Zero stock level</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search Term */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">SEARCH</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search drug name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">CATEGORY</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
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
          <div className="md:col-span-2 flex items-end gap-2">
            <button 
              type="button"
              onClick={handleResetFilters}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
            >
              <Filter size={15} /> RESET FILTER
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> {loading ? "LOADING..." : "GENERATE"}
            </button>
          </div>
        </form>
      </div>

      {/* Main Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-gray-800">Drug Catalog Entries ({totalItems})</h3>
          <button 
            onClick={openAddModal}
            className="py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 flex items-center gap-2 transition-all"
          >
            <Plus size={15} /> ADD NEW DRUG
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">DRUG NAME</th>
                <th className="px-4 py-3 font-medium">CATEGORY</th>
                <th className="px-4 py-3 font-medium">UNIT TYPE</th>
                <th className="px-4 py-3 font-medium">DOSAGE</th>
                <th className="px-4 py-3 font-medium text-right">SELLING PRICE</th>
                <th className="px-4 py-3 font-medium text-center">REORDER LEVEL</th>
                <th className="px-4 py-3 font-medium text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {drugs.length > 0 ? (
                drugs.map((drug, index) => (
                  <tr key={drug.drug_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{drug.name}</td>
                    <td className="px-4 py-4 text-gray-600">{drug.category}</td>
                    <td className="px-4 py-4 text-gray-600">{drug.unit_type}</td>
                    <td className="px-4 py-4 font-mono text-gray-600">{drug.dosage_type || 'N/A'}</td>
                    <td className="px-4 py-4 text-right font-medium text-gray-950">Rs. {drug.selling_price.toFixed(2)}</td>
                    <td className="px-4 py-4 text-center font-bold text-gray-800">{drug.reorder_level}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openEditModal(drug)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(drug)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    {loading ? "Loading drugs catalog..." : "No drugs found in system."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <span>
              Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-gray-900 text-white' 
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Add New Drug Type</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Drug Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Paracetamol 500mg"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
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
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unit Type</label>
                    <select
                      value={formData.unit_type}
                      onChange={e => setFormData({...formData, unit_type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dosage Form</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 500mg"
                      value={formData.dosage_type} 
                      onChange={e => setFormData({...formData, dosage_type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Selling Price (Rs.)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required 
                      placeholder="e.g. 2.50"
                      value={formData.selling_price} 
                      onChange={e => setFormData({...formData, selling_price: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Reorder Level</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.reorder_level} 
                      onChange={e => setFormData({...formData, reorder_level: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Drug */}
      {activeModal === 'edit' && selectedDrug && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Edit Drug Information</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Drug Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
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
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unit Type</label>
                    <select
                      value={formData.unit_type}
                      onChange={e => setFormData({...formData, unit_type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dosage Form</label>
                    <input 
                      type="text" 
                      value={formData.dosage_type} 
                      onChange={e => setFormData({...formData, dosage_type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Selling Price (Rs.)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required 
                      value={formData.selling_price} 
                      onChange={e => setFormData({...formData, selling_price: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Reorder Level</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.reorder_level} 
                      onChange={e => setFormData({...formData, reorder_level: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Delete Confirm */}
      {activeModal === 'delete' && selectedDrug && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Delete Drug</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-gray-900">{selectedDrug.name}</span>? This action soft-deletes the drug record and it will no longer show in prescription lists or inventory tables.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="button" onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
