"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Save, Calendar, Info, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function AddDrugStock() {
  const router = useRouter();

  // Input refs for date pickers
  const expiryInputRef = useRef<HTMLInputElement>(null);
  const lastSupplyInputRef = useRef<HTMLInputElement>(null);

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
        const drugsRes = await api.get('/drugs?limit=100').catch(() => api.get('/api/v1/drugs?limit=100'));
        const drugsList = drugsRes.data?.data || drugsRes.data || [];
        setPredefinedDrugs(Array.isArray(drugsList) ? drugsList : []);
      } catch (err) {
        console.error("Failed to load drugs list:", err);
      }

      try {
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

  const openDatePicker = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    try {
      if (inputRef.current && typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current?.focus();
      }
    } catch (e) {
      inputRef.current?.focus();
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.84375rem",
    fontWeight: 700,
    color: "#000000",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "0.625rem"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#ffffff",
    border: "1px solid #cbd1da",
    borderRadius: "0.75rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    color: "#000000",
    outline: "none"
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    MozAppearance: "none" as const,
    paddingRight: "3rem",
    cursor: "pointer"
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem", color: "#000000", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", borderBottom: "1px solid #cbd1da", paddingBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.84375rem", fontWeight: 700, color: "#000000", textTransform: "uppercase" }}>
          <Link href="/dispenser" style={{ color: "#000000", textDecoration: "none" }}>Dashboard</Link>
          <span>&gt;</span>
          <Link href="/dispenser/stock-management/table" style={{ color: "#000000", textDecoration: "none" }}>Stock Management</Link>
          <span>&gt;</span>
          <span>Add Drug Stock</span>
        </div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#000000", margin: 0 }}>Add / Edit Drug</h1>
        <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#000000", margin: 0 }}>Add a new drug stock to inventory or update existing drug details.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        
        {/* Left Column: Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          {/* Drug Information Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "0.375rem", height: "1rem", backgroundColor: "#2563eb", borderRadius: "9999px", display: "inline-block" }}></span>
              DRUG INFORMATION
            </h3>
            
            {/* Grid with Increased Row Gap */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "1.75rem", rowGap: "2.25rem" }}>
              
              <div>
                <label style={labelStyle}>
                  Select Predefined Catalog Item
                </label>
                <div style={{ position: "relative" }}>
                  <select 
                    value={selectedDrugId} 
                    onChange={handleDrugSelectChange}
                    style={selectStyle}
                  >
                    <option value="">-- Register New Drug --</option>
                    {predefinedDrugs.map((d: any) => (
                      <option key={d.drug_id} value={d.drug_id}>
                        {d.name} {d.dosage_type ? `(${d.dosage_type})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", pointerEvents: "none" }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Drug Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter drug name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={!!selectedDrugId}
                  required
                  style={inputStyle} 
                />
              </div>
              
              <div>
                <label style={labelStyle}>
                  Category <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    disabled={!!selectedDrugId}
                    style={selectStyle}
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Injection">Injection</option>
                  </select>
                  <ChevronDown size={18} style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", pointerEvents: "none" }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Unit Type <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select 
                    value={unitType}
                    onChange={e => setUnitType(e.target.value)}
                    disabled={!!selectedDrugId}
                    style={selectStyle}
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Tube">Tube</option>
                    <option value="Vial">Vial</option>
                    <option value="Ampoule">Ampoule</option>
                  </select>
                  <ChevronDown size={18} style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", pointerEvents: "none" }} />
                </div>
              </div>

              <div>
                <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  Strength 
                  <span title="Specify formulation dosage concentration, e.g. 500mg, 10ml.">
                    <Info size={14} style={{ color: "#000000" }} />
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., 500mg, 10ml" 
                  value={strength}
                  onChange={e => setStrength(e.target.value)}
                  disabled={!!selectedDrugId}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Batch Number
                </label>
                <input 
                  type="text" 
                  placeholder="Enter batch number" 
                  value={batchNumber}
                  onChange={e => setBatchNumber(e.target.value)}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Expiry Date
                </label>
                <div style={{ position: "relative" }}>
                  <input 
                    ref={expiryInputRef}
                    type="date" 
                    value={expiryDate}
                    onChange={e => setExpiryDate(e.target.value)}
                    onClick={() => openDatePicker(expiryInputRef)}
                    style={{ ...inputStyle, paddingRight: "3rem", cursor: "pointer" }} 
                  />
                  <Calendar 
                    size={18} 
                    onClick={() => openDatePicker(expiryInputRef)}
                    style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", cursor: "pointer", pointerEvents: "auto" }} 
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Manufactured By
                </label>
                <input 
                  type="text" 
                  placeholder="Enter manufacturer (optional)" 
                  value={manufacturedBy}
                  onChange={e => setManufacturedBy(e.target.value)}
                  style={inputStyle} 
                />
              </div>

              <div style={{ gridColumn: "span 2 / span 2" }}>
                <label style={labelStyle}>
                  Drug Description
                </label>
                <input 
                  type="text" 
                  placeholder="Enter description (optional)" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={inputStyle} 
                />
              </div>
            </div>
          </div>

          {/* Pricing Information Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "0.375rem", height: "1rem", backgroundColor: "#2563eb", borderRadius: "9999px", display: "inline-block" }}></span>
              PRICING INFORMATION
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", columnGap: "1.5rem", rowGap: "2rem" }}>
              <div>
                <label style={labelStyle}>
                  Buying Price (Cost) <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#000000", fontSize: "0.875rem", fontWeight: 700 }}>Rs.</span>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={buyingPrice}
                    onChange={e => setBuyingPrice(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingLeft: "2.75rem" }} 
                  />
                </div>
              </div>
              
              <div>
                <label style={labelStyle}>
                  Selling Price <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#000000", fontSize: "0.875rem", fontWeight: 700 }}>Rs.</span>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={sellingPrice}
                    onChange={e => setSellingPrice(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingLeft: "2.75rem" }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  Profit Percentage (%) 
                  <span title="Calculate selling price dynamically using profit percentage margins.">
                    <Info size={14} style={{ color: "#000000" }} />
                  </span>
                </label>
                <div style={{ position: "relative" }}>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={profitPercentage}
                    onChange={handleProfitChange}
                    style={{ ...inputStyle, paddingRight: "3rem" }} 
                  />
                  <span style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", fontSize: "0.875rem", fontWeight: 800 }}>%</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "#000000", marginTop: "0.375rem", fontWeight: 500 }}>(System will calculate selling price)</p>
              </div>
            </div>
          </div>

          {/* Initial Stock Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "0.375rem", height: "1rem", backgroundColor: "#2563eb", borderRadius: "9999px", display: "inline-block" }}></span>
              INITIAL STOCK
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "1.75rem", rowGap: "2rem" }}>
              <div>
                <label style={labelStyle}>
                  Initial Quantity <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter quantity" 
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  required
                  style={inputStyle} 
                />
              </div>
              
              <div>
                <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  Reorder Level 
                  <span title="Low stock alerts trigger when total inventory matches or drops below this quantity.">
                    <Info size={14} style={{ color: "#000000" }} />
                  </span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter reorder level" 
                  value={reorderLevel}
                  onChange={e => setReorderLevel(e.target.value)}
                  style={inputStyle} 
                />
              </div>
            </div>
            
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #cbd1da" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1.25rem", backgroundColor: "#f8fafc", border: "1px solid #cbd1da", borderRadius: "0.75rem", cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  id="predefined" 
                  checked={addToPredefined}
                  onChange={e => setAddToPredefined(e.target.checked)}
                  style={{ marginTop: "0.25rem", width: "1.125rem", height: "1.125rem", accentColor: "#2563eb", cursor: "pointer" }} 
                />
                <div>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000" }}>Add to predefined drug list</span>
                  <p style={{ fontSize: "0.8125rem", color: "#000000", marginTop: "0.25rem", fontWeight: 500 }}>Drug will be automatically available for prescription in the consultation suite.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Dealer & Supply Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          
          {/* Dealer Info Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "0.375rem", height: "1rem", backgroundColor: "#2563eb", borderRadius: "9999px", display: "inline-block" }}></span>
              DEALER INFORMATION
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <button 
                type="button"
                onClick={() => setDealerType('existing')}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #cbd1da",
                  fontSize: "0.84375rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  backgroundColor: dealerType === 'existing' ? "#eff6ff" : "#ffffff",
                  color: dealerType === 'existing' ? "#1d4ed8" : "#000000"
                }}
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
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #cbd1da",
                  fontSize: "0.84375rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  backgroundColor: dealerType === 'new' ? "#eff6ff" : "#ffffff",
                  color: dealerType === 'new' ? "#1d4ed8" : "#000000"
                }}
              >
                New Dealer
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {dealerType === 'existing' ? (
                <div>
                  <label style={labelStyle}>
                    Dealer Name <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select 
                      value={dealerId}
                      onChange={handleDealerSelectChange}
                      required
                      style={selectStyle}
                    >
                      <option value="">Select dealer</option>
                      {dealers.map((d: any) => (
                        <option key={d.supplier_id} value={d.supplier_id}>{d.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", pointerEvents: "none" }} />
                  </div>
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>
                    Dealer Name <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter new dealer name" 
                    value={newDealerName}
                    onChange={e => setNewDealerName(e.target.value)}
                    required
                    style={inputStyle} 
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>
                  Contact Person
                </label>
                <input 
                  type="text" 
                  placeholder="Enter contact person" 
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  disabled={dealerType === 'existing'}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Phone
                </label>
                <input 
                  type="text" 
                  placeholder="Enter phone number" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={dealerType === 'existing'}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Email
                </label>
                <input 
                  type="text" 
                  placeholder="Enter email address" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={dealerType === 'existing'}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Address
                </label>
                <textarea 
                  placeholder="Enter dealer address" 
                  rows={2} 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  disabled={dealerType === 'existing'}
                  style={{ ...inputStyle, resize: "none" }}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Recent Supply Info Card */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "0.375rem", height: "1rem", backgroundColor: "#2563eb", borderRadius: "9999px", display: "inline-block" }}></span>
              RECENT SUPPLY (OPTIONAL)
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div>
                <label style={labelStyle}>
                  Last Supply Date
                </label>
                <div style={{ position: "relative" }}>
                  <input 
                    ref={lastSupplyInputRef}
                    type="date" 
                    value={lastSupplyDate}
                    onChange={e => setLastSupplyDate(e.target.value)}
                    onClick={() => openDatePicker(lastSupplyInputRef)}
                    style={{ ...inputStyle, paddingRight: "3rem", cursor: "pointer" }} 
                  />
                  <Calendar 
                    size={18} 
                    onClick={() => openDatePicker(lastSupplyInputRef)}
                    style={{ position: "absolute", right: "1.25rem", top: "50%", transform: "translateY(-50%)", color: "#000000", cursor: "pointer", pointerEvents: "auto" }} 
                  />
                </div>
              </div>
              
              <div>
                <label style={labelStyle}>
                  Invoice / Reference No.
                </label>
                <input 
                  type="text" 
                  placeholder="Enter invoice reference" 
                  value={invoiceNo}
                  onChange={e => setInvoiceNo(e.target.value)}
                  style={inputStyle} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", paddingTop: "1.5rem", borderTop: "1px solid #cbd1da" }}>
        <button 
          type="button" 
          onClick={() => router.push('/dispenser/stock-management/table')}
          style={{ padding: "0.75rem 1.5rem", border: "1px solid #cbd1da", color: "#000000", backgroundColor: "#ffffff", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}
        >
          CANCEL
        </button>
        <button 
          type="button" 
          onClick={handleReset}
          style={{ padding: "0.75rem 1.5rem", border: "1px solid #cbd1da", color: "#000000", backgroundColor: "#ffffff", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}
        >
          RESET
        </button>
        <button 
          type="submit" 
          disabled={submitting}
          style={{ padding: "0.75rem 2rem", backgroundColor: "#000000", color: "#ffffff", border: "1px solid #000000", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Save size={18} style={{ color: "#ffffff" }} /> 
          <span style={{ color: "#ffffff" }}>{submitting ? 'SAVING...' : 'SAVE DRUG STOCK'}</span>
        </button>
      </div>
    </form>
  );
}
