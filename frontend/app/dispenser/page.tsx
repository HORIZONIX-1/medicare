"use client";

import React from 'react';
import { Pill, CheckCircle, AlertCircle, HelpCircle, Plus, Edit, Table, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DispenserDashboard() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div>
        <h1 className="dr-page-title" style={{ fontSize: "1.75rem" }}>Dashboard</h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "4px" }}>Welcome back, Pharmacy Dispenser</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        <StatCard 
          icon={<Pill size={22} className="text-blue-600" />} 
          title="TOTAL DRUG TYPES" 
          value="120" 
          subtitle="All drugs in system"
          bgColor="#eff6ff"
        />
        <StatCard 
          icon={<CheckCircle size={22} className="text-green-600" />} 
          title="IN-STOCK TYPES" 
          value="95" 
          subtitle="Sufficient stock"
          bgColor="#f0fdf4"
        />
        <StatCard 
          icon={<AlertCircle size={22} className="text-amber-600" />} 
          title="LOW STOCK TYPES" 
          value="20" 
          subtitle="Below reorder level"
          bgColor="#fffbeb"
        />
        <StatCard 
          icon={<HelpCircle size={22} className="text-rose-600" />} 
          title="OUT OF STOCK TYPES" 
          value="5" 
          subtitle="Stock is zero"
          bgColor="#fef2f2"
        />
      </div>

      {/* Alerts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "2rem" }}>
        {/* Low Stock Alerts */}
        <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 className="white-card-section-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}>
              <AlertCircle size={18} className="text-amber-500" /> 
              <span>Low Stock Alerts</span>
            </h3>
            <Link href="/dispenser/stock-management/table" className="btn-light-outline" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>
              <span>View All</span>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <AlertItem name="Paracetamol 500mg (Tablet)" details="Qty: 10 (Reorder: 20)" />
            <AlertItem name="Amoxicillin 250mg (Capsule)" details="Qty: 12 (Reorder: 20)" />
            <AlertItem name="Cetrizine 10mg (Tablet)" details="Qty: 8 (Reorder: 15)" />
            <AlertItem name="Cough Syrup 100ml" details="Qty: 5 (Reorder: 10)" />
          </div>
        </div>

        {/* Expiry Alerts */}
        <div className="white-card" style={{ padding: "2rem", marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 className="white-card-section-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem" }}>
              <AlertCircle size={18} className="text-red-500" /> 
              <span>Expiry Alerts</span>
            </h3>
            <Link href="/dispenser/expiry-alerts" className="btn-light-outline" style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}>
              <span>View All</span>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <AlertItem name="Cough Syrup 100ml" details="Expires in 20 days (2024-06-09)" isDanger={true} />
            <AlertItem name="Amoxicillin 250mg (Capsule)" details="Expires in 25 days (2024-06-14)" isDanger={true} />
            <AlertItem name="Ibuprofen 400mg (Tablet)" details="Expires in 30 days (2024-06-19)" isDanger={true} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="white-card-section-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", color: "#475569" }}>
          <span>⚡ QUICK ACTIONS</span>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          <QuickActionCard 
            icon={<Plus size={18} className="text-blue-600" />} 
            title="ADD DRUG STOCK" 
            desc="Add new stock to inventory" 
            href="/dispenser/stock-management/add"
          />
          <QuickActionCard 
            icon={<Edit size={18} className="text-indigo-600" />} 
            title="MANAGE DRUG LIST" 
            desc="Edit / Delete drug details" 
            href="/dispenser/drug-list"
          />
          <QuickActionCard 
            icon={<Table size={18} className="text-emerald-600" />} 
            title="VIEW STOCK TABLE" 
            desc="View all stock & details" 
            href="/dispenser/stock-management/table"
          />
          <QuickActionCard 
            icon={<Users size={18} className="text-purple-600" />} 
            title="DEALERS" 
            desc="View dealer details & contact" 
            href="/dispenser/deals"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="white-card" style={{ padding: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 className="white-card-title" style={{ fontSize: "1.25rem" }}>Recent Activity</h3>
          <button className="btn-light-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.75rem" }}>View All</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <ActivityItem 
            text="Added new stock for Paracetamol 500mg (Batch: B123)" 
            user="By Dispenser" 
            time="Today, 10:30 AM" 
          />
          <ActivityItem 
            text="Dispensed prescription #P000123 (Kamal Perera)" 
            user="By Dispenser" 
            time="Today, 09:15 AM" 
          />
          <ActivityItem 
            text="Updated stock for Amoxicillin 250mg (Batch: B555)" 
            user="By Dispenser" 
            time="Yesterday, 04:45 PM" 
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, bgColor, styleColor }: any) {
  return (
    <div className="white-card" style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.5rem 1.75rem", marginBottom: 0 }}>
      <div style={{ 
        width: "3rem", 
        height: "3rem", 
        borderRadius: "9999px", 
        backgroundColor: styleColor || bgColor, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexShrink: 0 
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.6875rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>{title}</p>
        <p style={{ fontSize: "1.625rem", fontWeight: 800, color: "#0f172a", marginTop: "2px", lineHeight: 1.15 }}>{value}</p>
        <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function AlertItem({ name, details, isDanger }: { name: string; details: string; isDanger?: boolean }) {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      padding: "0.875rem 1rem", 
      border: "1px solid #e2e8f0", 
      borderRadius: "0.5rem", 
      backgroundColor: "#f8fafc",
      cursor: "pointer"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: isDanger ? "#ef4444" : "#f59e0b" }}></div>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>{name}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{details}</span>
        <ArrowRight size={14} className="text-gray-400" />
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, href }: any) {
  return (
    <Link 
      href={href || "#"} 
      className="white-card hover-card"
      style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "1.25rem", 
        padding: "1.25rem 1.5rem", 
        marginBottom: 0,
        textDecoration: "none"
      }}
    >
      <div style={{ 
        width: "2.75rem", 
        height: "2.75rem", 
        borderRadius: "0.5rem", 
        backgroundColor: "#f8fafc", 
        border: "1px solid #e2e8f0", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexShrink: 0 
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#0f172a" }}>{title}</p>
        <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{desc}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ text, user, time }: any) {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "flex-start", 
      paddingBottom: "1rem", 
      borderBottom: "1px solid #f1f5f9"
    }}>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <div style={{ marginTop: "6px", width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "#cbd5e1", flexShrink: 0 }}></div>
        <p style={{ fontSize: "0.875rem", color: "#334155", fontWeight: 500 }}>{text}</p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{user}</p>
        <p style={{ fontSize: "0.6875rem", color: "#94a3b8", marginTop: "2px" }}>{time}</p>
      </div>
    </div>
  );
}
