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
    <div className="p-6">
      <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span>🔍</span> 1. Search Directory
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full sm:w-48 bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer appearance-none pr-10"
          >
            <option value="patient_id" className="bg-slate-950 text-white">Patient ID</option>
            <option value="nic" className="bg-slate-950 text-white">NIC / National ID</option>
            <option value="phone" className="bg-slate-950 text-white">Phone Number</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder={`Enter ${searchType === "patient_id" ? "patient ID code (e.g. P00001)" : searchType === "nic" ? "NIC number" : "phone number"}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          className="flex-1 bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />

        <button
          onClick={onSearch}
          className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-bold px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}