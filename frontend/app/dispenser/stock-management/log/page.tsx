import React from 'react';
import { Search, Filter, Download, Eye, Clock } from 'lucide-react';

export default function StockUpdateLog() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Update Log</h1>
          <p className="text-sm text-gray-500 mt-1">View all automatic and manual stock updates. All changes are recorded for audit and tracking.</p>
        </div>
        <div className="text-xs text-gray-400">
          Stock Management &gt; Stock Update Log
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="md:col-span-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">SEARCH</p>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by drug name, reason, ref ID..." 
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DRUG</p>
            <select className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Drugs</option>
              <option>Paracetamol</option>
              <option>Amoxicillin</option>
            </select>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">CHANGE TYPE</p>
            <select className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Types</option>
              <option>Auto Deduct</option>
              <option>Stock Added</option>
              <option>Manual Edit</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DATE RANGE</p>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="2024-05-13" className="w-full py-2 px-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-400 text-xs">→</span>
                <input type="text" placeholder="2024-05-20" className="w-full py-2 px-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mb-6">
          <button className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <Filter size={16} /> FILTER
          </button>
          <button className="py-2 px-4 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 flex items-center justify-center gap-2">
            <Download size={16} /> EXPORT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Date & Time</th>
                <th className="px-4 py-3 font-medium">Drug Name</th>
                <th className="px-4 py-3 font-medium text-center">Change</th>
                <th className="px-4 py-3 font-medium">Change Type</th>
                <th className="px-4 py-3 font-medium">Reason / Reference</th>
                <th className="px-4 py-3 font-medium">Reference ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium text-center">Prev Qty</th>
                <th className="px-4 py-3 font-medium text-center">New Qty</th>
                <th className="px-4 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <LogRow 
                id={1} 
                date="2024-05-20" time="10:30 AM" 
                drug="Paracetamol 500mg" 
                change="-10" changeType="Auto Deduct" 
                reason="Prescription Dispensed" refId="RX000123" 
                user="Dispenser" prev={50} newQty={40} 
              />
              <LogRow 
                id={2} 
                date="2024-05-20" time="09:15 AM" 
                drug="Amoxicillin 250mg" 
                change="+50" changeType="Stock Added" 
                reason="New Stock Received" refId="GRN00056" 
                user="Dispenser" prev={10} newQty={60} 
              />
              <LogRow 
                id={3} 
                date="2024-05-19" time="05:45 PM" 
                drug="Cetrizine 10mg" 
                change="-5" changeType="Auto Deduct" 
                reason="Prescription Dispensed" refId="RX000122" 
                user="Dispenser" prev={35} newQty={30} 
              />
              <LogRow 
                id={4} 
                date="2024-05-19" time="02:20 PM" 
                drug="Cough Syrup 100ml" 
                change="+12" changeType="Stock Added" 
                reason="New Stock Received" refId="GRN00055" 
                user="Dispenser" prev={0} newQty={12} 
              />
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-md p-4 flex gap-3">
          <Clock size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-800 mb-1">Note</p>
            <p className="text-xs text-blue-600">
              All stock updates are automatically recorded. You can view details by clicking the <Eye size={12} className="inline mx-1" /> button in the Action column.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogRow({ id, date, time, drug, change, changeType, reason, refId, user, prev, newQty }: any) {
  const isPositive = change.startsWith('+');
  
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4 text-gray-500">{id}</td>
      <td className="px-4 py-4">
        <p className="text-gray-900">{date}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </td>
      <td className="px-4 py-4 font-medium text-gray-900 w-32">{drug}</td>
      <td className="px-4 py-4 text-center">
        <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </td>
      <td className="px-4 py-4 text-gray-700">{changeType}</td>
      <td className="px-4 py-4 text-gray-700">{reason}</td>
      <td className="px-4 py-4 font-mono text-xs text-gray-500">{refId}</td>
      <td className="px-4 py-4 text-gray-700">{user}</td>
      <td className="px-4 py-4 text-center font-medium text-gray-600">{prev}</td>
      <td className="px-4 py-4 text-center font-bold text-gray-900">{newQty}</td>
      <td className="px-4 py-4 text-center">
        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-100 text-gray-500 transition-colors mx-auto">
          <Eye size={14} />
        </button>
      </td>
    </tr>
  );
}
