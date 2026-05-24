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
      await api.post("/instructions", {
        consultation_id: consultationId,
        instruction: instruction.trim(),
      });

      setLocalInstructions((current) => [
        ...current,
        {
          instruction_id: Date.now(),
          instruction: instruction.trim(),
        },
      ]);

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
              <div className="instruction-bullet">•</div>
              <p className="text-slate-100 text-sm">
                {item.instruction}
              </p>
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