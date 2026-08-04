"use client";

interface Props {

  onPreview?: () => void;
}

export default function InvoiceActions({

  onPreview,
}: Props) {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={onPreview}
        className="btn-cyan"
      >
        Print
      </button>

    </div>
  );
}