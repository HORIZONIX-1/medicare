"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSelect: (drug: any) => void;
}

export default function DrugSearchInput({ value, placeholder = "Search Drug...", onChange, onSelect }: Props) {
  const [inputValue, setInputValue] = useState(value);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRequestId = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectInProgress = useRef(false);

  useEffect(() => {
    if (!selectInProgress.current) {
      setInputValue(value);
    }
  }, [value]);

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
    } catch (e) {
      console.error(e);
    } finally {
      if (requestId === searchRequestId.current) setIsSearching(false);
    }
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    onChange(val);
    setIsOpen(true);
    searchDrugs(val);
  };

  const handleSelect = (drug: any) => {
    selectInProgress.current = true;
    setInputValue(drug.name);
    onSelect(drug);
    setSearchResults([]);
    setIsOpen(false);
    setTimeout(() => {
      selectInProgress.current = false;
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        value={inputValue}
        placeholder={placeholder}
        className="w-full h-9 rounded border border-[#cbd1da] bg-white px-3 text-xs font-semibold text-[#111827] focus:border-[#111827] focus:outline-none transition-colors"
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => {
          if (inputValue.trim()) {
            setIsOpen(true);
            searchDrugs(inputValue);
          }
        }}
      />

      {isOpen && (isSearching || searchResults.length > 0) && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded border border-[#d5d9e0] bg-white shadow-lg">
          {isSearching && searchResults.length === 0 && (
            <div className="px-3 py-2 text-xs font-semibold text-[#64748b]">Searching stocked drugs...</div>
          )}

          {!isSearching && searchResults.length === 0 && (
            <div className="px-3 py-2 text-xs font-semibold text-[#64748b]">No stocked drugs found.</div>
          )}

          {searchResults.map((drug) => (
            <button
              key={drug.drug_id}
              type="button"
              onClick={() => handleSelect(drug)}
              className="w-full px-3 py-2 text-left text-xs font-semibold text-[#111827] hover:bg-[#f3f4f6] transition-colors focus:bg-[#f3f4f6] outline-none border-b border-[#f1f5f9] last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#111827]">{drug.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">
                  Stock: {drug.available_quantity} ({drug.stock_status})
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
