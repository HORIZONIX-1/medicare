import React from 'react';
import { Pill, CheckCircle, AlertCircle, HelpCircle, Plus, Edit, Table, Users } from 'lucide-react';
import Link from 'next/link';

export default function DispenserDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Dispenser</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          icon={<Pill className="text-blue-500" />} 
          title="TOTAL DRUG TYPES" 
          value="120" 
          subtitle="All drugs in system"
          bgColor="bg-blue-50"
        />
        <StatCard 
          icon={<CheckCircle className="text-green-500" />} 
          title="IN-STOCK TYPES" 
          value="95" 
          subtitle="Sufficient stock"
          bgColor="bg-green-50"
        />
        <StatCard 
          icon={<AlertCircle className="text-orange-500" />} 
          title="LOW STOCK TYPES" 
          value="20" 
          subtitle="Below reorder level"
          bgColor="bg-orange-50"
        />
        <StatCard 
          icon={<HelpCircle className="text-gray-500" />} 
          title="OUT OF STOCK TYPES" 
          value="5" 
          subtitle="Stock is zero"
          bgColor="bg-gray-100"
        />
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase">
              <AlertCircle size={16} className="text-orange-500" /> Low Stock Alerts
            </h3>
            <button className="text-xs text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            <AlertItem name="Paracetamol 500mg (Tablet)" details="Qty: 10 (Reorder: 20)" />
            <AlertItem name="Amoxicillin 250mg (Capsule)" details="Qty: 12 (Reorder: 20)" />
            <AlertItem name="Cetrizine 10mg (Tablet)" details="Qty: 8 (Reorder: 15)" />
            <AlertItem name="Cough Syrup 100ml" details="Qty: 5 (Reorder: 10)" />
          </div>
        </div>

        {/* Expiry Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 uppercase">
              <AlertCircle size={16} className="text-red-500" /> Expiry Alerts
            </h3>
            <button className="text-xs text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            <AlertItem name="Cough Syrup 100ml" details="Expires in 20 days (2024-06-09)" />
            <AlertItem name="Amoxicillin 250mg (Capsule)" details="Expires in 25 days (2024-06-14)" />
            <AlertItem name="Ibuprofen 400mg (Tablet)" details="Expires in 30 days (2024-06-19)" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase mb-4 flex items-center gap-2">
          <span className="text-yellow-500">⚡</span> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <QuickActionCard 
            icon={<Plus className="text-gray-600" />} 
            title="ADD DRUG STOCK" 
            desc="Add new stock to inventory" 
            href="/dispenser/stock-management/add"
          />
          <QuickActionCard 
            icon={<Edit className="text-gray-600" />} 
            title="MANAGE DRUG LIST" 
            desc="Edit / Delete drug details" 
            href="/dispenser/drug-list"
          />
          <QuickActionCard 
            icon={<Table className="text-gray-600" />} 
            title="VIEW STOCK TABLE" 
            desc="View all stock & details" 
            href="/dispenser/stock-management/table"
          />
          <QuickActionCard 
            icon={<Users className="text-gray-600" />} 
            title="DEALERS" 
            desc="View dealer details & contact" 
            href="/dispenser/deals"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase">Recent Activity</h3>
          <button className="text-xs text-blue-600 hover:underline">View All</button>
        </div>
        <div className="space-y-4">
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

function StatCard({ icon, title, value, subtitle, bgColor }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function AlertItem({ name, details }: { name: string, details: string }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">{details}</span>
        <span className="text-gray-400">&gt;</span>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, href }: any) {
  return (
    <Link href={href || "#"} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left">
      <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800 uppercase">{title}</p>
        <p className="text-[10px] text-gray-500">{desc}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ text, user, time }: any) {
  return (
    <div className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex gap-3">
        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></div>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-500">{user}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}
