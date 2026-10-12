"use client";

import { useEffect, useState } from "react";
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
  const [localSymptoms, setLocalSymptoms] = useState<any[]>(symptoms || []);
  const [allSymptoms, setAllSymptoms] = useState<any[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [severity, setSeverity] = useState(5);
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState("days");
  const [isLoading, setIsLoading] = useState(false);
  const [newSymptomName, setNewSymptomName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSeverity, setEditSeverity] = useState(5);
  const [editDurationValue, setEditDurationValue] = useState(1);
  const [editDurationUnit, setEditDurationUnit] = useState("days");

  const fetchSymptoms = async () => {
    try {
      const response = await api.get("/symptoms");
      setAllSymptoms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch symptoms:", error);
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  useEffect(() => {
    // Keep the local list in sync when the parent reloads the consultation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSymptoms(symptoms || []);
  }, [symptoms]);

  const handleAddSymptom = async () => {
    if (!selectedSymptom) {
      alert("Please select a symptom");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await api.post("/symptoms/consultation", {
        consultation_id: consultationId,
        symptom_id: parseInt(selectedSymptom),
        severity: parseFloat(severity.toString()),
        duration_value: parseFloat(durationValue.toString()),
        duration_unit: durationUnit,
      });

      setLocalSymptoms((prev) => [...prev, resp.data]);

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

  const handleCreateSymptomAndAdd = async () => {
    if (!newSymptomName.trim()) {
      alert("Please enter symptom name");
      return;
    }

    setIsLoading(true);
    try {
      // create new symptom
      const res = await api.post("/symptoms", { name: newSymptomName.trim() });
      const created = res.data;

      // add to consultation
      const resp = await api.post("/symptoms/consultation", {
        consultation_id: consultationId,
        symptom_id: created.symptom_id,
        severity: parseFloat(severity.toString()),
        duration_value: parseFloat(durationValue.toString()),
        duration_unit: durationUnit,
      });

      // update lists
      setAllSymptoms((s) => [...s, created]);
      setLocalSymptoms((s) => [...s, resp.data]);

      setNewSymptomName("");
      setSeverity(5);
      setDurationValue(1);
      setDurationUnit("days");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to create/add symptom:", error);
      alert((error as any)?.response?.data?.message || "Failed to create or add symptom");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.consultation_symptom_id);
    setEditSeverity(Number(item.severity ?? 5));
    setEditDurationValue(Number(item.duration_value ?? 1));
    setEditDurationUnit(item.duration_unit || "days");
  };

  const handleUpdateSymptom = async (item: any) => {
    if (!editingId) return;

    setIsLoading(true);
    try {
      const resp = await api.put(`/symptoms/consultation/${editingId}`, {
        severity: editSeverity,
        duration_value: editDurationValue,
        duration_unit: editDurationUnit,
      });

      setLocalSymptoms((current) =>
        current.map((symptom) =>
          symptom.consultation_symptom_id === editingId ? { ...symptom, ...resp.data } : symptom
        )
      );

      setEditingId(null);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to update symptom:", error);
      alert("Failed to update symptom");
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
              <label className="form-label">Or add new symptom</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSymptomName}
                  onChange={(e) => setNewSymptomName(e.target.value)}
                  placeholder="e.g., Headache"
                  className="input-dark flex-1"
                />
                <button
                  onClick={handleCreateSymptomAndAdd}
                  disabled={isLoading}
                  className="btn-cyan"
                >
                  Create & Add
                </button>
              </div>
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
        {localSymptoms?.length > 0 ? (
          localSymptoms.map((item) => (
            <div
              key={item.consultation_symptom_id || item.symptom_id}
              className="symptom-item"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-100">{item?.symptom?.name || item?.name || (item?.symptom_id ? allSymptoms.find((s) => s.symptom_id === item.symptom_id)?.name : undefined) || "Unknown symptom"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg px-3 py-1 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Severity: <span className="text-indigo-400 font-semibold">{item.severity ?? "-"}/10</span> • Duration: <span className="text-cyan-400 font-semibold">{item.duration_value ?? "-"} {item.duration_unit ?? ""}</span>
                </p>
                {editingId === item.consultation_symptom_id && (
                  <div className="mt-3 space-y-3 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
                    <div>
                      <label className="form-label">Severity: <span className="text-indigo-400">{editSeverity}/10</span></label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={editSeverity}
                        onChange={(e) => setEditSeverity(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="form-label">Duration</label>
                        <input
                          type="number"
                          value={editDurationValue}
                          onChange={(e) => setEditDurationValue(parseInt(e.target.value))}
                          className="input-dark"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="form-label">Unit</label>
                        <select
                          value={editDurationUnit}
                          onChange={(e) => setEditDurationUnit(e.target.value)}
                          className="input-dark"
                        >
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="btn-cyan"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateSymptom(item)}
                        disabled={isLoading}
                        className="btn-indigo-gradient"
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                )}
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