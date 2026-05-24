"use client";

import { useEffect, useState } from "react";

// client-only controlled component

interface Props {
  consultation?: any;
  value?: string;
  onChange?: (value: string) => void;
}

export default function DoctorNotesCard({
  consultation,
  value,
  onChange,
}: Props) {
  const notes = value ?? consultation?.notes ?? "";
  const [isEditing, setIsEditing] = useState(!notes.trim());

  useEffect(() => {
    if (!notes.trim()) {
      setIsEditing(true);
    }
  }, [notes]);

  return (
    <div className="card-modern h-full flex flex-col">

      <div className="flex items-center justify-between gap-3">
        <h2 className="card-title">
          <span className="card-number">⑥</span> Doctor Notes
        </h2>
        {notes.trim() && !isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="btn-cyan">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={notes}
          onChange={(e) => onChange?.(e.target.value)}
          className="complaint-textarea"
          placeholder="Add clinical observations, assessments, and important notes..."
        />
      ) : (
        <div className="complaint-textarea whitespace-pre-wrap text-slate-100">
          {notes}
        </div>
      )}

    </div>
  );
}