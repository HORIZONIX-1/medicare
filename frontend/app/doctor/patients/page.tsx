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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Premium Header */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">MediCare</h1>
            <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">Clinical Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{currentUser?.role}</p>
          </div>
          <span className="h-8 w-8 bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/20 rounded-full flex items-center justify-center text-sm shadow-inner uppercase">
            {currentUser?.name?.charAt(0) || "U"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-rose-950/20 border border-slate-700/50 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Body container */}
      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Patient Directory</h2>
          <p className="text-slate-400 text-xs mt-1">Search, evaluate patient records, or register new patients in the EHR system.</p>
        </div>

        {/* Forms styling and sections wrapper */}
        <div className="grid grid-cols-1 gap-8">
          
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">
            <PatientSearchForm
              searchType={searchType}
              setSearchType={setSearchType}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={handleSearch}
            />
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">
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

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">
            <RegisterPatientForm />
          </div>

        </div>
      </main>
    </div>
  );
}