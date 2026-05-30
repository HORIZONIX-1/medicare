"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientSearchForm from "@/components/patients/PatientSearchForm";
import PatientTable from "@/components/patients/PatientTable";
import RegisterPatientForm from "@/components/patients/RegisterPatientForm";
import api from "@/lib/axios";

export default function PatientsPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("patient_id");
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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

  const handleSearch = async () => {
    try {
      const response = await api.get("/patients/search", {
        params: {
          type: searchType,
          value: searchValue,
        },
      });
      setPatients(response.data);
    } catch (error) {
      console.error(error);
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
    <div className="opd-page">
      <div className="opd-orb opd-orb-1" />
      <div className="opd-orb opd-orb-2" />
      <div className="opd-orb opd-orb-3" />
      <div className="opd-grid-lines" />

      <header className="opd-header">
        <div className="opd-header-content">
          <div className="opd-header-left">
            <span className="opd-header-icon">🏥</span>
            <div>
              <h1 className="opd-header-title">MediCare</h1>
              <p className="opd-header-subtitle">Clinical Hub</p>
            </div>
          </div>
          <div className="opd-header-right">
            <div className="opd-header-badge">
              <span className="opd-header-badge-dot" />
              {currentUser?.name || 'User'}
            </div>
            <button
              onClick={handleLogout}
              className="btn-cyan"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="opd-main">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Patient Directory</h2>
          <p className="text-slate-400 text-xs mt-1">Search, evaluate patient records, or register new patients in the EHR system.</p>
        </div>

        {/* Forms styling and sections wrapper */}
        <div className="grid grid-cols-1 gap-8">
          
          <div className="card-modern">
            <PatientSearchForm
              searchType={searchType}
              setSearchType={setSearchType}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={handleSearch}
            />
          </div>

          <div className="card-modern">
            <PatientTable patients={patients} />
          </div>

          <div className="relative py-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800/80"></div>
            </div>
            <span className="relative px-4 bg-slate-950 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              OR
            </span>
          </div>

          <div className="card-modern">
            <RegisterPatientForm />
          </div>

        </div>
      </main>
    </div>
  );
}