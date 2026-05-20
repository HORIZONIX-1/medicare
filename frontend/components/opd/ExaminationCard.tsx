"use client";

import { useState } from "react";
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
        {examinations?.length > 0 ? (
          examinations.map((exam) => (
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
  );
}