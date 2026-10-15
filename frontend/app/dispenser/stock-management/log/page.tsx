"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Clock, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface AuditLog {
  audit_log_id: number;
  actor_user_id: number | null;
  action: string;
  entity: string;
  entity_id: string | null;
  metadata: any;
  actor?: { name: string; role: string } | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface StockBatch {
  stock_batch_id: number;
  drug: {
    name: string;
  };
}

export default function StockUpdateLog() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [batches, setBatches] = useState<StockBatch[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [drugFilter, setDrugFilter] = useState('All Drugs');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Active filters for display query
  const [activeFilters, setActiveFilters] = useState({
    search: '',
    drug: 'All Drugs',
    type: 'All Types',
    from: '',
    to: ''
  });

  // Modal inspection state
  const [inspectTarget, setInspectTarget] = useState<AuditLog | null>(null);

  // Fetch batches (for drug names lookup) & audit logs on mount
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch batches
      const stockRes = await api.get('/stock?limit=100');
      const list = stockRes.data?.data || stockRes.data || [];
      setBatches(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to fetch stock batches list:", err);
    }

    try {
      // 2. Fetch audit logs (reports/movement)
      const movementRes = await api.get('/api/v1/dispenser/reports/movement?limit=100');
      // Response shape: { success, data: { data: AuditLog[], meta } }
      const logList = movementRes.data?.data?.data ?? [];
      setLogs(Array.isArray(logList) ? logList : []);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Map entity_id to Drug Name
  const getDrugName = (entityId: string | null) => {
    if (!entityId) return 'N/A';
    const batch = batches.find(b => b.stock_batch_id.toString() === entityId);
    return batch ? batch.drug?.name : `Stock Batch #${entityId}`;
  };

  // Get User Display Name
  const getUserName = (log: AuditLog) => {
    if (log.actor?.name) return log.actor.name;
    return log.actor_user_id === null ? 'System' : `User #${log.actor_user_id}`;
  };

  // Resolve Change Display Details
  const getChangeDetails = (log: AuditLog) => {
    const action = log.action;
    const meta = log.metadata || {};

    let changeText = '—';
    let typeText = 'Manual Edit';
    let reasonText = 'Audit Log details';
    let prevText = '—';
    let newText = '—';

    if (action === 'ADJUST_STOCK') {
      typeText = meta.adjustmentType === 'ADD' ? 'Stock Added' : 'Auto Deduct';
      changeText = `${meta.adjustmentType === 'ADD' ? '+' : '-'}${meta.quantity || 0}`;
      reasonText = meta.reason || (meta.adjustmentType === 'ADD' ? 'Stock Refill' : 'Prescription Dispensed');
      prevText = meta.before !== undefined ? meta.before.toString() : '—';
      newText = meta.after !== undefined ? meta.after.toString() : '—';
    } else if (action === 'DISPENSE') {
      typeText = 'Auto Deduct';
      changeText = `-${meta.quantity || 0}`;
      reasonText = 'Prescription Dispensed';
      prevText = meta.before !== undefined ? meta.before.toString() : '—';
      newText = meta.after !== undefined ? meta.after.toString() : '—';
    } else if (action === 'TRANSFER_STOCK') {
      typeText = 'Transfer';
      changeText = `-${meta.quantity || 0}`;
      reasonText = `Transferred to Batch #${meta.toBatchId}`;
      prevText = meta.beforeFrom !== undefined ? meta.beforeFrom.toString() : '—';
      newText = meta.afterFrom !== undefined ? meta.afterFrom.toString() : '—';
    } else if (action === 'UPDATE_PRICE') {
      typeText = 'Price Update';
      reasonText = `Buying: Rs. ${meta.buying_price || 0} | Selling: Rs. ${meta.selling_price || 0}`;
    } else if (action === 'CREATE') {
      typeText = 'Stock Created';
      changeText = `+${meta.quantity || 0}`;
      reasonText = 'Initial Stock Entry';
      newText = meta.quantity || '—';
    } else if (action === 'UPDATE') {
      typeText = 'Batch Edit';
      reasonText = 'Fields updated';
    } else if (action === 'DELETE') {
      typeText = 'Batch Deletion';
      reasonText = 'Stock batch removed';
    }

    return { changeText, typeText, reasonText, prevText, newText };
  };

  // Filter logs logic
  const filteredLogs = logs.filter(log => {
    const details = getChangeDetails(log);
    const drugName = getDrugName(log.entity_id);

    // Search
    const searchMatch = !activeFilters.search ||
      drugName.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      details.reasonText.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      (log.entity_id && log.entity_id.toLowerCase().includes(activeFilters.search.toLowerCase()));

    // Drug Name dropdown filter
    const drugMatch = activeFilters.drug === 'All Drugs' || 
      drugName.toLowerCase().includes(activeFilters.drug.toLowerCase());

    // Change Type filter
    const typeMatch = activeFilters.type === 'All Types' ||
      details.typeText === activeFilters.type;

    // Date Range
    let dateMatch = true;
    if (activeFilters.from || activeFilters.to) {
      const logDate = new Date(log.created_at);
      if (activeFilters.from && logDate < new Date(activeFilters.from)) dateMatch = false;
      if (activeFilters.to && logDate > new Date(activeFilters.to + 'T23:59:59')) dateMatch = false;
    }

    return searchMatch && drugMatch && typeMatch && dateMatch;
  });

  // Extract unique drugs names for dropdown
  const uniqueDrugNames = Array.from(new Set(batches.map(b => b.drug?.name).filter(Boolean)));

  const handleApplyFilter = () => {
    setActiveFilters({
      search: searchTerm,
      drug: drugFilter,
      type: typeFilter,
      from: dateFrom,
      to: dateTo
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Inspect Audit Log Modal */}
      {inspectTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800">Audit Log Details</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">ID: {inspectTarget.audit_log_id} | Type: {inspectTarget.action}</p>
              </div>
              <button onClick={() => setInspectTarget(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-400 block uppercase tracking-wider">Date & Time</span>
                  <span className="text-slate-700 font-medium">{new Date(inspectTarget.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block uppercase tracking-wider">Operator IP</span>
                  <span className="text-slate-700 font-medium">{inspectTarget.ip_address || '127.0.0.1'}</span>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-2">Metadata Payload (JSON)</span>
                <pre className="text-xs text-slate-700 font-mono overflow-auto max-h-48 p-2 bg-slate-100/50 rounded-lg">
                  {JSON.stringify(inspectTarget.metadata || {}, null, 2)}
                </pre>
              </div>

              {inspectTarget.user_agent && (
                <div className="text-xs">
                  <span className="font-bold text-slate-400 block uppercase tracking-wider">User Agent</span>
                  <span className="text-slate-500 font-medium break-all">{inspectTarget.user_agent}</span>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setInspectTarget(null)} className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors">Close</button>
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
            <Link href="/dispenser/stock-management/table" className="hover:text-slate-600 transition-colors">Stock Management</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Stock Update Log</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Stock Update Log</h1>
          <p className="text-sm text-slate-500 mt-1">View all automatic and manual stock updates. All changes are recorded for audit and tracking.</p>
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
                placeholder="Search by drug, reason, ref ID..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Drug */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Drug</label>
            <select 
              value={drugFilter}
              onChange={e => setDrugFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
            >
              <option value="All Drugs">All Drugs</option>
              {uniqueDrugNames.map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Change Type */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Change Type</label>
            <select 
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
            >
              <option value="All Types">All Types</option>
              <option value="Stock Added">Stock Added</option>
              <option value="Auto Deduct">Auto Deduct</option>
              <option value="Transfer">Transfer</option>
              <option value="Price Update">Price Update</option>
              <option value="Manual Edit">Manual Edit</option>
              <option value="Batch Deletion">Batch Deletion</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Date Range</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="YYYY-MM-DD" 
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm text-center font-semibold" 
              />
              <span className="text-slate-300 font-bold">→</span>
              <input 
                type="text" 
                placeholder="YYYY-MM-DD" 
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm text-center font-semibold" 
              />
            </div>
          </div>
        </div>

        {/* Filter and Export Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
          <button 
            onClick={handleApplyFilter}
            className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
          >
            <Filter size={16} /> 
            <span>FILTER LOGS</span>
          </button>
          <button className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-md shadow-slate-900/10">
            <Download size={16} /> 
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Drug Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Change</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Change Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason / Reference</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reference ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Prev Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">New Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-slate-400">Loading audit history...</td>
                </tr>
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => {
                  const details = getChangeDetails(log);
                  const isPositive = details.changeText.startsWith('+');

                  return (
                    <tr key={log.audit_log_id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">
                          {new Date(log.created_at).toLocaleDateString('en-US')}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                          {new Date(log.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900 max-w-[160px] truncate">
                        {getDrugName(log.entity_id)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {details.changeText !== '—' ? (
                          <span className={`inline-block px-2.5 py-0.5 border text-xs font-extrabold rounded-full ${
                            isPositive 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {details.changeText}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">{details.typeText}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium max-w-[200px] truncate" title={details.reasonText}>
                        {details.reasonText}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-400 text-xs font-semibold">{log.entity_id || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{getUserName(log)}</td>
                      <td className="px-6 py-4 text-center text-slate-400 font-medium">{details.prevText}</td>
                      <td className="px-6 py-4 text-center font-bold text-slate-800">
                        {details.newText !== '—' ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <span className="text-slate-400 text-xs font-normal">→</span>
                            <span>{details.newText}</span>
                          </div>
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => setInspectTarget(log)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 hover:border-blue-100 active:scale-95 shadow-sm mx-auto flex items-center justify-center" 
                          title="View Audit Details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-slate-400">No stock update logs found matching options.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Alert Box */}
      <div className="bg-blue-50/40 border border-blue-100/70 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <Clock size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-800">System Log Auditing</h4>
          <p className="text-xs text-blue-600/90 mt-1 leading-relaxed">
            All drug stock edits, auto-deductions, and receipt inputs are logged in real-time for compliance. 
            Clicking the <Eye size={12} className="inline mx-0.5" /> button loads the detailed audit record for that change.
          </p>
        </div>
      </div>

    </div>
  );
}
