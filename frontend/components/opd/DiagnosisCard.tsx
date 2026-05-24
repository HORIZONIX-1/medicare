"use client";

import { useEffect, useState } from "react";
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
  const [localDiagnoses, setLocalDiagnoses] = useState<any[]>(diagnoses || []);
  const [diagnosisName, setDiagnosisName] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDiagnosisName, setEditDiagnosisName] = useState("");
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    setLocalDiagnoses(diagnoses || []);
  }, [diagnoses]);

  const handleAddDiagnosis = async () => {
    if (!diagnosisName.trim()) {
      alert("Please enter a diagnosis");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/diagnoses", {
        consultation_id: consultationId,
        diagnosis_name: diagnosisName.trim(),
        notes: notes || null,
      });

      setLocalDiagnoses((current) => [...current, response.data]);

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

  const startEdit = (item: any) => {
    setEditingId(item.diagnosis_id);
    setEditDiagnosisName(item.diagnosis_name || "");
    setEditNotes(item.notes || "");
  };

  const handleUpdateDiagnosis = async () => {
    if (!editingId) return;

    if (!editDiagnosisName.trim()) {
      alert("Please enter a diagnosis");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put(`/diagnoses/${editingId}`, {
        diagnosis_name: editDiagnosisName.trim(),
        notes: editNotes || null,
      });

      setLocalDiagnoses((current) =>
        current.map((diagnosis) =>
          diagnosis.diagnosis_id === editingId ? response.data : diagnosis
        )
      );

      setEditingId(null);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to update diagnosis:", error);
      alert("Failed to update diagnosis");
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
        {localDiagnoses?.length > 0 ? (
          localDiagnoses.map((diagnosis) => (
            <div
              key={diagnosis.diagnosis_id}
              className="investigation-item"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">
                    {diagnosis.diagnosis_name}
                  </p>
                  {diagnosis.notes && (
                    <p className="text-xs text-slate-400 mt-2">
                      {diagnosis.notes}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => startEdit(diagnosis)}
                  className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg px-3 py-1 transition-colors"
                >
                  Edit
                </button>
              </div>

              {editingId === diagnosis.diagnosis_id && (
                <div className="mt-3 space-y-3 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
                  <div>
                    <label className="form-label">Diagnosis</label>
                    <input
                      type="text"
                      value={editDiagnosisName}
                      onChange={(e) => setEditDiagnosisName(e.target.value)}
                      className="input-dark"
                    />
                  </div>
                  <div>
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="textarea-dark"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => setEditingId(null)} className="btn-cyan">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateDiagnosis}
                      disabled={isLoading}
                      className="btn-indigo-gradient"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
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