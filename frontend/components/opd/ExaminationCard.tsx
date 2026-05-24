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
  const [localExaminations, setLocalExaminations] = useState<any[]>(examinations || []);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalExaminations(examinations || []);
  }, [examinations]);
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

      setLocalExaminations((current) => [
        ...current,
        {
          examination_id: Date.now(),
          title,
          result,
        },
      ]);

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

  const handleSaveMetrics = async () => {
    setIsSavingMetrics(true);
    try {
      const entries = Object.entries(metrics).filter(([, v]) => v && v.toString().trim() !== "");
      if (entries.length === 0) {
        alert("No metrics to save");
        return;
      }

      await Promise.all(entries.map(([name, value]) =>
        api.post("/examinations", {
          consultation_id: consultationId,
          title: name,
          result: value,
        })
      ));

      setMetrics(Object.fromEntries(mainMetricNames.map((n) => [n, ""])));
      onDataAdded?.();
      alert("Metrics saved");
    } catch (error) {
      console.error("Failed to save metrics:", error);
      alert("Failed to save metrics");
    } finally {
      setIsSavingMetrics(false);
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
          <h3 className="text-sm text-slate-300 font-semibold mb-2">Main metrics</h3>
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
          <div className="mt-3">
            <button onClick={handleSaveMetrics} disabled={isSavingMetrics} className="btn-indigo-gradient">
              {isSavingMetrics ? "Saving..." : "Save Metrics"}
            </button>
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

      <div className="space-y-2">
        {localExaminations?.length > 0 ? (
          localExaminations.map((exam) => (
            <div
              key={exam.examination_id}
              className="symptom-item"
            >
              <div className="flex-1">
                <p className="font-semibold text-slate-100">{exam.title}</p>
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-cyan-400 font-semibold">{exam.result}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-4 text-sm">
            No examinations recorded
          </p>
        )}
      </div>
    </div>
  </div>
  );
}