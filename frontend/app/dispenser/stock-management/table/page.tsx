"use client";

import React from 'react';
import { Search, Filter, RefreshCw, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function StockTable() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <h1 className="dr-page-title" style={{ fontSize: "1.75rem" }}>Stock Table</h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>View all drugs in inventory with stock status and details.</p>
      </div>

      <div className="white-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        {/* Filters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>SEARCH</span>
            <div style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "0.5rem", padding: "0 0.75rem", alignItems: "center", backgroundColor: "#ffffff" }}>
              <Search size={16} className="text-gray-400" style={{ marginRight: "0.5rem" }} />
              <input 
                type="text" 
                placeholder="Search drug name..." 
                style={{ border: "none", width: "100%", height: "38px", fontSize: "0.8125rem", outline: "none", color: "#0f172a" }}
              />
            </div>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>CATEGORY</span>
            <select className="light-select">
              <option>All Categories</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
            </select>
          </div>
          <div>
            <span style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "4px" }}>STATUS</span>
            <select className="light-select">
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
            <button className="btn-light-outline" style={{ flex: 1, height: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <Filter size={16} /> <span>FILTER</span>
            </button>
            <button className="btn-light-blue" style={{ flex: 1, height: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <RefreshCw size={16} /> <span>REFRESH</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "1.25rem 0", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.875rem" }}>
            <span style={{ fontWeight: 600, color: "#334155" }}>Total Drugs: <b style={{ color: "#0f172a" }}>120</b></span>
            <span style={{ color: "#e2e8f0" }}>|</span>
            <span style={{ fontWeight: 600, color: "#16a34a" }}>In Stock: <b>95</b></span>
            <span style={{ color: "#e2e8f0" }}>|</span>
            <span style={{ fontWeight: 600, color: "#ea580c" }}>Low Stock: <b>20</b></span>
            <span style={{ color: "#e2e8f0" }}>|</span>
            <span style={{ fontWeight: 600, color: "#dc2626" }}>Out of Stock: <b>5</b></span>
          </div>
          <Link href="/dispenser/stock-management/add" className="btn-light-blue" style={{ textDecoration: "none" }}>
            <Plus size={16} /> <span>ADD DRUG STOCK</span>
          </Link>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem", overflow: "hidden" }}>
          <table className="light-table" style={{ border: "none", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>DRUG NAME</th>
                <th>CATEGORY</th>
                <th>UNIT TYPE</th>
                <th style={{ width: "120px", textAlign: "center" }}>AVAILABLE QTY</th>
                <th style={{ width: "120px", textAlign: "center" }}>REORDER LEVEL</th>
                <th>BATCH NO.</th>
                <th>EXPIRY DATE</th>
                <th style={{ width: "120px", textAlign: "center" }}>STATUS</th>
                <th style={{ width: "100px", textAlign: "center" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem", fontSize: "0.8125rem", color: "#64748b" }}>
          <span>Showing 1 to 10 of 120 entries</span>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button className="btn-light-outline" style={{ padding: "0.35rem 0.65rem" }}>&lt;</button>
            <button className="btn-light-blue" style={{ padding: "0.35rem 0.875rem" }}>1</button>
            <button className="btn-light-outline" style={{ padding: "0.35rem 0.65rem" }}>2</button>
            <button className="btn-light-outline" style={{ padding: "0.35rem 0.65rem" }}>3</button>
            <span style={{ padding: "0.35rem 0.5rem" }}>...</span>
            <button className="btn-light-outline" style={{ padding: "0.35rem 0.65rem" }}>12</button>
            <button className="btn-light-outline" style={{ padding: "0.35rem 0.65rem" }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StockRow({ id, name, cat, unit, qty, reorder, batch, expiry, status }: any) {
  let statusBadgeColor = "#dbeafe";
  let statusTextColor = "#1e40af";
  let statusBorderColor = "#bfdbfe";

  if (status === "Low Stock") {
    statusBadgeColor = "#fffbeb";
    statusTextColor = "#b45309";
    statusBorderColor = "#fde68a";
  } else if (status === "Out of Stock") {
    statusBadgeColor = "#fef2f2";
    statusTextColor = "#b91c1c";
    statusBorderColor = "#fca5a5";
  }

  return (
    <tr>
      <td style={{ fontWeight: 700 }}>{id}</td>
      <td style={{ fontWeight: 700, color: "#0f172a" }}>{name}</td>
      <td>{cat}</td>
      <td>{unit}</td>
      <td style={{ textAlign: "center", fontWeight: 700, color: "#334155" }}>{qty}</td>
      <td style={{ textAlign: "center", color: "#64748b" }}>{reorder}</td>
      <td style={{ fontFamily: "monospace", color: "#64748b" }}>{batch}</td>
      <td>{expiry}</td>
      <td style={{ textAlign: "center" }}>
        <span style={{
          backgroundColor: statusBadgeColor,
          color: statusTextColor,
          borderColor: statusBorderColor,
          borderWidth: "1px",
          borderStyle: "solid",
          fontSize: "0.6875rem",
          fontWeight: 700,
          padding: "0.2rem 0.6rem",
          borderRadius: "9999px",
          textTransform: "uppercase"
        }}>
          {status}
        </span>
      </td>
      <td>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button className="btn-light-outline" style={{ padding: "0.35rem 0.5rem" }}>
            <Edit size={13} />
          </button>
          <button className="btn-light-outline" style={{ padding: "0.35rem 0.5rem", color: "#ef4444", borderColor: "#fca5a5" }}>
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
