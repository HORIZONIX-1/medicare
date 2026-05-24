"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  instructions: any[];
  onDataAdded?: () => void;
}

export default function InstructionCard({
  consultationId,
  instructions,
  onDataAdded,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [localInstructions, setLocalInstructions] = useState<any[]>(instructions || []);
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInstruction, setEditInstruction] = useState("");

  useEffect(() => {
    setLocalInstructions(instructions || []);
  }, [instructions]);

  const handleAddInstruction = async () => {
    if (!instruction.trim()) {
      alert("Please enter an instruction");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/instructions", {
        consultation_id: consultationId,
        instruction: instruction.trim(),
      });

      setLocalInstructions((current) => [...current, response.data]);

      setInstruction("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add instruction:", error);
      alert("Failed to add instruction");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.instruction_id);
    setEditInstruction(item.instruction || "");
  };

  const handleUpdateInstruction = async () => {
    if (!editingId) return;

    if (!editInstruction.trim()) {
      alert("Please enter an instruction");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put(`/instructions/${editingId}`, {
        instruction: editInstruction.trim(),
      });

      setLocalInstructions((current) =>
        current.map((item) =>
          item.instruction_id === editingId ? response.data : item
        )
      );

      setEditingId(null);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to update instruction:", error);
      alert("Failed to update instruction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern mt-6">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">④B</span> Patient Instructions
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
                Instruction
              </label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g., Take rest for 2 days, Drink plenty of water..."
                className="textarea-dark"
                rows={3}
              />
            </div>

            <button
              onClick={handleAddInstruction}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Instruction"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {localInstructions?.length > 0 ? (
          localInstructions.map((item) => (
            <div
              key={item.instruction_id}
              className="instruction-item"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="instruction-bullet">•</div>
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg px-3 py-1 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-slate-100 text-sm mt-1">
                  {item.instruction}
                </p>
              </div>

              {editingId === item.instruction_id && (
                <div className="mt-3 space-y-3 rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4 w-full">
                  <div>
                    <label className="form-label">Instruction</label>
                    <textarea
                      value={editInstruction}
                      onChange={(e) => setEditInstruction(e.target.value)}
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
                      onClick={handleUpdateInstruction}
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
            No instructions recorded
          </p>
        )}
      </div>

    </div>
  );
}