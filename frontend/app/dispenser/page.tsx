"use client";

import React, { useState, useEffect } from 'react';
import { Pill, CheckCircle, AlertCircle, HelpCircle, Plus, Edit, Table, Users, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  bgColor: string;
}

interface AlertItemProps {
  name: string;
  details: string;
  isDanger?: boolean;
}

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}

interface ActivityItemProps {
  text: string;
  user: string;
  time: string;
}

export default function DispenserDashboard() {
  const [stats, setStats] = useState({
    totalTypes: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const [lowStockAlerts, setLowStockAlerts] = useState<any[]>([]);
  const [expiryAlerts, setExpiryAlerts] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get('/api/v1/dispenser/dashboard/stats').catch(() => api.get('/dispenser/dashboard/stats'));
      if (statsRes.data && statsRes.data.success) {
        const d = statsRes.data.data;
        setStats({
          totalTypes: d.totalTypes || 0,
          inStock: d.inStock || 0,
          lowStock: d.lowStock || 0,
          outOfStock: d.outOfStock || 0
        });
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    }

    try {
      const lowStockRes = await api.get('/api/v1/dispenser/alerts/low-stock?limit=4').catch(() => api.get('/dispenser/alerts/low-stock?limit=4'));
      const list = lowStockRes.data?.data || lowStockRes.data || [];
      setLowStockAlerts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load low stock alerts:", err);
    }

    try {
      const expiryRes = await api.get('/api/v1/dispenser/alerts/expiry?daysThreshold=90&limit=3').catch(() => api.get('/dispenser/alerts/expiry?daysThreshold=90&limit=3'));
      const list = expiryRes.data?.data || expiryRes.data || [];
      setExpiryAlerts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load expiry alerts:", err);
    }

    try {
      const movementRes = await api.get('/api/v1/dispenser/reports/movement?limit=3').catch(() => api.get('/dispenser/reports/movement?limit=3'));
      const logList = movementRes.data?.data || movementRes.data || [];
      setRecentActivities(Array.isArray(logList) ? logList : []);
    } catch (err) {
      console.error("Failed to load activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatActivityText = (log: any) => {
    const action = log.action;
    const meta = log.metadata || {};
    const batchId = log.entity_id || 'N/A';

    if (action === 'ADJUST_STOCK') {
      const type = meta.adjustmentType === 'ADD' ? 'Added' : 'Deducted';
      return `${type} ${meta.quantity || 0} unit(s) of drug stock (Batch #${batchId}) - ${meta.reason || ''}`;
    }
    if (action === 'TRANSFER_STOCK') {
      return `Transferred ${meta.quantity || 0} unit(s) of drug stock from Batch #${batchId} to Batch #${meta.toBatchId}`;
    }
    if (action === 'UPDATE_PRICE') {
      return `Updated price parameters for drug Batch #${batchId}`;
    }
    if (action === 'CREATE') {
      return `Initialized new stock batch entry #${batchId} with ${meta.quantity || 0} units`;
    }
    if (action === 'UPDATE') {
      return `Modified configuration details for stock Batch #${batchId}`;
    }
    if (action === 'DELETE') {
      return `Deleted drug stock Batch #${batchId} from active inventory database`;
    }
    return `System audit log entry registered: ${action} on entity ${log.entity} #${batchId}`;
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem", color: "#0f172a", fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.125rem", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.025em", margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#334155", marginTop: "0.375rem" }}>Welcome back, Pharmacy Dispenser. Here's a live overview of center stock.</p>
        </div>
        <button 
          onClick={loadDashboardData}
          style={{ padding: "0.625rem 0.75rem", border: "1px solid #cbd1da", backgroundColor: "#ffffff", color: "#111827", borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}
          title="Reload Dashboard"
        >
          <Clock size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Stats Cards - 2 Columns x 2 Rows Inline Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
        <StatCard 
          icon={<Pill size={24} style={{ color: "#2563eb" }} />} 
          title="TOTAL DRUG TYPES" 
          value={stats.totalTypes} 
          subtitle="All active drugs in catalog"
          bgColor="#eff6ff"
        />
        <StatCard 
          icon={<CheckCircle size={24} style={{ color: "#059669" }} />} 
          title="IN-STOCK TYPES" 
          value={stats.inStock} 
          subtitle="Sufficient inventory margin"
          bgColor="#f0fdf4"
        />
        <StatCard 
          icon={<AlertCircle size={24} style={{ color: "#d97706" }} />} 
          title="LOW STOCK TYPES" 
          value={stats.lowStock} 
          subtitle="Below reorder warning line"
          bgColor="#fffbeb"
        />
        <StatCard 
          icon={<HelpCircle size={24} style={{ color: "#e11d48" }} />} 
          title="OUT OF STOCK TYPES" 
          value={stats.outOfStock} 
          subtitle="Stock is completely depleted"
          bgColor="#fef2f2"
        />
      </div>

      {/* Alerts Section */}
      <div>
        <h3 style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>🔔 ALERTS</span>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
          {/* Low Stock Alerts */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                <AlertCircle size={20} style={{ color: "#d97706" }} /> 
                <span>Low Stock Alerts</span>
              </h3>
              <Link 
                href="/dispenser/stock-management/table" 
                style={{ padding: "0.4375rem 0.875rem", border: "1px solid #cbd1da", color: "#111827", backgroundColor: "#ffffff", borderRadius: "0.75rem", fontSize: "0.8125rem", fontWeight: 800, textDecoration: "none" }}
              >
                View All
              </Link>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {lowStockAlerts.length > 0 ? (
                lowStockAlerts.map((item, idx) => (
                  <AlertItem 
                    key={idx}
                    name={item.name} 
                    details={`Qty: ${item.total_qty} (Reorder: ${item.reorder_level})`} 
                  />
                ))
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 0", textAlign: "center", color: "#475569", fontSize: "0.8125rem", fontWeight: 700 }}>
                  No low stock warnings. Everything looks healthy!
                </div>
              )}
            </div>
          </div>

          {/* Expiry Alerts */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
                <AlertCircle size={20} style={{ color: "#e11d48" }} /> 
                <span>Expiry Alerts (Next 90 Days)</span>
              </h3>
              <Link 
                href="/dispenser/expiry-alerts" 
                style={{ padding: "0.4375rem 0.875rem", border: "1px solid #cbd1da", color: "#111827", backgroundColor: "#ffffff", borderRadius: "0.75rem", fontSize: "0.8125rem", fontWeight: 800, textDecoration: "none" }}
              >
                View All
              </Link>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {expiryAlerts.length > 0 ? (
                expiryAlerts.map((item, idx) => (
                  <AlertItem 
                    key={idx}
                    name={item.name} 
                    details={`Expires in ${item.days_left} days (${new Date(item.expiry_date).toLocaleDateString()})`} 
                    isDanger={item.days_left <= 30}
                  />
                ))
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 0", textAlign: "center", color: "#475569", fontSize: "0.8125rem", fontWeight: 700 }}>
                  No batches nearing expiry within the next 90 days.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Inline Grid */}
      <div>
        <h3 style={{ fontSize: "0.8125rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>⚡ QUICK ACTIONS</span>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.5rem" }}>
          <QuickActionCard 
            icon={<Plus size={20} style={{ color: "#2563eb" }} />} 
            title="ADD DRUG STOCK" 
            desc="Add new stock to inventory" 
            href="/dispenser/stock-management/add"
          />
          <QuickActionCard 
            icon={<Edit size={20} style={{ color: "#4f46e5" }} />} 
            title="MANAGE DRUG LIST" 
            desc="Edit / Delete drug details" 
            href="/dispenser/drug-list"
          />
          <QuickActionCard 
            icon={<Table size={20} style={{ color: "#059669" }} />} 
            title="VIEW STOCK TABLE" 
            desc="View all stock & details" 
            href="/dispenser/stock-management/table"
          />
          <QuickActionCard 
            icon={<Users size={20} style={{ color: "#9333ea" }} />} 
            title="DEALERS" 
            desc="View dealer details & contact" 
            href="/dispenser/deals"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Activity</h3>
          <Link 
            href="/dispenser/stock-management/log"
            style={{ padding: "0.4375rem 0.9375rem", border: "1px solid #cbd1da", color: "#111827", backgroundColor: "#ffffff", borderRadius: "0.75rem", fontSize: "0.8125rem", fontWeight: 800, textDecoration: "none" }}
          >
            View All Audit Logs
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {recentActivities.length > 0 ? (
            recentActivities.map((log, index) => (
              <ActivityItem 
                key={log.audit_log_id || index}
                text={formatActivityText(log)} 
                user={log.actor_user_id === 1 || log.actor_user_id === null ? 'Dispenser' : `User #${log.actor_user_id}`} 
                time={new Date(log.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} 
              />
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0", color: "#475569", fontSize: "0.8125rem", fontWeight: 700 }}>
              No recent activity logs recorded in audit database.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

function StatCard({ icon, title, value, subtitle, bgColor }: StatCardProps) {
  return (
    <div style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.75rem" }}>
      <div 
        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{title}</p>
        <p style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.025em", margin: 0 }}>{value}</p>
        <p style={{ fontSize: "0.8125rem", color: "#334155", fontWeight: 700, margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function AlertItem({ name, details, isDanger }: AlertItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.125rem", border: "1px solid #cbd1da", borderRadius: "0.75rem", backgroundColor: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div style={{ width: "0.625rem", height: "0.625rem", borderRadius: "9999px", flexShrink: 0, backgroundColor: isDanger ? "#e11d48" : "#d97706" }}></div>
        <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#0f172a" }}>{name}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
        <span style={{ fontSize: "0.8125rem", color: "#334155", fontWeight: 700 }}>{details}</span>
        <ArrowRight size={16} style={{ color: "#475569" }} />
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, href }: QuickActionCardProps) {
  return (
    <Link 
      href={href} 
      style={{ backgroundColor: "#ffffff", border: "1px solid #d5d9e0", borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem 1.5rem", textDecoration: "none" }}
    >
      <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", backgroundColor: "#f1f5f9", border: "1px solid #cbd1da", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <p style={{ fontSize: "0.84375rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{title}</p>
        <p style={{ fontSize: "0.78125rem", color: "#334155", fontWeight: 700, lineHeight: 1.3, margin: 0 }}>{desc}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ text, user, time }: ActivityItemProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.25rem", padding: "0.875rem 0", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", gap: "0.875rem" }}>
        <div style={{ marginTop: "0.5rem", width: "0.4375rem", height: "0.4375rem", borderRadius: "9999px", backgroundColor: "#0f172a", flexShrink: 0 }}></div>
        <p style={{ fontSize: "0.9375rem", color: "#0f172a", fontWeight: 700, lineHeight: 1.4, margin: 0 }}>{text}</p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: "0.8125rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{user}</p>
        <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.1875rem", fontWeight: 700, margin: 0 }}>{time}</p>
      </div>
    </div>
  );
}
