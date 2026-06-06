import React from 'react';
import { Search, Filter, Calendar, AlertTriangle, FileText, Clock, Check } from 'lucide-react';

export default function DispensingQueue() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Dispensing</h1>
          <p className="text-sm text-gray-500 mt-1">View pending prescriptions and dispense medicines to patients.</p>
        </div>
        <div className="text-xs text-gray-400">
          Prescriptions &gt; Dispensing Queue
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Queue List */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">PRESCRIPTION QUEUE</h3>
            
            {/* Search & Filter */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by Patient Name / ID" 
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                SEARCH
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">PATIENT NAME</th>
                    <th className="px-4 py-3 font-medium">PRESCRIPTION ID</th>
                    <th className="px-4 py-3 font-medium">DATE</th>
                    <th className="px-4 py-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-blue-50/30 cursor-pointer">
                    <td className="px-4 py-4">1</td>
                    <td className="px-4 py-4 font-medium text-gray-800">Kamal Perera</td>
                    <td className="px-4 py-4 text-gray-600">P000123</td>
                    <td className="px-4 py-4 text-gray-600">2024-05-20</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-[10px] font-bold text-orange-600 bg-orange-100 rounded uppercase">Pending</span>
                    </td>
                  </tr>
                  {[
                    { id: 2, name: 'Nimal Silva', pid: 'P000124', date: '2024-05-20' },
                    { id: 3, name: 'Dilini Fernando', pid: 'P000125', date: '2024-05-19' },
                    { id: 4, name: 'Saman Wijesinghe', pid: 'P000126', date: '2024-05-19' },
                    { id: 5, name: 'Chathuri Desilva', pid: 'P000127', date: '2024-05-18' },
                    { id: 6, name: 'Ramesh Bandara', pid: 'P000128', date: '2024-05-18' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-4 py-4">{row.id}</td>
                      <td className="px-4 py-4 font-medium text-gray-800">{row.name}</td>
                      <td className="px-4 py-4 text-gray-600">{row.pid}</td>
                      <td className="px-4 py-4 text-gray-600">{row.date}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 text-[10px] font-bold text-orange-600 bg-orange-100 rounded uppercase">Pending</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>Showing 1 to 6 of 18 entries</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50">&lt;</button>
                <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded">1</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50">3</button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50">&gt;</button>
              </div>
            </div>
          </div>

          {/* Stats Bottom Left */}
          <div className="flex gap-4">
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <FileText size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">18</p>
                <p className="text-xs text-gray-500">Total Prescriptions</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Clock size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Check size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-xl font-bold">6</p>
                <p className="text-xs text-gray-500">Dispensed Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prescription Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col h-full">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">PRESCRIPTION DETAILS</h3>
          
          {/* Patient Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Kamal Perera</h2>
                <div className="text-sm text-gray-500 flex gap-3">
                  <span>P000123</span>
                  <span>32 Years</span>
                  <span>Male</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DATE</p>
              <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-sm">
                <span>2024-05-20</span>
                <Calendar size={14} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Diagnosis & Doctor */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DIAGNOSIS</p>
              <div className="p-2 border border-gray-200 rounded-md text-sm text-gray-800 bg-gray-50/50">
                Viral Fever
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">DOCTOR</p>
              <div className="p-2 border border-gray-200 rounded-md text-sm text-gray-800 bg-gray-50/50">
                Dr. Kamal Perera
              </div>
            </div>
          </div>

          {/* Prescribed Medicines */}
          <div className="mb-6 flex-1">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 pb-2">PRESCRIBED MEDICINES</h4>
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-500 uppercase">
                <tr>
                  <th className="py-2 font-medium">#</th>
                  <th className="py-2 font-medium">DRUG NAME</th>
                  <th className="py-2 font-medium">STRENGTH / FORM</th>
                  <th className="py-2 font-medium">PRESCRIBED QTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3">1</td>
                  <td className="py-3">
                    <p className="font-medium">Paracetamol</p>
                    <p className="text-xs text-gray-500">500mg</p>
                  </td>
                  <td className="py-3 text-gray-600">Tablet</td>
                  <td className="py-3 font-medium">10</td>
                </tr>
                <tr>
                  <td className="py-3">2</td>
                  <td className="py-3">
                    <p className="font-medium">Cetrizine</p>
                    <p className="text-xs text-gray-500">10mg</p>
                  </td>
                  <td className="py-3 text-gray-600">Tablet</td>
                  <td className="py-3 font-medium">20</td>
                </tr>
                <tr>
                  <td className="py-3">3</td>
                  <td className="py-3">
                    <p className="font-medium">Cough Syrup</p>
                    <p className="text-xs text-gray-500">100ml</p>
                  </td>
                  <td className="py-3 text-gray-600">Syrup</td>
                  <td className="py-3 font-medium">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Alerts */}
          <div className="bg-red-50 border border-red-100 rounded-md p-4 flex gap-3 mb-4">
            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">ALERTS</p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>Paracetamol 500mg is low in stock. Only 5 tablets available.</li>
                <li>Cough Syrup 100ml is out of stock.</li>
              </ul>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">NOTES (OPTIONAL)</p>
            <textarea 
              placeholder="Enter notes..." 
              className="w-full p-3 border border-gray-200 rounded-md text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <button className="flex-1 bg-gray-800 text-white font-medium text-sm py-3 rounded-md hover:bg-gray-900 transition-colors">
              DISPENSE AVAILABLE
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 font-medium text-sm py-3 rounded-md hover:bg-gray-50 transition-colors">
              MARK AS PARTIAL
            </button>
            <button className="border border-gray-300 text-gray-700 font-medium text-sm py-3 px-6 rounded-md hover:bg-gray-50 transition-colors">
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
