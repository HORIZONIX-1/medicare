"use client";

import { useState } from "react";

import PatientSearchForm from "@/components/patients/PatientSearchForm";
import PatientTable from "@/components/patients/PatientTable";
import RegisterPatientForm from "@/components/patients/RegisterPatientForm";

import api from "@/lib/axios";

export default function PatientsPage() {

  const [searchType, setSearchType] =
    useState("patient_id");

  const [searchValue, setSearchValue] =
    useState("");

  const [patients, setPatients] =
    useState([]);

  const handleSearch = async () => {

    try {

      const response = await api.get(
        "/patients/search",
        {
          params: {
            type: searchType,
            value: searchValue,
          },
        }
      );

      setPatients(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold">
        Patient Search / Registration
      </h1>

      <PatientSearchForm
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
      />

      <PatientTable patients={patients} />

      <div className="text-center font-semibold">
        OR
      </div>

      <RegisterPatientForm />

    </div>
  );
}