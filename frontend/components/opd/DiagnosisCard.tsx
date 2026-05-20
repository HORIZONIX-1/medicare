"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  diagnoses: any[];
  onDataAdded?: () => void;
}

export default function DiagnosisCard({
  consultationId,
  diagnoses,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [diagnosisName, setDiagnosisName] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDiagnosis = async () => {
    if (!diagnosisName.trim()) {
      alert("Please enter a diagnosis");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/diagnoses", {
        consultation_id: consultationId,
        diagnosis_name: diagnosisName.trim(),
        notes: notes || null,
      });

      setDiagnosisName("");
      setNotes("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add diagnosis:", error);
      alert("Failed to add diagnosis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">⑤</span> Diagnosis
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
                Diagnosis
              </label>
              <input
                type="text"
                value={diagnosisName}
                onChange={(e) => setDiagnosisName(e.target.value)}
                placeholder="e.g., Common Cold, Hypertension..."
                className="input-dark"
              />
            </div>

            <div>
              <label className="form-label">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add clinical notes about this diagnosis..."
                className="textarea-dark"
                rows={3}
              />
            </div>

            <button
              onClick={handleAddDiagnosis}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Diagnosis"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {diagnoses?.length > 0 ? (
          diagnoses.map((diagnosis) => (
            <div
              key={diagnosis.diagnosis_id}
              className="investigation-item"
            >
              <p className="font-semibold text-slate-100">
                {diagnosis.diagnosis_name}
              </p>
              {diagnosis.notes && (
                <p className="text-xs text-slate-400 mt-2">
                  {diagnosis.notes}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-6 text-sm">
            No diagnoses recorded
          </p>
        )}
      </div>

    </div>
  );
}