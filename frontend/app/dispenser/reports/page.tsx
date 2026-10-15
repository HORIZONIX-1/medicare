"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  BarChart2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Download, 
  RefreshCw,
  Filter,
  CheckCircle,
  Pill
} from 'lucide-react';
import api from '@/lib/axios';

interface Supplier {
  supplier_id: number;
  name: string;
  contact_person?: string;
}

interface ReportItem {
  id: number;
  date: string;
  drugName: string;
  category: string;
  openingStock: number;
  added: number;
  dispensed: number;
  adjusted: number;
  closingStock: number;
  unit: string;
}

export default function ReportsPage() {
  // Report Selection State: 'daily' | 'monthly' | 'low_stock' | 'expiry'
  const [reportType, setReportType] = useState<'daily' | 'monthly' | 'low_stock' | 'expiry'>('daily');
  
  // Filters State
  const [startDate, setStartDate] = useState<string>('2024-05-13');
  const [endDate, setEndDate] = useState<string>('2024-05-20');
  const [category, setCategory] = useState<string>('All Categories');
  const [drugSearch, setDrugSearch] = useState<string>('');
  const [selectedDealer, setSelectedDealer] = useState<string>('All Dealers');
  
  // Data State
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState({
    totalDrugs: 0,
    totalDispensed: 0,
    totalAddedStock: 0,
    totalStockValue: 0
  });
  const [reportResults, setReportResults] = useState<ReportItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const generateReport = async (initial = false) => {
    setLoading(true);
    try {
      let results: ReportItem[] = [];
      let totalDispensed = 0;
      let totalAdded = 0;

      if (reportType === 'low_stock') {
        // Fetch low stock alerts
        const res = await api.get('/api/v1/dispenser/alerts/low-stock?limit=100');
        if (res.data && res.data.success) {
          const lowStockData = res.data.data || [];
          results = lowStockData.map((item: { name: string; reorder_level: number; total_qty: number }, idx: number) => ({
            id: idx + 1,
            date: new Date().toISOString().split('T')[0],
            drugName: item.name,
            category: 'Medicine',
            openingStock: Number(item.total_qty),
            added: 0,
            dispensed: 0,
            adjusted: 0,
            closingStock: Number(item.total_qty),
            unit: 'Units'
          }));
        }
      } else if (reportType === 'expiry') {
        // Fetch expiry alerts
        const res = await api.get('/api/v1/dispenser/alerts/expiry?days=90&limit=100');
        if (res.data && res.data.success) {
          const expiryData = res.data.data || [];
          results = expiryData.map((item: { name: string; quantity: number; expiry_date?: string }, idx: number) => ({
            id: idx + 1,
            date: item.expiry_date ? item.expiry_date.split('T')[0] : 'N/A',
            drugName: item.name,
            category: 'Medicine',
            openingStock: Number(item.quantity),
            added: 0,
            dispensed: 0,
            adjusted: 0,
            closingStock: Number(item.quantity),
            unit: 'Units'
          }));
        }
      } else {
        // Daily Drug Usage & Monthly Stock Usage uses movement audit logs
        const params: Record<string, string> = {};
        if (startDate) params.dateFrom = startDate;
        if (endDate) params.dateTo = endDate;
        const res = await api.get('/api/v1/dispenser/reports/movement', { params });
        
        if (res.data && res.data.success && res.data.data.data.length > 0) {
          const logs = res.data.data.data;
          results = logs.map((log: { action?: string; metadata?: { quantity?: number; qty?: number; drugName?: string; adjustmentType?: string; before?: number; after?: number }; created_at?: string }, idx: number) => {
            const meta = log.metadata || {};
            const action = log.action || '';
            const qty = Number(meta.quantity || meta.qty || 0);
            
            let added = 0;
            let dispensed = 0;
            let adjusted = 0;

            if (action === 'CREATE' || action === 'ADD' || (action === 'ADJUST_STOCK' && meta.adjustmentType === 'ADD')) {
              added = qty;
              totalAdded += qty;
            } else if (action === 'DISPENSE' || action === 'DISPENSE_DRUG' || action === 'REMOVE') {
              dispensed = qty;
              totalDispensed += qty;
            } else if (action === 'ADJUST_STOCK' && meta.adjustmentType === 'REMOVE') {
              adjusted = -qty;
            } else {
              adjusted = qty;
            }

            const opening = Number(meta.before ?? 0);

            return {
              id: idx + 1,
              date: log.created_at ? log.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
              drugName: meta.drugName || 'Unknown drug',
              category: 'Medicine',
              openingStock: opening,
              added,
              dispensed,
              adjusted,
              closingStock: Number(meta.after ?? opening + added - dispensed + adjusted),
              unit: 'Units'
            };
          });
        }
      }


      // Filter local results based on form elements
      let filtered = [...results];
      if (category !== 'All Categories') {
        filtered = filtered.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }
      if (drugSearch) {
        filtered = filtered.filter(item => item.drugName.toLowerCase().includes(drugSearch.toLowerCase()));
      }

      setReportResults(filtered);
      
      // Update Dispensed & Added counts in selected period
      setSummaryData(prev => ({
        ...prev,
        totalDispensed,
        totalAddedStock: totalAdded
      }));

      if (!initial) {
        showToast("Report generated successfully!");
      }
    } catch (e) {
      console.error(e);
      setReportResults([]);
      showToast("Error generating report data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      // Fetch summary metrics
      const summaryRes = await api.get('/api/v1/dispenser/reports/inventory-summary');
      if (summaryRes.data && summaryRes.data.success) {
        const { totalDrugs, totalValue } = summaryRes.data.data;
        setSummaryData(prev => ({
          ...prev,
          totalDrugs: totalDrugs || 0,
          totalStockValue: totalValue || 0
        }));
      }
    } catch (error) {
      console.error("Failed to load initial report summary metrics:", error);
    }

    try {
      // Fetch suppliers
      const suppliersRes = await api.get('/api/v1/dispenser/suppliers');
      if (suppliersRes.data && suppliersRes.data.success) {
        setSuppliers(suppliersRes.data.data?.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
    
    // Load initial report results
    generateReport(true);
  };

  // Load basic data
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExportCSV = () => {
    if (reportResults.length === 0) {
      showToast("No data to export.");
      return;
    }

    const headers = ["#", "DATE", "DRUG NAME", "CATEGORY", "OPENING STOCK", "ADDED", "DISPENSED", "ADJUSTED", "CLOSING STOCK", "UNIT"];
    const csvRows = [
      headers.join(','),
      ...reportResults.map(item => [
        item.id,
        item.date,
        `"${item.drugName}"`,
        item.category,
        item.openingStock,
        item.added,
        item.dispensed,
        item.adjusted,
        item.closingStock,
        item.unit
      ].join(','))
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Pharmacy_Report_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV report exported successfully!");
  };

  // Pagination helper
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reportResults.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-800 text-sm flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {toastMessage}
        </div>
      )}

      {/* Breadcrumbs & Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">View and generate pharmacy reports for stock, usage and expiry.</p>
        </div>
        <div className="text-xs text-gray-400">
          Home &gt; <span className="text-gray-600 font-medium">Reports</span>
        </div>
      </div>

      {/* Report Type Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Daily Drug Usage */}
        <button 
          onClick={() => setReportType('daily')}
          className={`flex items-start gap-4 p-5 bg-white border rounded-xl transition-all text-left group relative ${
            reportType === 'daily' 
              ? 'border-gray-950 ring-1 ring-gray-950 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Calendar className="text-gray-600" size={20} />
          </div>
          <div className="pr-4">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-950 transition-colors">Daily Drug Usage</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">View medicines dispensed and stock used for a selected day.</p>
          </div>
          <div className="absolute top-5 right-5">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              reportType === 'daily' ? 'border-gray-950' : 'border-gray-300'
            }`}>
              {reportType === 'daily' && <div className="w-2 h-2 rounded-full bg-gray-950" />}
            </div>
          </div>
        </button>

        {/* Monthly Stock Usage */}
        <button 
          onClick={() => setReportType('monthly')}
          className={`flex items-start gap-4 p-5 bg-white border rounded-xl transition-all text-left group relative ${
            reportType === 'monthly' 
              ? 'border-gray-950 ring-1 ring-gray-950 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <BarChart2 className="text-gray-600" size={20} />
          </div>
          <div className="pr-4">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-950 transition-colors">Monthly Stock Usage</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">View stock usage summary for a selected month.</p>
          </div>
          <div className="absolute top-5 right-5">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              reportType === 'monthly' ? 'border-gray-950' : 'border-gray-300'
            }`}>
              {reportType === 'monthly' && <div className="w-2 h-2 rounded-full bg-gray-950" />}
            </div>
          </div>
        </button>

        {/* Low Stock Report */}
        <button 
          onClick={() => setReportType('low_stock')}
          className={`flex items-start gap-4 p-5 bg-white border rounded-xl transition-all text-left group relative ${
            reportType === 'low_stock' 
              ? 'border-gray-950 ring-1 ring-gray-950 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-gray-600" size={20} />
          </div>
          <div className="pr-4">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-950 transition-colors">Low Stock Report</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">View all drugs that are below the reorder level.</p>
          </div>
          <div className="absolute top-5 right-5">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              reportType === 'low_stock' ? 'border-gray-950' : 'border-gray-300'
            }`}>
              {reportType === 'low_stock' && <div className="w-2 h-2 rounded-full bg-gray-950" />}
            </div>
          </div>
        </button>

        {/* Expiry Report */}
        <button 
          onClick={() => setReportType('expiry')}
          className={`flex items-start gap-4 p-5 bg-white border rounded-xl transition-all text-left group relative ${
            reportType === 'expiry' 
              ? 'border-gray-950 ring-1 ring-gray-950 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Clock className="text-gray-600" size={20} />
          </div>
          <div className="pr-4">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-950 transition-colors">Expiry Report</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">View drugs expiring soon or already expired.</p>
          </div>
          <div className="absolute top-5 right-5">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              reportType === 'expiry' ? 'border-gray-950' : 'border-gray-300'
            }`}>
              {reportType === 'expiry' && <div className="w-2 h-2 rounded-full bg-gray-950" />}
            </div>
          </div>
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">CATEGORY</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
            >
              <option>All Categories</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
              <option>Inhaler</option>
            </select>
          </div>

          {/* Drug Search */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">DRUG</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search drug name" 
                value={drugSearch}
                onChange={(e) => setDrugSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950"
              />
            </div>
          </div>

          {/* Dealer */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">DEALER</label>
            <select 
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
            >
              <option>All Dealers</option>
              {suppliers.map(s => (
                <option key={s.supplier_id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-end gap-3 mt-6 border-t border-gray-100 pt-5">
          <button 
            onClick={fetchInitialData}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter size={15} /> RESET FILTER
          </button>
          <button 
            onClick={() => generateReport()}
            disabled={loading}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-2 shrink-0 disabled:opacity-65"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? "GENERATING..." : "GENERATE"}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Drugs */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Pill className="text-gray-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">TOTAL DRUGS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{summaryData.totalDrugs}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Active in System</span>
          </div>
        </div>

        {/* Total Dispensed */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle className="text-emerald-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">TOTAL DISPENSED</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{summaryData.totalDispensed}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">In Selected Period</span>
          </div>
        </div>

        {/* Total Added Stock */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <RefreshCw className="text-blue-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">TOTAL ADDED STOCK</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{summaryData.totalAddedStock}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">In Selected Period</span>
          </div>
        </div>

        {/* Total Stock Value */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <span className="text-amber-600 font-bold text-lg">Rs.</span>
          </div>
          <div>
            <span className="text-[10px] text-amber-600 uppercase font-bold tracking-wider">TOTAL STOCK VALUE</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">Rs. {summaryData.totalStockValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">As of Selected Period</span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-gray-800">Report Results</h3>
          <button 
            onClick={handleExportCSV}
            className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <Download size={15} /> EXPORT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">DATE</th>
                <th className="px-4 py-3 font-medium">DRUG NAME</th>
                <th className="px-4 py-3 font-medium">CATEGORY</th>
                <th className="px-4 py-3 font-medium text-center">OPENING STOCK</th>
                <th className="px-4 py-3 font-medium text-center">ADDED</th>
                <th className="px-4 py-3 font-medium text-center">DISPENSED</th>
                <th className="px-4 py-3 font-medium text-center">ADJUSTED</th>
                <th className="px-4 py-3 font-medium text-center">CLOSING STOCK</th>
                <th className="px-4 py-3 font-medium">UNIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-gray-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="px-4 py-4 text-gray-600">{item.date}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.drugName}</td>
                    <td className="px-4 py-4 text-gray-600">{item.category}</td>
                    <td className="px-4 py-4 text-center font-medium text-gray-700">{item.openingStock}</td>
                    <td className="px-4 py-4 text-center font-semibold text-blue-600">{item.added > 0 ? `+${item.added}` : '-'}</td>
                    <td className="px-4 py-4 text-center font-semibold text-emerald-600">{item.dispensed > 0 ? `-${item.dispensed}` : '-'}</td>
                    <td className="px-4 py-4 text-center font-semibold text-amber-600">{item.adjusted !== 0 ? (item.adjusted > 0 ? `+${item.adjusted}` : item.adjusted) : '-'}</td>
                    <td className="px-4 py-4 text-center font-bold text-gray-900">{item.closingStock}</td>
                    <td className="px-4 py-4 text-gray-500 uppercase text-xs">{item.unit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                    No results found for the selected filters.
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, reportResults.length)} of {reportResults.length} entries
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
    </div>
  );
}
