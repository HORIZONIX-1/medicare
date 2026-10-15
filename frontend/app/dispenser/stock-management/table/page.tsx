"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface StockBatch {
  stock_batch_id: number;
  drug_id: number;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  buying_price: number;
  selling_price: number;
  status: string;
  warehouse_location: string;
  supplier_id: number | null;
  drug: {
    name: string;
    category: string;
    unit_type: string;
    reorder_level: number;
  };
}

export default function StockTable() {
  const [batches, setBatches] = useState<StockBatch[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Dashboard stats states
  const [stats, setStats] = useState({
    totalTypes: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  });

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    category: 'All Categories',
    status: 'All Status'
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<StockBatch | null>(null);

  // Fetch batches & stats on mount
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await api.get('/api/v1/dispenser/dashboard/stats');
      if (statsRes.data && statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    }

    try {
      // Fetch stock batches
      const stockRes = await api.get('/stock?limit=100');
      const list = stockRes.data?.data || stockRes.data || [];
      setBatches(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load stock list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute status dynamically
  const getBatchStatus = (item: StockBatch) => {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= (item.drug?.reorder_level ?? 10)) return 'Low Stock';
    return 'In Stock';
  };

  // Filter batch logic
  const filteredBatches = batches.filter(b => {
    // Search
    const searchMatch = !activeFilters.search || 
      b.drug?.name?.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      b.batch_number?.toLowerCase().includes(activeFilters.search.toLowerCase());
    
    // Category
    const categoryMatch = activeFilters.category === 'All Categories' || 
      b.drug?.category === activeFilters.category;

    // Status
    const statusMatch = activeFilters.status === 'All Status' || 
      getBatchStatus(b) === activeFilters.status;

    return searchMatch && categoryMatch && statusMatch;
  });

  // Calculate local stats from loaded batches if stats API fails or defaults are present
  const computedStats = batches.reduce((acc, b) => {
    const status = getBatchStatus(b);
    if (status === 'In Stock') acc.inStock += 1;
    else if (status === 'Low Stock') acc.lowStock += 1;
    else if (status === 'Out of Stock') acc.outOfStock += 1;
    return acc;
  }, { inStock: 0, lowStock: 0, outOfStock: 0 });

  const displayStats = {
    totalTypes: predefinedDrugsCount() || batches.length,
    inStock: stats.inStock || computedStats.inStock,
    lowStock: stats.lowStock || computedStats.lowStock,
    outOfStock: stats.outOfStock || computedStats.outOfStock
  };

  function predefinedDrugsCount() {
    // Get unique drug IDs from stock batches
    const uniqueIds = new Set(batches.map(b => b.drug_id));
    return uniqueIds.size;
  }

  // Handle pagination indexing
  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage) || 1;
  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setActiveFilters({
      search: searchTerm,
      category: categoryFilter,
      status: statusFilter
    });
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setCategoryFilter('All Categories');
    setStatusFilter('All Status');
    setActiveFilters({
      search: '',
      category: 'All Categories',
      status: 'All Status'
    });
    setCurrentPage(1);
    fetchData();
  };

  // Deletion logic
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/stock/batch/${deleteTarget.stock_batch_id}`);
      alert("Stock batch deleted successfully!");
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete stock batch");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Delete Stock Batch</h3>
              <button onClick={() => setDeleteTarget(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Are you sure you want to remove batch <span className="font-bold text-slate-800">{deleteTarget.batch_number || 'N/A'}</span> for <span className="font-bold text-slate-800">{deleteTarget.drug?.name}</span> from the inventory? This action is permanent.
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Link href="/dispenser" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Stock Management</span>
            <span>&gt;</span>
            <span className="text-slate-600">Stock Table</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Stock Table</h1>
          <p className="text-sm text-slate-500 mt-1">View all drugs in inventory with stock status and details.</p>
        </div>
        <Link 
          href="/dispenser/stock-management/add" 
          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
        >
          <Plus size={18} /> 
          <span>ADD DRUG STOCK</span>
        </Link>
      </div>

      {/* Metrics Cards Grid - 2x2 Grid View */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.25rem" }}>
        
        {/* Total Drugs */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-blue-100/50 transition-all duration-200">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Package size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{displayStats.totalTypes}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Active Catalog</p>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-green-100/50 transition-all duration-200">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{displayStats.inStock}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">In Stock</p>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-amber-100/50 transition-all duration-200">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{displayStats.lowStock}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Low Stock</p>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-rose-100/50 transition-all duration-200">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
            <XCircle size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{displayStats.outOfStock}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Out of Stock</p>
          </div>
        </div>
      </div>

      {/* Control Card (Filters) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          
          {/* Search */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Search</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search drug or batch number..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
            <select 
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
            >
              <option value="All Categories">All Categories</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Suspension">Suspension</option>
              <option value="Inhaler">Inhaler</option>
              <option value="Ointment">Ointment</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
            >
              <option value="All Status">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex gap-3">
            <button 
              onClick={handleApplyFilter}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
            >
              <Filter size={15} /> 
              <span>FILTER</span>
            </button>
            <button 
              onClick={handleRefresh}
              className="py-2.5 px-3 border border-blue-100 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 hover:text-blue-700 transition-all flex items-center justify-center active:scale-[0.98] shadow-sm" 
              title="Refresh Table"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Drug Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Available Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Reorder Level</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch No.</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-slate-400">Loading stock inventory...</td>
                </tr>
              ) : paginatedBatches.length > 0 ? (
                paginatedBatches.map((item, idx) => (
                  <tr key={item.stock_batch_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-400">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{item.drug?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-500 font-semibold">{item.drug?.category || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-500">{item.drug?.unit_type || 'N/A'}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-800">{item.quantity}</td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-500">{item.drug?.reorder_level ?? 10}</td>
                    <td className="px-6 py-4 font-mono text-slate-400 text-xs font-semibold">{item.batch_number || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('en-US') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 border text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-sm ${
                        getBatchStatus(item) === 'In Stock' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : getBatchStatus(item) === 'Low Stock' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {getBatchStatus(item)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 active:scale-95 shadow-sm" title="Edit Drug">
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => setDeleteTarget(item)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-slate-100 hover:border-rose-100 active:scale-95 shadow-sm" 
                          title="Delete Drug"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-8 text-center text-slate-400">No stock batches found in inventory matching criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Status Footer */}
        {totalPages > 1 && (
          <div className="bg-slate-50/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <span>
              Showing {Math.min(filteredBatches.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, filteredBatches.length)} of {filteredBatches.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-800 rounded-lg transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors font-bold ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-800 rounded-lg transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
