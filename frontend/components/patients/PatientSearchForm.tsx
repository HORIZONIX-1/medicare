"use client";

import { Search } from "lucide-react";

interface Props {
  searchType: string;
  setSearchType: (value: string) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  onSearch: () => void;
}

export default function PatientSearchForm({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  onSearch,
}: Props) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 className="white-card-section-title">1. Search Existing Patient</h3>
      <p className="white-card-section-desc">Search using Patient ID, NIC or Phone number.</p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", minWidth: "150px" }}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="light-select"
            style={{ appearance: "none", paddingRight: "2.25rem", height: "42px" }}
          >
            <option value="patient_id">Patient ID</option>
            <option value="nic">NIC</option>
            <option value="phone">Phone number</option>
          </select>
          <div 
            style={{ 
              pointerEvents: "none", 
              position: "absolute", 
              inset: "0 0.75rem 0 auto", 
              display: "flex", 
              alignItems: "center", 
              color: "#94a3b8" 
            }}
          >
            <svg style={{ fill: "currentColor", width: "1rem", height: "1rem" }} viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Enter Patient ID, NIC or Phone number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          className="light-input"
          style={{ flex: 1, minWidth: "200px", height: "42px" }}
        />

        <button
          onClick={onSearch}
          className="btn-light-blue"
          style={{ height: "42px", borderRadius: "0.5rem" }}
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}