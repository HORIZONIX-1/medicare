"use client";

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

  return (
    <div className="card-modern h-full flex flex-col">

      <h2 className="card-title">
        <span className="card-number">⑥</span> Doctor Notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) => onChange?.(e.target.value)}
        className="complaint-textarea"
        placeholder="Add clinical observations, assessments, and important notes..."
      />

    </div>
  );
}