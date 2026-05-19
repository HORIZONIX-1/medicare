"use client";

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
    <div className="border rounded-lg p-5 bg-white">

      <h2 className="font-semibold mb-4">
        1. SEARCH PATIENT
      </h2>

      <div className="flex gap-3">

        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value)
          }
          className="border p-2 rounded w-52"
        >
          <option value="patient_id">
            Patient ID
          </option>

          <option value="nic">
            NIC
          </option>

          <option value="phone">
            Phone
          </option>
        </select>

        <input
          type="text"
          placeholder="Enter search value"
          value={searchValue}
          onChange={(e) =>
            setSearchValue(e.target.value)
          }
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={onSearch}
          className="bg-black text-white px-6 rounded"
        >
          SEARCH
        </button>

      </div>
    </div>
  );
}