"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

interface Props {
  patientId: number;
  allergies: any[];
  onDataAdded?: () => void;
}

export default function AllergyCard({
  patientId,
  allergies,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [localAllergies, setLocalAllergies] = useState<any[]>(allergies || []);
  const [allergyName, setAllergyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalAllergies(allergies || []);
  }, [allergies]);

  const handleAddAllergy = async () => {
    if (!allergyName.trim()) {
      alert("Please enter an allergy");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/patients/${patientId}/allergies`, {
        allergy_name: allergyName.trim(),
      });

      setLocalAllergies((current) => [...current, response.data]);
      setAllergyName("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add allergy:", error);
      alert("Failed to add allergy");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern mt-6">
      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">④C</span> Patient Allergies
        </h2>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-cyan"
        >
          {showForm ? "Cancel" : "+ Add"}
        </button>
      </div>

      {showForm && (
        <div className="symptoms-form-container">
          <div className="space-y-4">
            <div>
              <label className="form-label">Allergy</label>
              <input
                value={allergyName}
                onChange={(e) => setAllergyName(e.target.value)}
                placeholder="e.g., Penicillin, Seafood, Dust"
                className="input-dark"
              />
            </div>

            <button
              type="button"
              onClick={handleAddAllergy}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Allergy"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {localAllergies?.length > 0 ? (
          localAllergies.map((item) => (
            <div key={item.allergy_id ?? item.allergy_name} className="instruction-item">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="instruction-bullet">•</div>
                </div>
                <p className="text-slate-100 text-sm mt-1">{item.allergy_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-6 text-sm">
            No allergies recorded
          </p>
        )}
      </div>
    </div>
  );
}