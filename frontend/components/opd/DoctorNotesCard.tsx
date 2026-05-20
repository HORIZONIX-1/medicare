"use client";

import { useState } from "react";
import api from "@/lib/axios";

interface Props {
  consultation: any;
  onUpdate?: () => void;
}

export default function DoctorNotesCard({
  consultation,
  onUpdate,
}: Props) {
  const [notes, setNotes] = useState(
    consultation.notes || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put(
        `/consultations/${consultation.consultation_id}`,
        { notes }
      );
      onUpdate?.();
    } catch (error) {
      console.error("Failed to update notes:", error);
      alert("Failed to save notes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card-modern h-full flex flex-col">

      <h2 className="card-title">
        <span className="card-number">⑥</span> Doctor Notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="complaint-textarea"
        placeholder="Add clinical observations, assessments, and important notes..."
      />

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="btn-indigo-gradient mt-4 w-full"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>

    </div>
  );
}