"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSelect: (drug: any) => void;
}

export default function DrugSearchInput({ value, placeholder = "Search Drug", onChange, onSelect }: Props) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRequestId = useRef(0);

  const searchDrugs = async (query: string) => {
    const trimmed = (query || "").trim();
    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const requestId = ++searchRequestId.current;
    setIsSearching(true);

    try {
      const response = await api.get(`/drugs/search?query=${encodeURIComponent(trimmed)}`);
      const candidates = Array.isArray(response.data) ? response.data : [];

      const stockedDrugs = await Promise.all(
        candidates.map(async (drug: any) => {
          try {
            const stock = await api.get(`/drugs/${drug.drug_id}/availability`);
            return {
              ...drug,
              available_quantity: stock.data.available_quantity,
              stock_status: stock.data.status,
            };
          } catch {
            return null;
          }
        })
      );

      if (requestId !== searchRequestId.current) return;

      setSearchResults(stockedDrugs.filter((d) => d && Number(d.available_quantity) > 0));
    } finally {
      if (requestId === searchRequestId.current) setIsSearching(false);
    }
  };

  useEffect(() => {
    // when input changes externally, trigger search
    searchDrugs(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder-slate-500"
        onChange={(e) => onChange(e.target.value)}
      />

      {(isSearching || searchResults.length > 0) && (
        <div className="mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-slate-950/40">
          {isSearching && searchResults.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-400">Searching stocked drugs...</div>
          )}

          {!isSearching && searchResults.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-400">No stocked drugs found.</div>
          )}

          {searchResults.map((drug) => (
            <button
              key={drug.drug_id}
              type="button"
              onClick={() => onSelect(drug)}
              className="w-full px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-slate-800"
            >
              {drug.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
