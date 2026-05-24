"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  investigations: any[];
  onDataAdded?: () => void;
}

export default function InvestigationCard({
  consultationId,
  investigations,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [localInvestigations, setLocalInvestigations] = useState<any[]>(investigations || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalInvestigations(investigations || []);
  }, [investigations]);

  const handleAddInvestigation = async () => {
    if (!title) {
      alert("Please enter investigation title");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/investigations", {
        consultation_id: consultationId,
        title,
        description: description || null,
      });

      setLocalInvestigations((current) => [
        ...current,
        {
          investigation_id: Date.now(),
          title,
          description: description || null,
        },
      ]);

      setTitle("");
      setDescription("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add investigation:", error);
      alert("Failed to add investigation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">④A</span> Investigations
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
                Investigation Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Blood Test, X-Ray"
                className="input-dark"
              />
            </div>

            <div>
              <label className="form-label">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add investigation details..."
                className="textarea-dark"
                rows={3}
              />
            </div>

            <button
              onClick={handleAddInvestigation}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Investigation"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {localInvestigations?.length > 0 ? (
          localInvestigations.map((item) => (
            <div
              key={item.investigation_id}
              className="investigation-item"
            >
              <p className="font-semibold text-slate-100">{item.title}</p>
              {item.description && (
                <p className="text-xs text-slate-400 mt-2">
                  {item.description}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-6 text-sm">
            No investigations recorded
          </p>
        )}
      </div>

    </div>
  );
}