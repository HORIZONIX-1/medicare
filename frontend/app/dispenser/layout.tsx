"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronDown
} from 'lucide-react';

export default function DispenserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isPrescriptionsActive = pathname?.startsWith('/dispenser/prescriptions');
  const isStockActive = pathname?.startsWith('/dispenser/stock-management');

  const [prescriptionsOpen, setPrescriptionsOpen] = React.useState(true);
  const [stockManagementOpen, setStockManagementOpen] = React.useState(true);

  const isActive = (href: string) => {
    if (href === '/dispenser') {
      return pathname === '/dispenser';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
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
          <NavItem href="/dispenser" icon={<LayoutDashboard size={18} />} label="Dashboard" active={isActive('/dispenser')} />
          
          {/* Prescriptions Collapsible */}
          <div className="pt-1">
            <button
              onClick={() => setPrescriptionsOpen(!prescriptionsOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                isPrescriptionsActive ? 'text-gray-900 font-medium' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className={isPrescriptionsActive ? 'text-gray-800' : 'text-gray-400'} />
                <span className="text-sm">Prescriptions</span>
              </div>
              <ChevronDown 
                size={14} 
                className={`text-gray-400 transition-transform duration-200 ${prescriptionsOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {prescriptionsOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <SubNavItem 
                  href="/dispenser/prescriptions/dispensing-queue" 
                  label="Dispensing Queue" 
                  active={pathname === '/dispenser/prescriptions/dispensing-queue'} 
                  showDot={true}
                />
                <SubNavItem 
                  href="/dispenser/prescriptions/dispensing-history" 
                  label="Dispensing History" 
                  active={pathname === '/dispenser/prescriptions/dispensing-history'} 
                  showDot={true}
                />
              </div>
            )}
          </div>

          {/* Stock Management Collapsible */}
          <div className="pt-1">
            <button
              onClick={() => setStockManagementOpen(!stockManagementOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
                isStockActive ? 'text-gray-900 font-medium' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={18} className={isStockActive ? 'text-gray-800' : 'text-gray-400'} />
                <span className="text-sm">Stock Management</span>
              </div>
              <ChevronDown 
                size={14} 
                className={`text-gray-400 transition-transform duration-200 ${stockManagementOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {stockManagementOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <SubNavItem 
                  href="/dispenser/stock-management/add" 
                  label="Add Drug Stock" 
                  active={pathname === '/dispenser/stock-management/add'} 
                  showDot={false}
                />
                <SubNavItem 
                  href="/dispenser/stock-management/table" 
                  label="Stock Table" 
                  active={pathname === '/dispenser/stock-management/table'} 
                  showDot={false}
                />
                <SubNavItem 
                  href="/dispenser/stock-management/log" 
                  label="Stock Update Log" 
                  active={pathname === '/dispenser/stock-management/log'} 
                  showDot={false}
                />
              </div>
            )}
          </div>

          <NavItem href="/dispenser/drug-list" icon={<List size={18} />} label="Drug List" active={isActive('/dispenser/drug-list')} />
          <NavItem href="/dispenser/deals" icon={<Users size={18} />} label="Deals / Dealers" active={isActive('/dispenser/deals')} />
          <NavItem href="/dispenser/reports" icon={<BarChart2 size={18} />} label="Reports" active={isActive('/dispenser/reports')} />
          <NavItem href="/dispenser/expiry-alerts" icon={<AlertTriangle size={18} />} label="Expiry Alerts" active={isActive('/dispenser/expiry-alerts')} />
          <NavItem href="/dispenser/settings" icon={<Settings size={18} />} label="Settings" active={isActive('/dispenser/settings')} />
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

function SubNavItem({ 
  href, 
  label, 
  active = false,
  showDot = false
}: { 
  href: string; 
  label: string; 
  active?: boolean;
  showDot?: boolean;
}) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        active 
          ? 'bg-gray-100/80 text-gray-950 font-medium' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${active ? 'bg-blue-600' : 'bg-gray-300'}`} />
      )}
      <span className={showDot ? '' : 'pl-3.5'}>{label}</span>
    </Link>
  );
}
