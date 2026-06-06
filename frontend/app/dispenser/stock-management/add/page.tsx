import React from 'react';
import { Save, Calendar } from 'lucide-react';

export default function AddDrugStock() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add / Edit Drug</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new drug stock to inventory or update existing drug details.</p>
        </div>
        <div className="text-xs text-gray-400">
          Stock Management &gt; Add Drug Stock
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Drug Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">DRUG INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Drug Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter drug name" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Select category</option>
                  <option>Tablet</option>
                  <option>Capsule</option>
                  <option>Syrup</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Unit Type <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Select unit type</option>
                  <option>Tablet</option>
                  <option>Bottle</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                  Strength <span className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">i</span>
                </label>
                <input type="text" placeholder="e.g., 500mg, 10ml" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Batch Number</label>
                <input type="text" placeholder="Enter batch number (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Expiry Date</label>
                <div className="relative">
                  <input type="text" placeholder="YYYY-MM-DD" className="w-full pl-3 pr-9 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Manufactured By</label>
                <input type="text" placeholder="Enter manufacturer (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Drug Description</label>
                <input type="text" placeholder="Enter description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">PRICING INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Buying Price (Rs.) <span className="text-red-500">*</span></label>
                <input type="text" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Selling Price (Rs.)</label>
                <input type="text" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                  OR Profit Percentage (%) <span className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">i</span>
                </label>
                <input type="text" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-[10px] text-gray-400 mt-1">(System will calculate selling price)</p>
              </div>
            </div>
          </div>

          {/* Initial Stock */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">INITIAL STOCK</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Initial Quantity <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter quantity" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1 flex items-center gap-1">
                  Reorder Level <span className="w-3 h-3 rounded-full border border-gray-400 flex items-center justify-center text-[8px] text-gray-500">i</span>
                </label>
                <input type="text" placeholder="Enter reorder level" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-100">
              <input type="checkbox" id="predefined" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
              <div>
                <label htmlFor="predefined" className="text-sm font-bold text-gray-800">Add to predefined drug list</label>
                <p className="text-xs text-gray-500">(Drug will be available for prescription)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dealer & Supply Info */}
        <div className="space-y-6">
          
          {/* Dealer Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">DEALER INFORMATION</h3>
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer">
                <input type="radio" name="dealer_type" defaultChecked className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-800" />
                Select Existing Dealer
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input type="radio" name="dealer_type" className="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-800" />
                Add New Dealer
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Dealer <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Select dealer</option>
                  <option>Hemas Pharmaceuticals</option>
                  <option>CIC Holdings</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Contact Person</label>
                <input type="text" placeholder="Enter contact person" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone</label>
                  <input type="text" placeholder="Enter phone number" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Email</label>
                  <input type="text" placeholder="Enter email" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Address</label>
                <textarea placeholder="Enter dealer address" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"></textarea>
              </div>
            </div>
          </div>

          {/* Recent Supply Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">RECENT SUPPLY INFO (OPTIONAL)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Last Supply Date</label>
                <div className="relative">
                  <input type="text" placeholder="YYYY-MM-DD" className="w-full pl-3 pr-9 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Invoice / Reference No.</label>
                <input type="text" placeholder="Enter invoice no." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          CANCEL
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          RESET
        </button>
        <button className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 flex items-center gap-2 transition-colors">
          <Save size={16} /> SAVE DRUG STOCK
        </button>
      </div>
    </div>
  );
}
