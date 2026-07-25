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
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8 animate-in fade-in duration-500 text-[#0f172a]">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Dashboard</h1>
          <p className="text-sm font-semibold text-[#334155] mt-1">Welcome back, Pharmacy Dispenser. Here's a live overview of center stock.</p>
        </div>
        <button 
          onClick={loadDashboardData}
          className="p-2 border border-[#cbd1da] bg-white hover:bg-slate-100 text-[#111827] rounded-xl text-sm font-extrabold transition-all active:scale-[0.98]"
          title="Reload Dashboard"
        >
          <Clock size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Stats Cards - 2 Columns x 2 Rows */}
      <div className="disp-grid-2col">
        <StatCard 
          icon={<Pill size={22} className="text-blue-600" />} 
          title="TOTAL DRUG TYPES" 
          value={stats.totalTypes} 
          subtitle="All active drugs in catalog"
          bgColor="#eff6ff"
        />
        <StatCard 
          icon={<CheckCircle size={22} className="text-emerald-600" />} 
          title="IN-STOCK TYPES" 
          value={stats.inStock} 
          subtitle="Sufficient inventory margin"
          bgColor="#f0fdf4"
        />
        <StatCard 
          icon={<AlertCircle size={22} className="text-amber-600" />} 
          title="LOW STOCK TYPES" 
          value={stats.lowStock} 
          subtitle="Below reorder warning line"
          bgColor="#fffbeb"
        />
        <StatCard 
          icon={<HelpCircle size={22} className="text-rose-600" />} 
          title="OUT OF STOCK TYPES" 
          value={stats.outOfStock} 
          subtitle="Stock is completely depleted"
          bgColor="#fef2f2"
        />
      </div>

      {/* Alerts Section */}
      <div>
        <h3 className="text-xs font-extrabold text-[#475569] uppercase tracking-widest mb-4 flex items-center gap-2">
          <span>🔔 ALERTS</span>
        </h3>
        <div className="disp-grid-2col">
          {/* Low Stock Alerts */}
          <div className="bg-white border border-[#d5d9e0] rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-5 border-b border-[#e2e8f0] pb-3">
              <h3 className="text-sm font-extrabold text-[#0f172a] flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" /> 
                <span>Low Stock Alerts</span>
              </h3>
              <Link 
                href="/dispenser/stock-management/table" 
                className="px-3 py-1.5 border border-[#cbd1da] hover:border-[#111827] text-[#111827] hover:bg-slate-50 rounded-xl text-xs font-extrabold transition-all"
              >
                View All
              </Link>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {lowStockAlerts.length > 0 ? (
                lowStockAlerts.map((item, idx) => (
                  <AlertItem 
                    key={idx}
                    name={item.name} 
                    details={`Qty: ${item.total_qty} (Reorder: ${item.reorder_level})`} 
                  />
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center text-[#475569] text-xs font-bold">
                  No low stock warnings. Everything looks healthy!
                </div>
              )}
            </div>
          </div>

          {/* Expiry Alerts */}
          <div className="bg-white border border-[#d5d9e0] rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-5 border-b border-[#e2e8f0] pb-3">
              <h3 className="text-sm font-extrabold text-[#0f172a] flex items-center gap-2">
                <AlertCircle size={18} className="text-rose-600" /> 
                <span>Expiry Alerts (Next 90 Days)</span>
              </h3>
              <Link 
                href="/dispenser/expiry-alerts" 
                className="px-3 py-1.5 border border-[#cbd1da] hover:border-[#111827] text-[#111827] hover:bg-slate-50 rounded-xl text-xs font-extrabold transition-all"
              >
                View All
              </Link>
            </div>
            <div className="flex-1 flex flex-col gap-3">
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
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center text-[#475569] text-xs font-bold">
                  No batches nearing expiry within the next 90 days.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-extrabold text-[#475569] uppercase tracking-widest mb-4 flex items-center gap-2">
          <span>⚡ QUICK ACTIONS</span>
        </h3>
        <div className="disp-grid-2col">
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
      <div className="bg-white border border-[#d5d9e0] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-[#e2e8f0] pb-4">
          <h3 className="text-base font-extrabold text-[#0f172a]">Recent Activity</h3>
          <Link 
            href="/dispenser/stock-management/log"
            className="px-3.5 py-1.5 border border-[#cbd1da] hover:border-[#111827] text-[#111827] hover:bg-slate-50 rounded-xl text-xs font-extrabold transition-all"
          >
            View All Audit Logs
          </Link>
        </div>
        <div className="flex flex-col gap-4">
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
            <div className="text-center py-6 text-[#475569] text-xs font-bold">
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
    <div className="bg-white border border-[#d5d9e0] rounded-2xl flex items-center gap-5 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-extrabold text-[#475569] uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-[#0f172a] mt-0.5 leading-none tracking-tight">{value}</p>
        <p className="text-xs text-[#334155] mt-1 font-bold">{subtitle}</p>
      </div>
    </div>
  );
}

function AlertItem({ name, details, isDanger }: AlertItemProps) {
  return (
    <div className="flex items-center justify-between p-3.5 border border-[#cbd1da] rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${isDanger ? 'bg-rose-600 animate-pulse' : 'bg-amber-600'}`}></div>
        <span className="text-sm font-extrabold text-[#0f172a] group-hover:text-blue-600 transition-colors">{name}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-[#334155] font-bold">{details}</span>
        <ArrowRight size={14} className="text-[#475569] group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, href }: QuickActionCardProps) {
  return (
    <Link 
      href={href} 
      className="bg-white border border-[#d5d9e0] rounded-2xl flex items-center gap-4 p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-[0.98] group"
    >
      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-[#cbd1da] flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-[#0f172a] group-hover:text-blue-600 transition-colors">{title}</p>
        <p className="text-[11px] text-[#334155] mt-0.5 font-bold leading-tight">{desc}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ text, user, time }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-[#e2e8f0] last:border-b-0 last:pb-0">
      <div className="flex gap-3">
        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0f172a] shrink-0"></div>
        <p className="text-sm text-[#0f172a] font-bold leading-snug">{text}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-black text-[#0f172a]">{user}</p>
        <p className="text-[10px] text-[#475569] mt-0.5 font-bold">{time}</p>
      </div>
    </div>
  );
}
