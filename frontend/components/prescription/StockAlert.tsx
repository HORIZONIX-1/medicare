interface Props {
  status?: string;
  quantity?: number;
}

export default function StockAlert({ status, quantity }: Props) {
  if (!status) return null;

  if (status === "OUT_OF_STOCK") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded border border-red-200 bg-red-50 text-red-700">
        Out of Stock
      </span>
    );
  }

  if (status === "LOW_STOCK") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded border border-amber-200 bg-amber-50 text-amber-700">
        {quantity !== undefined ? `Low Stock (${quantity})` : "Low Stock"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded border border-emerald-200 bg-emerald-50 text-emerald-700">
      In Stock
    </span>
  );
}