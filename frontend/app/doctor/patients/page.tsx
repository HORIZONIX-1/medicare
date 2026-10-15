"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientSearchForm from "@/components/patients/PatientSearchForm";
import PatientTable from "@/components/patients/PatientTable";
import api from "@/lib/axios";

export default function PatientsDirectoryPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState("patient_id");
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
    </>
  );
}