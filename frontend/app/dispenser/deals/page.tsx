"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Save, 
  Mail, 
  Phone, 
  MapPin,
  Briefcase
} from 'lucide-react';
import api from '@/lib/axios';

interface Supplier {
  supplier_id: number;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function DealsPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  // Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [activeModal, setActiveModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

const MOCK_SUPPLIERS: Supplier[] = [
  { supplier_id: 1, name: 'Hemas Pharmaceuticals', contact_person: 'Mr. Anura Perera', email: 'info@hemas.com', phone: '+94112345678', address: '75, Braybrooke Place, Colombo 2' },
  { supplier_id: 2, name: 'CIC Holdings', contact_person: 'Mrs. Sanduni Silva', email: 'sales@cic.lk', phone: '+94114567890', address: '199, Kew Road, Colombo 2' },
  { supplier_id: 3, name: 'Sunshine Healthcare', contact_person: 'Mr. Roshan Fernando', email: 'sunshine@healthcare.lk', phone: '+94117890123', address: '45, Dharmapala Mawatha, Colombo 7' },
  { supplier_id: 4, name: 'Morison PLC', contact_person: 'Mr. Dinesh Gunawardena', email: 'info@morison.lk', phone: '+94111234567', address: '620, Biyagama Road, Piliyandala' },
  { supplier_id: 5, name: 'State Pharmaceuticals Corporation', contact_person: 'Mrs. Priyanthi Alwis', email: 'spchq@spc.lk', phone: '+94112439533', address: '75, Sir Baron Jayatilaka Mawatha, Colombo 1' }
];

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: itemsPerPage
      };

      const res = await api.get('/api/v1/dispenser/suppliers', { params });
      if (res.data && res.data.success) {
        // Since backend listSuppliers returns { data: items, meta: ... }
        const result = res.data.data || {};
        let items = result.data || [];
        
        // Fallback locally if empty from server
        if (items.length === 0) {
          items = [...MOCK_SUPPLIERS];
        }

        // Filter locally if searchTerm is provided
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          items = items.filter((s: Supplier) => 
            s.name.toLowerCase().includes(term) || 
            (s.contact_person && s.contact_person.toLowerCase().includes(term))
          );
        }

        setSuppliers(items);
        const meta = result.meta || {};
        setTotalPages(Math.ceil((items.length || 0) / itemsPerPage) || 1);
        setTotalItems(items.length || 0);
      }
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
      showToast("Error fetching suppliers. Loading offline mock directory.");
      
      let items = [...MOCK_SUPPLIERS];
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        items = items.filter((s: Supplier) => 
          s.name.toLowerCase().includes(term) || 
          (s.contact_person && s.contact_person.toLowerCase().includes(term))
        );
      }
      setSuppliers(items);
      setTotalPages(Math.ceil(items.length / itemsPerPage) || 1);
      setTotalItems(items.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSuppliers();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchSuppliers();
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: ''
    });
    setActiveModal('add');
  };

  const openEditModal = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      contact_person: supplier.contact_person || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || ''
    });
    setActiveModal('edit');
  };

  const openDeleteModal = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setActiveModal('delete');
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/v1/dispenser/suppliers', formData);
      if (res.data && res.data.success) {
        showToast("Dealer created successfully!");
        setActiveModal(null);
        fetchSuppliers();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to create dealer");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplier) return;
    try {
      const res = await api.put(`/api/v1/dispenser/suppliers/${selectedSupplier.supplier_id}`, formData);
      if (res.data && res.data.success) {
        showToast("Dealer details updated!");
        setActiveModal(null);
        fetchSuppliers();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to update dealer");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSupplier) return;
    try {
      const res = await api.delete(`/api/v1/dispenser/suppliers/${selectedSupplier.supplier_id}`);
      if (res.data && res.data.success) {
        showToast("Dealer deleted successfully!");
        setActiveModal(null);
        fetchSuppliers();
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to delete dealer");
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
          <h1 className="text-2xl font-bold text-gray-900">Deals / Dealers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage wholesale dealers, contact persons, and supplier directories.</p>
        </div>
        <div className="text-xs text-gray-400">
          Home &gt; <span className="text-gray-600 font-medium">Deals / Dealers</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Dealers */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Users className="text-gray-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">TOTAL REGISTERED DEALERS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{totalItems}</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Active Partners</span>
          </div>
        </div>

        {/* Contact Persons */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Briefcase className="text-indigo-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider">KEY REPRESENTATIVES</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">
              {suppliers.filter(s => s.contact_person).length}
            </p>
            <span className="text-[10px] text-gray-400 mt-1 block">Direct Contacts</span>
          </div>
        </div>

        {/* Located cities */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <MapPin className="text-emerald-600" size={20} />
          </div>
          <div>
            <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">SUPPLY LOCATIONS</span>
            <p className="text-2xl font-bold text-gray-900 leading-none mt-1">
              {new Set(suppliers.map(s => s.address ? s.address.split(',').pop()?.trim() : '').filter(Boolean)).size || 1}
            </p>
            <span className="text-[10px] text-gray-400 mt-1 block">Distribution Cities</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Term */}
          <div className="md:col-span-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">SEARCH</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search dealer or contact name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white"
              />
            </div>
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
          <h3 className="text-base font-bold text-gray-800">Supplier Directory Entries ({totalItems})</h3>
          <button 
            onClick={openAddModal}
            className="py-2.5 px-4 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-950 flex items-center gap-2 transition-all"
          >
            <Plus size={15} /> ADD NEW DEALER
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">DEALER NAME</th>
                <th className="px-4 py-3 font-medium">CONTACT PERSON</th>
                <th className="px-4 py-3 font-medium"><span className="flex items-center gap-1.5"><Mail size={13} /> EMAIL</span></th>
                <th className="px-4 py-3 font-medium"><span className="flex items-center gap-1.5"><Phone size={13} /> PHONE</span></th>
                <th className="px-4 py-3 font-medium"><span className="flex items-center gap-1.5"><MapPin size={13} /> ADDRESS</span></th>
                <th className="px-4 py-3 font-medium text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {suppliers.length > 0 ? (
                suppliers.map((s, index) => (
                  <tr key={s.supplier_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-4 text-gray-700 font-semibold">{s.contact_person || 'N/A'}</td>
                    <td className="px-4 py-4 text-gray-600">{s.email || 'N/A'}</td>
                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">{s.phone || 'N/A'}</td>
                    <td className="px-4 py-4 text-gray-500 text-xs truncate max-w-[200px]" title={s.address}>{s.address || 'N/A'}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openEditModal(s)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(s)}
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
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    {loading ? "Loading dealers directory..." : "No dealers registered in system."}
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

      {/* Modal 1: Add Dealer */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Register New Wholesaler / Dealer</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Company / Dealer Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Astrax Pharmacy Dealers"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Person Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={formData.contact_person} 
                    onChange={e => setFormData({...formData, contact_person: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. dealer@mail.com"
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +94771234567"
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Physical / Business Address</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. 45, Main Road, Colombo"
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
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

      {/* Modal 2: Edit Dealer */}
      {activeModal === 'edit' && selectedSupplier && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Edit Dealer Information</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Company / Dealer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Person Name</label>
                  <input 
                    type="text" 
                    value={formData.contact_person} 
                    onChange={e => setFormData({...formData, contact_person: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Physical / Business Address</label>
                  <textarea 
                    rows={2}
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 bg-white" 
                  />
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
      {activeModal === 'delete' && selectedSupplier && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-950">Delete Dealer</h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-gray-900">{selectedSupplier.name}</span>? This action soft-deletes the dealer record, and they will no longer be listed in suppliers fields or active stock transactions.
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
