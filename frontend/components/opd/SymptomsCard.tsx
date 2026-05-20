"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  symptoms: any[];
  onDataAdded?: () => void;
}

export default function SymptomsCard({
  consultationId,
  symptoms,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState<any[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [severity, setSeverity] = useState(5);
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState("days");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await api.get("/symptoms");
      setAllSymptoms(response.data);
    } catch (error) {
      console.error("Failed to fetch symptoms:", error);
    }
  };

  const handleAddSymptom = async () => {
    if (!selectedSymptom) {
      alert("Please select a symptom");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/symptoms/consultation", {
        consultation_id: consultationId,
        symptom_id: parseInt(selectedSymptom),
        severity: parseFloat(severity.toString()),
        duration_value: parseFloat(durationValue.toString()),
        duration_unit: durationUnit,
      });

      setSelectedSymptom("");
      setSeverity(5);
      setDurationValue(1);
      setDurationUnit("days");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add symptom:", error);
      alert("Failed to add symptom");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">②</span> Symptoms
        </h2>
        <button
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
              <label className="form-label">
                Symptom
              </label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="input-dark"
              >
                <option value="">Select a symptom...</option>
                {allSymptoms.map((s) => (
                  <option key={s.symptom_id} value={s.symptom_id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">
                Severity: <span className="text-indigo-400">{severity}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">
                  Duration
                </label>
                <input
                  type="number"
                  value={durationValue}
                  onChange={(e) => setDurationValue(parseInt(e.target.value))}
                  className="input-dark"
                  min="1"
                />
              </div>
              <div>
                <label className="form-label">
                  Unit
                </label>
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value)}
                  className="input-dark"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddSymptom}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Symptom"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {symptoms?.length > 0 ? (
          symptoms.map((item) => (
            <div
              key={item.consultation_symptom_id}
              className="symptom-item"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-100">{item.symptom.name}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Severity: <span className="text-indigo-400 font-semibold">{item.severity}/10</span> • Duration: <span className="text-cyan-400 font-semibold">{item.duration_value} {item.duration_unit}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-4 text-sm">No symptoms recorded</p>
        )}
      </div>

    </div>
  );
}