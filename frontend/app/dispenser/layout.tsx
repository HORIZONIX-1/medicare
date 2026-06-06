import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  List, 
  Users, 
  BarChart2, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  ChevronDown,
  PlusSquare,
  Activity
} from 'lucide-react';

export default function DispenserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 font-bold">
              +
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-gray-800">MEDICAL CENTER</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Pharmacy</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem href="/dispenser" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          
          <div className="pt-2 pb-1">
            <NavItem href="/dispenser/prescriptions" icon={<FileText size={18} />} label="Prescriptions" hasSubmenu />
          </div>

          <div className="pt-2 pb-1">
            <NavItem href="/dispenser/stock-management" icon={<Package size={18} />} label="Stock Management" hasSubmenu />
          </div>

          <NavItem href="/dispenser/drug-list" icon={<List size={18} />} label="Drug List" />
          <NavItem href="/dispenser/deals" icon={<Users size={18} />} label="Deals / Dealers" />
          <NavItem href="/dispenser/reports" icon={<BarChart2 size={18} />} label="Reports" />
          <NavItem href="/dispenser/expiry-alerts" icon={<AlertTriangle size={18} />} label="Expiry Alerts" />
          <NavItem href="/dispenser/settings" icon={<Settings size={18} />} label="Settings" />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-gray-700 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <span className="text-sm font-medium text-gray-700">Dispenser</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ 
  href, 
  icon, 
  label, 
  active = false,
  hasSubmenu = false
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
}) {
  return (
    <Link 
      href={href} 
      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
        active 
          ? 'bg-gray-100 text-gray-900 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`${active ? 'text-gray-800' : 'text-gray-400'}`}>
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </div>
      {hasSubmenu && (
        <ChevronDown size={14} className="text-gray-400" />
      )}
    </Link>
  );
}
