"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PatientSearchForm from "@/components/patients/PatientSearchForm";
import PatientTable from "@/components/patients/PatientTable";
import api from "@/lib/axios";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  Send, 
  Receipt, 
  BarChart2, 
  Calendar as CalendarIcon, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown,
  Plus,
  Search
} from "lucide-react";

export default function PatientsDirectoryPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("patient_id");
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formattedDate, setFormattedDate] = useState("Wednesday, June 12, 2024");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(userString));
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setFormattedDate(new Date().toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  // Fetch initial list of all patients in the organization
  useEffect(() => {
    const loadInitialPatients = async () => {
      try {
        setIsSearching(true);
        const response = await api.get("/patients/search", {
          params: {
            type: "patient_id",
            value: "",
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to load initial patients list:", error);
      } finally {
        setIsSearching(false);
      }
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      loadInitialPatients();
    }
  }, []);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await api.get("/patients/search", {
        params: {
          type: searchType,
          value: searchValue,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-slate-400 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Hide default site layout headers and footers for this page */
        .header-main,
        .footer {
          display: none !important;
        }
        .main-content {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `}</style>

      <div className="dr-layout">
        {/* Left Sidebar */}
        <aside className="dr-sidebar">
          {/* Logo Area */}
          <div className="dr-sidebar-logo">
            <div className="dr-logo-icon">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="dr-logo-text">
              <span className="dr-logo-title">MediCore</span>
              <span className="dr-logo-subtitle">Clinic Suite</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="dr-sidebar-nav">
            <Link href="/doctor/dashboard" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/doctor/patients" className="dr-nav-item active">
              <div className="dr-nav-item-left">
                <Users size={18} />
                <span>Patients</span>
              </div>
            </Link>
            <Link href="/doctor/opd" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Stethoscope size={18} />
                <span>OPD / Consultation</span>
              </div>
            </Link>
            <Link href="/doctor/prescription" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <FileText size={18} />
                <span>Prescriptions</span>
              </div>
            </Link>
            <Link href="/doctor/invoice" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <Receipt size={18} />
                <span>Invoices</span>
              </div>
            </Link>
            <Link href="/doctor/calendar" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <CalendarIcon size={18} />
                <span>Calendar</span>
              </div>
            </Link>
            <a href="#" className="dr-nav-item">
              <div className="dr-nav-item-left">
                <SettingsIcon size={18} />
                <span>Settings</span>
              </div>
            </a>
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="dr-sidebar-footer">
            <button onClick={handleLogout} className="dr-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="dr-main-content">
          {/* Header */}
          <header className="dr-header">
            <div className="dr-header-date">
              <CalendarIcon size={16} className="text-blue-600" />
              <span>{formattedDate}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <div className="dr-header-right">
              {/* Notifications */}
              <button className="dr-bell-btn">
                <Bell size={18} />
                <span className="dr-bell-badge">3</span>
              </button>

              {/* Doctor Profile */}
              <div className="dr-profile-badge">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
                  alt="Dr. Sarah Bennett"
                  className="dr-profile-avatar"
                />
                <div className="dr-profile-info">
                  <span className="dr-profile-name">
                    {currentUser?.name ? `Dr. ${currentUser.name}` : "Dr. Sarah Bennett"}
                  </span>
                  <span className="dr-profile-role">Cardiologist</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Page Body Scrollable */}
          <main className="dr-content-scroll">
            <div className="dr-page-header">
              <h1 className="dr-page-title">Patient Directory</h1>
            </div>

            {/* Central White Content Card */}
            <div className="white-card">
              <h2 className="white-card-title">All Clinic Patients</h2>
              <p className="white-card-subtitle">
                Search patients in your organization and view their profiles or start new consultations.
              </p>

              {/* Patient Search Section */}
              <PatientSearchForm
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={handleSearch}
              />

              {isSearching ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                  <p className="text-slate-400 text-xs mt-3">Searching records...</p>
                </div>
              ) : (
                <PatientTable patients={patients} />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}