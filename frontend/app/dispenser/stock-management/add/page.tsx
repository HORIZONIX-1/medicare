"use client";

import React, { useState, useEffect } from 'react';
import { Save, Calendar, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function AddDrugStock() {
  const router = useRouter();

  // Predefined catalog states
  const [predefinedDrugs, setPredefinedDrugs] = useState<any[]>([]);
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [selectedDrugId, setSelectedDrugId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tablet');
  const [unitType, setUnitType] = useState('Tablet');
  const [strength, setStrength] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [description, setDescription] = useState('');

  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [profitPercentage, setProfitPercentage] = useState('');

  const [quantity, setQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('10');
  const [addToPredefined, setAddToPredefined] = useState(true);

  const [dealerType, setDealerType] = useState<'existing' | 'new'>('existing');
  const [dealerId, setDealerId] = useState('');
  const [newDealerName, setNewDealerName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [lastSupplyDate, setLastSupplyDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');

  // Fetch catalog on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try fetching drugs (check /drugs and fall back to /api/v1/drugs)
        const drugsRes = await api.get('/drugs?limit=100').catch(() => api.get('/api/v1/drugs?limit=100'));
        const drugsList = drugsRes.data?.data || drugsRes.data || [];
        setPredefinedDrugs(Array.isArray(drugsList) ? drugsList : []);
      } catch (err) {
        console.error("Failed to load drugs list:", err);
      }

      try {
        // Try fetching suppliers (check dispenser specific endpoints)
        const suppliersRes = await api.get('/api/v1/dispenser/suppliers').catch(() => api.get('/dispenser/suppliers'));
        const suppliersList = suppliersRes.data?.data?.data || suppliersRes.data?.data || suppliersRes.data || [];
        setDealers(Array.isArray(suppliersList) ? suppliersList : []);
      } catch (err) {
        console.error("Failed to load suppliers:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Autofill fields when choosing a predefined drug
  const handleDrugSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedDrugId(val);
    if (val) {
      const drug = predefinedDrugs.find((d: any) => d.drug_id.toString() === val);
      if (drug) {
        setName(drug.name || '');
        setCategory(drug.category || 'Tablet');
        setUnitType(drug.unit_type || 'Tablet');
        setStrength(drug.dosage_type || '');
        setSellingPrice(drug.selling_price?.toString() || '');
        setReorderLevel(drug.reorder_level?.toString() || '10');
      }
    } else {
      setName('');
      setCategory('Tablet');
      setUnitType('Tablet');
      setStrength('');
      setSellingPrice('');
      setReorderLevel('10');
    }
  };

  // Autofill supplier details when selecting an existing dealer
  const handleDealerSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDealerId(val);
    if (val) {
      const dealer = dealers.find((d: any) => d.supplier_id.toString() === val);
      if (dealer) {
        setContactPerson(dealer.contact_name || '');
        setPhone(dealer.phone || '');
        setEmail(dealer.email || '');
        setAddress(dealer.address || '');
      }
    } else {
      setContactPerson('');
      setPhone('');
      setEmail('');
      setAddress('');
    }
  };

  // Reset form helper
  const handleReset = () => {
    setSelectedDrugId('');
    setName('');
    setCategory('Tablet');
    setUnitType('Tablet');
    setStrength('');
    setBatchNumber('');
    setExpiryDate('');
    setManufacturedBy('');
    setDescription('');
    setBuyingPrice('');
    setSellingPrice('');
    setProfitPercentage('');
    setQuantity('');
    setReorderLevel('10');
    setAddToPredefined(true);
    setDealerType('existing');
    setDealerId('');
    setNewDealerName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setAddress('');
    setLastSupplyDate('');
    setInvoiceNo('');
  };

  // Calculate prices dynamically if profit percentage changes
  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profit = e.target.value;
    setProfitPercentage(profit);
    const cost = parseFloat(buyingPrice);
    const margin = parseFloat(profit);
    if (cost && margin) {
      const calculated = cost + (cost * margin) / 100;
      setSellingPrice(calculated.toFixed(2));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let drugId = selectedDrugId;

      // 1. Create drug if it's a new one and "Add to predefined list" is checked
      if (!selectedDrugId) {
        if (!name.trim()) {
          alert("Drug Name is required.");
          setSubmitting(false);
          return;
        }

        const drugPayload = {
          name,
          category,
          unit_type: unitType,
          dosage_type: strength,
          selling_price: parseFloat(sellingPrice) || 0,
          reorder_level: parseInt(reorderLevel, 10) || 10
        };

        const newDrugRes = await api.post('/drugs', drugPayload).catch(() => api.post('/api/v1/drugs', drugPayload));
        const newDrug = newDrugRes.data?.data || newDrugRes.data;
        if (newDrug && newDrug.drug_id) {
          drugId = newDrug.drug_id.toString();
        }
      }

      if (!drugId) {
        alert("Failed to find or register drug in system catalog.");
        setSubmitting(false);
        return;
      }

      // 2. If it's a new supplier, register them first
      let finalSupplierId = dealerId ? parseInt(dealerId, 10) : null;
      if (dealerType === 'new' && newDealerName.trim()) {
        const supplierPayload = {
          name: newDealerName,
          contact_name: contactPerson,
          phone,
          email,
          address
        };

        const newSupplierRes = await api.post('/api/v1/dispenser/suppliers', supplierPayload).catch(() => api.post('/dispenser/suppliers', supplierPayload));
        const newSupplier = newSupplierRes.data?.data || newSupplierRes.data;
        if (newSupplier && newSupplier.supplier_id) {
          finalSupplierId = newSupplier.supplier_id;
        }
      }

      // 3. Create stock batch entry
      const stockPayload = {
        drug_id: parseInt(drugId, 10),
        batch_number: batchNumber || null,
        expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null,
        quantity: parseInt(quantity, 10) || 0,
        buying_price: parseFloat(buyingPrice) || 0,
        selling_price: parseFloat(sellingPrice) || 0,
        supplier_id: finalSupplierId,
        status: 'ACTIVE'
      };

      await api.post('/stock', stockPayload).catch(() => api.post('/api/v1/stock', stockPayload));

      alert("Drug stock batch saved successfully!");
      router.push('/dispenser/stock-management/table');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save drug stock. Please check fields and make sure required values are supplied.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Link href="/dispenser" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span>&gt;</span>
            <Link href="/dispenser/stock-management/table" className="hover:text-slate-600 transition-colors">Stock Management</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Add Drug Stock</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Add / Edit Drug</h1>
          <p className="text-sm text-slate-500 mt-1">Add a new drug stock to inventory or update existing drug details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Drug Information */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
              DRUG INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Select Predefined Catalog Item
                </label>
                <select 
                  value={selectedDrugId} 
                  onChange={handleDrugSelectChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
                >
                  <option value="">-- Register New Drug --</option>
                  {predefinedDrugs.map((d: any) => (
                    <option key={d.drug_id} value={d.drug_id}>
                      {d.name} {d.dosage_type ? `(${d.dosage_type})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Drug Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter drug name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={!!selectedDrugId}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  disabled={!!selectedDrugId}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Inhaler">Inhaler</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Injection">Injection</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Unit Type <span className="text-red-500">*</span>
                </label>
                <select 
                  value={unitType}
                  onChange={e => setUnitType(e.target.value)}
                  disabled={!!selectedDrugId}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Tube">Tube</option>
                  <option value="Vial">Vial</option>
                  <option value="Ampoule">Ampoule</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  Strength 
                  <span className="text-slate-400 cursor-pointer hover:text-slate-600" title="Specify formulation dosage concentration, e.g. 500mg, 10ml.">
                    <Info size={12} />
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., 500mg, 10ml" 
                  value={strength}
                  onChange={e => setStrength(e.target.value)}
                  disabled={!!selectedDrugId}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Batch Number
                </label>
                <input 
                  type="text" 
                  placeholder="Enter batch number" 
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Expiry Date
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="YYYY-MM-DD" 
                    value={expiryDate}
                    onChange={e => setExpiryDate(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                  />
                  <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Manufactured By
                </label>
                <input 
                  type="text" 
                  placeholder="Enter manufacturer (optional)" 
                  value={manufacturedBy}
                  onChange={e => setManufacturedBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Drug Description
                </label>
                <input 
                  type="text" 
                  placeholder="Enter description (optional)" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
              PRICING INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Buying Price (Cost) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rs.</span>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={buyingPrice}
                    onChange={e => setBuyingPrice(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm font-semibold" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rs.</span>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={sellingPrice}
                    onChange={e => setSellingPrice(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm font-semibold" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  OR Profit Percentage (%) 
                  <span className="text-slate-400 cursor-pointer hover:text-slate-600" title="Calculate selling price dynamically using profit percentage margins.">
                    <Info size={12} />
                  </span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={profitPercentage}
                    onChange={handleProfitChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm font-semibold" 
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">%</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">(System will calculate selling price)</p>
              </div>
            </div>
          </div>

          {/* Initial Stock */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
              INITIAL STOCK
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Initial Quantity <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter quantity" 
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm font-semibold" 
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  Reorder Level 
                  <span className="text-slate-400 cursor-pointer hover:text-slate-600" title="Low stock alerts trigger when total inventory matches or drops below this quantity.">
                    <Info size={12} />
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter reorder level" 
                  value={reorderLevel}
                  onChange={e => setReorderLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm font-semibold" 
                />
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t border-slate-100">
              <label className="flex items-start gap-3 p-4 bg-blue-50/30 border border-blue-100/50 rounded-2xl transition-all hover:bg-blue-50/50 cursor-pointer group">
                <input 
                  type="checkbox" 
                  id="predefined" 
                  checked={addToPredefined}
                  onChange={e => setAddToPredefined(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-colors" 
                />
                <div>
                  <span className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors">Add to predefined drug list</span>
                  <p className="text-xs text-slate-500 mt-0.5">Drug will be automatically available for prescription in the consultation suite.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Dealer & Supply Info */}
        <div className="space-y-8">
          
          {/* Dealer Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
              DEALER INFORMATION
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button 
                type="button"
                onClick={() => setDealerType('existing')}
                className={`p-2.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  dealerType === 'existing' 
                    ? 'border-blue-100 bg-blue-50/30 text-blue-700' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Existing Dealer
              </button>
              <button 
                type="button"
                onClick={() => {
                  setDealerType('new');
                  setDealerId('');
                  setContactPerson('');
                  setPhone('');
                  setEmail('');
                  setAddress('');
                }}
                className={`p-2.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  dealerType === 'new' 
                    ? 'border-blue-100 bg-blue-50/30 text-blue-700' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                New Dealer
              </button>
            </div>

            <div className="space-y-4">
              {dealerType === 'existing' ? (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Dealer Name <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={dealerId}
                    onChange={handleDealerSelectChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 bg-white shadow-sm"
                  >
                    <option value="">Select dealer</option>
                    {dealers.map((d: any) => (
                      <option key={d.supplier_id} value={d.supplier_id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Dealer Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter new dealer name" 
                    value={newDealerName}
                    onChange={e => setNewDealerName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Contact Person
                </label>
                <input 
                  type="text" 
                  placeholder="Enter contact person" 
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  disabled={dealerType === 'existing'}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter phone number" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    disabled={dealerType === 'existing'}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={dealerType === 'existing'}
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Address
                </label>
                <textarea 
                  placeholder="Enter dealer address" 
                  rows={2} 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  disabled={dealerType === 'existing'}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Recent Supply Info */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
              RECENT SUPPLY (OPTIONAL)
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Last Supply Date
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="YYYY-MM-DD" 
                    value={lastSupplyDate}
                    onChange={e => setLastSupplyDate(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                  />
                  <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Invoice / Reference No.
                </label>
                <input 
                  type="text" 
                  placeholder="Enter invoice reference" 
                  value={invoiceNo}
                  onChange={e => setInvoiceNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400 shadow-sm" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6 border-t border-slate-100">
        <button 
          type="button" 
          onClick={() => router.push('/dispenser/stock-management/table')}
          className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all active:scale-[0.98]"
        >
          CANCEL
        </button>
        <button 
          type="button" 
          onClick={handleReset}
          className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all active:scale-[0.98]"
        >
          RESET
        </button>
        <button 
          type="submit" 
          disabled={submitting}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} /> 
          <span>{submitting ? 'SAVING...' : 'SAVE DRUG STOCK'}</span>
        </button>
      </div>
    </form>
  );
}
