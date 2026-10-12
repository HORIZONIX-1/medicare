"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function DoctorSettingsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>

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
    </>
  );
}
