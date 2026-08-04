"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  FileText, 
  Receipt, 
  Calendar as CalendarIcon, 
  Bell,
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown,
  Plus,
  Save,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function DoctorSettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formattedHeaderDate, setFormattedHeaderDate] = useState("");
  
  // Setting states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("Cardiologist");
  const [licenseNumber, setLicenseNumber] = useState("SLMC-MD-89234");
  const [doctorFee, setDoctorFee] = useState(500);
  const [discount, setDiscount] = useState(0);
  const [validityDays, setValidityDays] = useState(30);
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification states
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      const user = JSON.parse(userString);
      setCurrentUser(user);
      setFullName(user.name || "Sarah Bennett");
      setEmail(user.email || "doctor@example.com");
      
      // Load saved settings if any
      const savedFee = localStorage.getItem("doctorFee");
      const savedDiscount = localStorage.getItem("discount");
      const savedValidity = localStorage.getItem("validityDays");
      const savedPhone = localStorage.getItem("doctorPhone");
      const savedSpec = localStorage.getItem("doctorSpecialization");
      const savedLicense = localStorage.getItem("doctorLicense");

      if (savedFee) setDoctorFee(Number(savedFee));
      if (savedDiscount) setDiscount(Number(savedDiscount));
      if (savedValidity) setValidityDays(Number(savedValidity));
      if (savedPhone) setPhone(savedPhone);
      else setPhone("+94 77 123 4567");
      if (savedSpec) setSpecialization(savedSpec);
      if (savedLicense) setLicenseNumber(savedLicense);

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
      setFormattedHeaderDate(new Date().toLocaleDateString('en-US', options));
    } catch (e) {
      // fallback
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("doctorFee", String(doctorFee));
      localStorage.setItem("discount", String(discount));
      localStorage.setItem("validityDays", String(validityDays));
      localStorage.setItem("doctorPhone", phone);
      localStorage.setItem("doctorSpecialization", specialization);
      localStorage.setItem("doctorLicense", licenseNumber);
      
      // Update local storage user name representation if changed
      if (currentUser) {
        const updatedUser = { ...currentUser, name: fullName, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
      }

      showToast("Practice settings saved successfully!");
    } catch (err) {
      showToast("Failed to save settings.", "error");
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("Please fill all password fields.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match.", "error");
      return;
    }
    
    // Simulate updating password success
    showToast("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
            <Link href="/doctor/patients" className="dr-nav-item">
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
            <Link href="/doctor/settings" className="dr-nav-item active">
              <div className="dr-nav-item-left">
                <SettingsIcon size={18} />
                <span>Settings</span>
              </div>
            </Link>
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
              <span>{formattedHeaderDate}</span>
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
            {/* Custom Toast Alert */}
            {toast && (
              <div className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-xl shadow-xl transition-all duration-300 border animate-bounce ${
                toast.type === "success" 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                  : "bg-rose-50 text-rose-800 border-rose-100"
              }`}>
                {toast.type === "success" ? <CheckCircle size={18} className="text-emerald-600" /> : <AlertTriangle size={18} className="text-rose-600" />}
                <span className="text-xs font-bold">{toast.message}</span>
              </div>
            )}

            <div className="dr-page-header">
              <div>
                <h1 className="dr-page-title" style={{ margin: 0 }}>Clinical Settings</h1>
                <p className="text-slate-500 text-xs mt-1">Configure consultation fees, prescription templates, and personal demographics.</p>
              </div>
            </div>

            {/* Split Grids Config Columns */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              {/* Left 2 columns: Clinical Preferences & Demographics */}
              <div className="xl:col-span-2 space-y-6">
                <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
                  <h3 className="font-extrabold text-slate-800 text-base mb-1">Clinical Practice Rules</h3>
                  <p className="text-slate-400 text-xs mb-5">Configure pricing metrics used when finalizing patient billings.</p>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">OPD Consult Fee (LKR)</label>
                        <input
                          type="number"
                          value={doctorFee}
                          onChange={(e) => setDoctorFee(Number(e.target.value))}
                          className="light-input w-full"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Default Discount (%)</label>
                        <input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="light-input w-full"
                          min="0"
                          max="100"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Prescription Validity (Days)</label>
                        <input
                          type="number"
                          value={validityDays}
                          onChange={(e) => setValidityDays(Number(e.target.value))}
                          className="light-input w-full"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-6">
                      <h3 className="font-extrabold text-slate-800 text-sm mb-1">Medical Specialist Profile</h3>
                      <p className="text-slate-400 text-xs mb-5">Doctor identity details shown on print templates.</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Full Title / Name</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="light-input w-full"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">System Login Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="light-input w-full"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Specialization Field</label>
                          <input
                            type="text"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            className="light-input w-full"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Medical License No</label>
                          <input
                            type="text"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            className="light-input w-full"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Contact Mobile</label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="light-input w-full"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        type="submit" 
                        className="btn-light-primary flex items-center gap-2"
                        style={{ padding: "0.6rem 1.5rem" }}
                      >
                        <Save size={16} />
                        <span>Save Clinical Practice Rules</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right column: Security / Credentials controls */}
              <div className="xl:col-span-1 space-y-6">
                <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6">
                  <h3 className="font-extrabold text-slate-800 text-base mb-1">Access Credentials</h3>
                  <p className="text-slate-400 text-xs mb-5">Change password keys to secure active sessions.</p>

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Current Keyphrase</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="light-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">New Password Key</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="light-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-2">Confirm New Key</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="light-input w-full"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-light-outline w-full flex items-center justify-center gap-2 mt-4"
                      style={{ padding: "0.6rem 0" }}
                    >
                      <span>Update Credentials</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
