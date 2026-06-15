"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Home, 
  Package, 
  Printer, 
  Lock, 
  ChevronRight, 
  Info,
  X,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Form states
  const [generalInfo, setGeneralInfo] = useState({
    name: "Medical Center Pharmacy",
    regNo: "MCP-2024-8893",
    email: "pharmacy@medicalcenter.com",
    phone: "+94 11 234 5678",
    address: "123, Galle Road, Colombo 03"
  });

  const [lowStockSettings, setLowStockSettings] = useState({
    defaultReorder: 10,
    notifyEmail: true,
    notifyDashboard: true
  });

  const [dateTimeSettings, setDateTimeSettings] = useState({
    timezone: "GMT+05:30 (Asia/Colombo)",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "12-hour"
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveGeneralInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    showToast("General Information updated successfully!");
  };

  const handleSaveLowStockSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    showToast("Low Stock settings saved!");
  };

  const handleSaveDateTimeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveModal(null);
    showToast("Date & Time configuration saved!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    setActiveModal(null);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showToast("Password updated successfully!");
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system configuration and preferences.</p>
        </div>
        <div className="text-xs text-gray-400">
          Home &gt; <span className="text-gray-600 font-medium">Settings</span>
        </div>
      </div>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* System Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Settings size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">System Settings</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Configure general preferences</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => setActiveModal('general_info')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>General Information</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => setActiveModal('date_time')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Date & Time</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Currency settings loaded")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Currency Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Database backup initiated")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Backup Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">User Management</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Manage users and their roles</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => showToast("Directing to Manage Users")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Manage Users</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Directing to Roles & Permissions")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Roles & Permissions</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Audit Logs loaded")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Activity Log</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Pharmacy Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Home size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Pharmacy Settings</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Configure pharmacy settings</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => setActiveModal('general_info')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Pharmacy Information</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Prescription options configured")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Prescription Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Dispensing workflows loaded")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Dispensing Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => setActiveModal('low_stock')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Low Stock Alert Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Inventory Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Package size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Inventory Settings</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Manage inventory parameters</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => showToast("Stock Categories details")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Stock Categories</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Units configurations")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Units of Measurement</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => setActiveModal('low_stock')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Reorder Level Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Expiry alerts set to 60 days")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Expiry Alert Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Print Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Printer size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Print Settings</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Configure print preferences</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => showToast("Prescription template edited")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Prescription Print Template</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Label print template modified")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Label Print Template</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Report layouts updated")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Report Print Settings</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Security Settings</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Manage security and access</p>
            </div>
          </div>
          <div className="space-y-1">
            <button onClick={() => setActiveModal('change_password')} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Change Password</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Two-Factor Authentication Setup enabled")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Two-Factor Authentication</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
            <button onClick={() => showToast("Sessions active: 1")} className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-950 transition-colors">
              <span>Session Management</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

      </div>

      {/* System Information Block */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-gray-600 animate-pulse" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">System Information</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">System Name</span>
            <span className="font-semibold text-gray-900 mt-1 block">Medical Center Pharmacy</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Version</span>
            <span className="font-semibold text-gray-900 mt-1 block">1.0.0</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Last Updated</span>
            <span className="font-semibold text-gray-900 mt-1 block">2024-05-20 10:30 AM</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Database Status</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded uppercase">Connected</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Backup Status</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded uppercase">Up to date</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-400 py-3">
        © 2024 Medical Center Pharmacy. All rights reserved.
      </div>

      {/* ── MODALS SECTION ── */}

      {/* Modal 1: General Info */}
      {activeModal === 'general_info' && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Pharmacy Information</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveGeneralInfo}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pharmacy Name</label>
                  <input 
                    type="text" 
                    required 
                    value={generalInfo.name} 
                    onChange={e => setGeneralInfo({...generalInfo, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Registration Number</label>
                  <input 
                    type="text" 
                    required 
                    value={generalInfo.regNo} 
                    onChange={e => setGeneralInfo({...generalInfo, regNo: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Support Email</label>
                  <input 
                    type="email" 
                    required 
                    value={generalInfo.email} 
                    onChange={e => setGeneralInfo({...generalInfo, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Phone</label>
                  <input 
                    type="text" 
                    required 
                    value={generalInfo.phone} 
                    onChange={e => setGeneralInfo({...generalInfo, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Physical Address</label>
                  <textarea 
                    required 
                    rows={2}
                    value={generalInfo.address} 
                    onChange={e => setGeneralInfo({...generalInfo, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Low Stock Settings */}
      {activeModal === 'low_stock' && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Low Stock Settings</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveLowStockSettings}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Default Reorder Threshold (Quantity)</label>
                  <input 
                    type="number" 
                    required 
                    value={lowStockSettings.defaultReorder} 
                    onChange={e => setLowStockSettings({...lowStockSettings, defaultReorder: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={lowStockSettings.notifyEmail} 
                      onChange={e => setLowStockSettings({...lowStockSettings, notifyEmail: e.target.checked})}
                      className="rounded text-gray-900 focus:ring-gray-950 w-4 h-4 border-gray-300"
                    />
                    <span>Email notifications for low stock alerts</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={lowStockSettings.notifyDashboard} 
                      onChange={e => setLowStockSettings({...lowStockSettings, notifyDashboard: e.target.checked})}
                      className="rounded text-gray-900 focus:ring-gray-950 w-4 h-4 border-gray-300"
                    />
                    <span>Show alerts directly on Dispenser Dashboard</span>
                  </label>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Date & Time Settings */}
      {activeModal === 'date_time' && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Date & Time Settings</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveDateTimeSettings}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Timezone</label>
                  <select 
                    value={dateTimeSettings.timezone} 
                    onChange={e => setDateTimeSettings({...dateTimeSettings, timezone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  >
                    <option>GMT+05:30 (Asia/Colombo)</option>
                    <option>GMT+00:00 (UTC)</option>
                    <option>GMT-05:00 (America/New_York)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Date Format</label>
                  <select 
                    value={dateTimeSettings.dateFormat} 
                    onChange={e => setDateTimeSettings({...dateTimeSettings, dateFormat: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  >
                    <option>YYYY-MM-DD</option>
                    <option>DD/MM/YYYY</option>
                    <option>MM-DD-YYYY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Time Format</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeFormat"
                        checked={dateTimeSettings.timeFormat === '12-hour'} 
                        onChange={() => setDateTimeSettings({...dateTimeSettings, timeFormat: '12-hour'})}
                        className="text-gray-900 focus:ring-gray-950 w-4 h-4 border-gray-300"
                      />
                      <span>12-hour (AM/PM)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeFormat"
                        checked={dateTimeSettings.timeFormat === '24-hour'} 
                        onChange={() => setDateTimeSettings({...dateTimeSettings, timeFormat: '24-hour'})}
                        className="text-gray-900 focus:ring-gray-950 w-4 h-4 border-gray-300"
                      />
                      <span>24-hour</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Change Password */}
      {activeModal === 'change_password' && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Change Password</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSavePassword}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Current Password</label>
                  <input 
                    type="password" 
                    required 
                    value={passwordForm.currentPassword}
                    onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                  <input 
                    type="password" 
                    required 
                    value={passwordForm.newPassword}
                    onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    required 
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950" 
                  />
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 transition-colors flex items-center gap-1.5"><Save size={14} /> Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
