import React from 'react';
import { Search, Filter, RefreshCw, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function StockTable() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Table</h1>
          <p className="text-sm text-gray-500 mt-1">View all drugs in inventory with stock status and details.</p>
        </div>
        <div className="text-xs text-gray-400">
          Stock Management &gt; Stock Table
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">SEARCH</p>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by drug name, category..." 
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">CATEGORY</p>
            <select className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Categories</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
            </select>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">STATUS</p>
            <select className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <Filter size={16} /> FILTER
            </button>
            <button className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 flex items-center justify-center gap-2">
              <RefreshCw size={16} /> REFRESH
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center py-4 border-t border-b border-gray-100 mb-6">
          <div className="flex gap-6 text-sm">
            <span className="font-medium text-gray-800">Total Drugs: <span className="font-bold">120</span></span>
            <span className="text-gray-300">|</span>
            <span className="font-medium text-green-600">In Stock: <span className="font-bold">95</span></span>
            <span className="text-gray-300">|</span>
            <span className="font-medium text-orange-500">Low Stock: <span className="font-bold">20</span></span>
            <span className="text-gray-300">|</span>
            <span className="font-medium text-red-500">Out of Stock: <span className="font-bold">5</span></span>
          </div>
          <Link href="/dispenser/stock-management/add" className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900 flex items-center gap-2 transition-colors">
            <Plus size={16} /> ADD DRUG STOCK
          </Link>
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
                <th className="px-4 py-3 font-medium text-center">AVAILABLE QTY</th>
                <th className="px-4 py-3 font-medium text-center">REORDER LEVEL</th>
                <th className="px-4 py-3 font-medium">BATCH NO.</th>
                <th className="px-4 py-3 font-medium">EXPIRY DATE</th>
                <th className="px-4 py-3 font-medium text-center">STATUS</th>
                <th className="px-4 py-3 font-medium text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <StockRow 
                id={1} name="Paracetamol 500mg" cat="Tablet" unit="Tablet" qty={50} reorder={20} batch="B123" expiry="2026-05-30" status="In Stock" 
              />
              <StockRow 
                id={2} name="Amoxicillin 250mg" cat="Capsule" unit="Capsule" qty={10} reorder={15} batch="B555" expiry="2025-12-15" status="Low Stock" 
              />
              <StockRow 
                id={3} name="Cetrizine 10mg" cat="Tablet" unit="Tablet" qty={30} reorder={10} batch="C321" expiry="2026-07-10" status="In Stock" 
              />
              <StockRow 
                id={4} name="Cough Syrup 100ml" cat="Syrup" unit="Bottle" qty={0} reorder={10} batch="S777" expiry="2024-11-20" status="Out of Stock" 
              />
              <StockRow 
                id={5} name="Ibuprofen 400mg" cat="Tablet" unit="Tablet" qty={18} reorder={20} batch="I212" expiry="2025-08-18" status="Low Stock" 
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <span>Showing 1 to 10 of 120 entries</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">3</button>
            <span className="w-8 h-8 flex items-center justify-center">...</span>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">12</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StockRow({ id, name, cat, unit, qty, reorder, batch, expiry, status }: any) {
  let statusClass = "text-green-600 border-green-200 bg-green-50";
  if (status === "Low Stock") statusClass = "text-orange-600 border-orange-200 bg-orange-50";
  if (status === "Out of Stock") statusClass = "text-red-600 border-red-200 bg-red-50";

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4 text-gray-500">{id}</td>
      <td className="px-4 py-4 font-medium text-gray-900">{name}</td>
      <td className="px-4 py-4 text-gray-600">{cat}</td>
      <td className="px-4 py-4 text-gray-600">{unit}</td>
      <td className="px-4 py-4 text-center font-medium">{qty}</td>
      <td className="px-4 py-4 text-center text-gray-500">{reorder}</td>
      <td className="px-4 py-4 text-gray-600">{batch}</td>
      <td className="px-4 py-4 text-gray-600">{expiry}</td>
      <td className="px-4 py-4 text-center">
        <span className={`px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase inline-block whitespace-nowrap ${statusClass}`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-100 text-gray-500 transition-colors">
            <Edit size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
