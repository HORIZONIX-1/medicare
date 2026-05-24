"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  examinations: any[];
  onDataAdded?: () => void;
}

export default function ExaminationCard({
  consultationId,
  examinations,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mainMetricNames = [
    "Blood Pressure",
    "Temperature",
    "Pulse",
    "Respiratory Rate",
    "Oxygen Saturation",
  ];
  const [metrics, setMetrics] = useState<Record<string, string>>(
    Object.fromEntries(mainMetricNames.map((n) => [n, ""]))
  );
  const [isSavingMetrics, setIsSavingMetrics] = useState(false);

  const handleAddExamination = async () => {
    if (!title || !result) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/examinations", {
        consultation_id: consultationId,
        title,
        result,
      });

      setTitle("");
      setResult("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add examination:", error);
      alert("Failed to add examination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">③</span> Physical Examination
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-cyan"
        >
          {showForm ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div className="metrics-container space-y-4">
        <div>
          <h3 className="text-sm text-slate-300 font-semibold mb-2">Default examinations</h3>
          <div className="grid grid-cols-1 gap-2">
            {mainMetricNames.map((name) => (
              <div key={name} className="flex items-center gap-3">
                <label className="w-40 text-sm">{name}</label>
                <input
                  type="text"
                  value={metrics[name]}
                  onChange={(e) => setMetrics((m) => ({ ...m, [name]: e.target.value }))}
                  className="input-dark flex-1"
                  placeholder="Value"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="symptoms-form-container">
          <div className="space-y-4">
            <div>
              <label className="form-label">
                Examination
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Blood Pressure, Temperature"
                className="input-dark"
              />
            </div>

            <div>
              <label className="form-label">
                Result
              </label>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="e.g., 120/80 mmHg, Normal"
                className="input-dark"
              />
            </div>

            <button
              onClick={handleAddExamination}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Examination"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}