"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientSearchForm from "@/components/patients/PatientSearchForm";
import PatientTable from "@/components/patients/PatientTable";
import RegisterPatientForm from "@/components/patients/RegisterPatientForm";
import api from "@/lib/axios";
import {
  ArrowRight,
} from "lucide-react";

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
        <h1 className="dr-page-title">Consultation</h1>
      </div>

      {/* Stepper Progress Bar */}
      <div className="consultation-stepper">
        {/* Steps */}
        <div className="stepper-step active">
          <div className="stepper-circle">1</div>
          <span className="stepper-label">Select Patient</span>
        </div>
        <div className="stepper-step">
          <div className="stepper-circle">2</div>
          <span className="stepper-label">Chief Complaint</span>
        </div>
        <div className="stepper-step">
          <div className="stepper-circle">3</div>
          <span className="stepper-label">Examination</span>
        </div>
        <div className="stepper-step">
          <div className="stepper-circle">4</div>
          <span className="stepper-label">Diagnosis & Notes</span>
        </div>
        <div className="stepper-step">
          <div className="stepper-circle">5</div>
          <span className="stepper-label">Prescription</span>
        </div>
        <div className="stepper-step">
          <div className="stepper-circle">6</div>
          <span className="stepper-label">Review & Invoice</span>
        </div>

        {/* Connector lines behind */}
        <div className="stepper-connector">
          <div className="flex w-full h-full items-center justify-between" style={{ gap: "2px" }}>
            <div className="stepper-connector-line active flex-1" />
            <div className="stepper-connector-line inactive flex-1" />
            <div className="stepper-connector-line inactive flex-1" />
            <div className="stepper-connector-line inactive flex-1" />
            <div className="stepper-connector-line inactive flex-1" />
          </div>
        </div>
      </div>

      {/* Central White Content Card */}
      <div className="white-card">
        <div className="white-card-step-title">Step 1 of 6</div>
        <h2 className="white-card-title">Select Patient</h2>
        <p className="white-card-subtitle">
          Search for an existing patient or register a new patient.
        </p>

        {/* 1. Search Existing Patient Section */}
        <PatientSearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
        />

        <PatientTable patients={patients} />

        {/* OR Divider */}
        <div className="or-divider-container">
          <div className="or-divider-line" />
          <span className="or-divider-badge">OR</span>
        </div>

        {/* 2. Register New Patient Section */}
        <RegisterPatientForm />
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-[1000px] mx-auto flex justify-end">
        <button className="btn-light-blue" style={{ padding: "0.75rem 2.25rem", fontSize: "0.95rem", borderRadius: "0.5rem" }}>
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </>
  );
}
