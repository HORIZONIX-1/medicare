"use client";

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Calendar, 
  Search, 
  RefreshCw, 
  Filter, 
  Eye, 
  Pill,
  X,
  MapPin,
  DollarSign,
  PackageCheck
} from 'lucide-react';
import api from '@/lib/axios';

interface Drug {
  name: string;
  category: string;
  unit_type: string;
}

interface StockBatch {
  stock_batch_id: number;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  status: string;
  warehouse_location?: string;
  buying_price: number;
  selling_price: number;
  drug: Drug;
}

interface AlertRow {
  id: number;
  batchId: number;
  drugName: string;
  category: string;
  batchNo: string;
  expiryDate: string;
  daysLeft: number;
  availableQty: number;
  status: 'Expired' | 'Expiring Soon (0-30 days)' | 'Expiring in 31-60 days' | 'In Stock';
  rawBatch?: StockBatch;
}

export default function ExpiryAlertsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertsList, setAlertsList] = useState<AlertRow[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [startDate, setStartDate] = useState<string>('2024-05-13');
  const [endDate, setEndDate] = useState<string>('2024-06-20');
  
  // Selected Batch for Modal
  const [selectedRow, setSelectedRow] = useState<AlertRow | null>(null);
  
  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const processAlerts = (rawBatches: StockBatch[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rows: AlertRow[] = rawBatches.map((b, index) => {
      const expiry = b.expiry_date ? new Date(b.expiry_date) : null;
      let daysLeft = 999;
      if (expiry) {
        expiry.setHours(0,0,0,0);
        const diffTime = expiry.getTime() - today.getTime();
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      let status: AlertRow['status'] = 'In Stock';
      if (daysLeft < 0) {
        status = 'Expired';
      } else if (daysLeft <= 30) {
        status = 'Expiring Soon (0-30 days)';
      } else if (daysLeft <= 60) {
        status = 'Expiring in 31-60 days';
      }

      return {
        id: index + 1,
        batchId: b.stock_batch_id,
        drugName: b.drug?.name || 'Unknown Drug',
        category: b.drug?.category || 'Tablet',
        batchNo: b.batch_number || 'N/A',
        expiryDate: b.expiry_date ? b.expiry_date.split('T')[0] : 'N/A',
        daysLeft,
        availableQty: b.quantity,
        status,
        rawBatch: b
      };
    });

    setAlertsList(rows);
  };

  const fetchStockBatches = async () => {
    setLoading(true);
    try {
      const res = await api.get('/stock?limit=100');
      const data = res.data?.data || [];
      processAlerts(data);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch stock batches from server.");
      // If server fetch fails, fall back to mock data
      processAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStockBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStats = () => {
    let zeroToThirty = 0;
    let thirtyToOneSixty = 0;
    let expired = 0;
    const totalDrugs = new Set(alertsList.map(a => a.drugName)).size;

    alertsList.forEach(item => {
      if (item.status === 'Expired') expired++;
      else if (item.status === 'Expiring Soon (0-30 days)') zeroToThirty++;
      else if (item.status === 'Expiring in 31-60 days') thirtyToOneSixty++;
    });

    return { zeroToThirty, thirtyToOneSixty, expired, totalDrugs };
  };

  const stats = getStats();

  const handleFilter = () => {
    let filtered = [...alertsList];

    // Status filter
    if (statusFilter !== 'All Status') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.drugName.toLowerCase().includes(term) || 
        item.batchNo.toLowerCase().includes(term)
      );
    }

    // Date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.expiryDate);
        return itemDate >= start && itemDate <= end;
      });
    }

    return filtered;
  };

  const processedList = handleFilter();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processedList.length / itemsPerPage);

  const getDaysLeftClass = (days: number) => {
    if (days < 0) return 'text-red-600 font-bold';
    if (days <= 30) return 'text-orange-500 font-bold';
    if (days <= 60) return 'text-amber-500 font-semibold';
    return 'text-green-600 font-medium';
  };

  const getStatusBadge = (status: AlertRow['status']) => {
    switch(status) {
      case 'Expired':
        return <span className="px-2.5 py-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-full uppercase inline-block whitespace-nowrap">Expired</span>;
      case 'Expiring Soon (0-30 days)':
        return <span className="px-2.5 py-1 text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-full uppercase inline-block whitespace-nowrap">Expiring Soon (0-30 days)</span>;
      case 'Expiring in 31-60 days':
        return <span className="px-2.5 py-1 text-[10px] font-bold text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-full uppercase inline-block whitespace-nowrap">Expiring in 31-60 days</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full uppercase inline-block whitespace-nowrap">In Stock</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-800 text-sm flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expiry Alerts</h1>
          <p className="text-sm text-gray-500 mt-1">View drugs that are expiring soon or already expired.</p>
        </div>
        <div className="text-xs text-gray-400">
          Stock Management &gt; <span className="text-gray-600 font-medium">Expiry Alerts</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Expiring 0-30 days */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-orange-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">EXPIRING IN 0 - 30 DAYS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.zeroToThirty}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Drugs</span>
          </div>
        </div>

        {/* Expiring 31-60 days */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center shrink-0">
            <Calendar className="text-yellow-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">EXPIRING IN 31 - 60 DAYS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.thirtyToOneSixty}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Drugs</span>
          </div>
        </div>

        {/* Expired */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <Calendar className="text-red-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">EXPIRED</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.expired}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Drugs</span>
          </div>
        </div>

        {/* Total Drugs */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Pill className="text-emerald-500" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">TOTAL DRUGS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{stats.totalDrugs}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">In System</span>
          </div>
        </div>
      </div>

      {/* Filters Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Search */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">SEARCH</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by drug name or batch no." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
              />
            </div>
          </div>

          {/* Expiry Status */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">EXPIRY STATUS</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
            >
              <option>All Status</option>
              <option>Expired</option>
              <option>Expiring Soon (0-30 days)</option>
              <option>Expiring in 31-60 days</option>
              <option>In Stock</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">DATE RANGE</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus-within:ring-2 focus-within:ring-gray-950 focus-within:border-gray-950 transition-all">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full focus:outline-none bg-transparent"
              />
              <span className="text-gray-400">→</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-end gap-2">
            <button 
              onClick={fetchStockBatches}
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
            >
              <Filter size={15} /> FILTER
            </button>
            <button 
              onClick={fetchStockBatches}
              className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> REFRESH
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">DRUG NAME</th>
                <th className="px-4 py-3 font-medium">CATEGORY</th>
                <th className="px-4 py-3 font-medium">BATCH NO.</th>
                <th className="px-4 py-3 font-medium">EXPIRY DATE</th>
                <th className="px-4 py-3 font-medium">DAYS LEFT / OVERDUE</th>
                <th className="px-4 py-3 font-medium text-center">AVAILABLE QTY</th>
                <th className="px-4 py-3 font-medium text-center">STATUS</th>
                <th className="px-4 py-3 font-medium text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.drugName}</td>
                    <td className="px-4 py-4 text-gray-600">{item.category}</td>
                    <td className="px-4 py-4 text-gray-600 font-mono">{item.batchNo}</td>
                    <td className="px-4 py-4 text-gray-600">{item.expiryDate}</td>
                    <td className="px-4 py-4">
                      <span className={getDaysLeftClass(item.daysLeft)}>
                        {item.daysLeft < 0 ? `${item.daysLeft} days` : `${item.daysLeft} days`}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-gray-900">{item.availableQty}</td>
                    <td className="px-4 py-4 text-center">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => setSelectedRow(item)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No expiry alerts found.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, processedList.length)} of {processedList.length} entries
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

      {/* Detail Modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Batch Details</h3>
              <button 
                onClick={() => setSelectedRow(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Drug Name</span>
                <h4 className="text-xl font-bold text-gray-950 mt-1">{selectedRow.drugName}</h4>
                <p className="text-xs text-gray-500 mt-1">Category: {selectedRow.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Batch Number</span>
                  <span className="text-sm font-semibold text-gray-900 font-mono mt-1 block">{selectedRow.batchNo}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Expiry Date</span>
                  <span className="text-sm font-semibold text-gray-900 mt-1 block">{selectedRow.expiryDate}</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Available Quantity</span>
                  <span className="text-sm font-semibold text-gray-900 mt-1 block">{selectedRow.availableQty} units</span>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Time Remaining</span>
                  <span className={`text-sm font-semibold mt-1 block ${getDaysLeftClass(selectedRow.daysLeft)}`}>
                    {selectedRow.daysLeft < 0 ? `Overdue by ${Math.abs(selectedRow.daysLeft)} days` : `${selectedRow.daysLeft} days left`}
                  </span>
                </div>
              </div>

              {/* Location & Pricing */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Warehouse Location: <span className="font-semibold text-gray-900">{selectedRow.rawBatch?.warehouse_location || 'Main Shelf A'}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <DollarSign size={16} className="text-gray-400" />
                  <span>Buying Price: <span className="font-semibold text-gray-900">Rs. {(selectedRow.rawBatch?.buying_price || 15).toFixed(2)}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <PackageCheck size={16} className="text-gray-400" />
                  <span>Selling Price: <span className="font-semibold text-gray-900">Rs. {(selectedRow.rawBatch?.selling_price || 25).toFixed(2)}</span></span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button 
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
