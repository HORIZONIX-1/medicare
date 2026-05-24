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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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
      const response = await api.post("/investigations", {
        consultation_id: consultationId,
        title,
        description: description || null,
      });

      setLocalInvestigations((current) => [...current, response.data]);

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

  const startEdit = (item: any) => {
    setEditingId(item.investigation_id);
    setEditTitle(item.title || "");
    setEditDescription(item.description || "");
  };

  const handleUpdateInvestigation = async (item: any) => {
    if (!editingId) return;

    if (!editTitle.trim()) {
      alert("Please enter investigation title");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put(`/investigations/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription || null,
      });

      setLocalInvestigations((current) =>
        current.map((investigation) =>
          investigation.investigation_id === editingId ? response.data : investigation
        )
      );

      setEditingId(null);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to update investigation:", error);
      alert("Failed to update investigation");
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
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-slate-100">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-slate-400 mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg px-3 py-1 transition-colors"
                >
                  Edit
                </button>
              </div>

              {editingId === item.investigation_id && (
                <div className="mt-3 space-y-3 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
                  <div>
                    <label className="form-label">Investigation Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="input-dark"
                    />
                  </div>
                  <div>
                    <label className="form-label">Description (Optional)</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
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
                      onClick={() => handleUpdateInvestigation(item)}
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
            No investigations recorded
          </p>
        )}
      </div>

    </div>
  );
}