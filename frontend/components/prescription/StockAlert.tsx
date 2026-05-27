interface Props {
  status?: string;

  quantity?: number;
}

export default function StockAlert({
  status,
  quantity,
}: Props) {

  if (!status) return null;

  if (status === "OUT_OF_STOCK") {

    return (
      <div className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-300">

        Out of Stock

      </div>
    );
  }

  if (status === "LOW_STOCK") {

    return (
      <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">

        Only {quantity} remaining

      </div>
    );
  }

  return (
    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">

      In Stock

    </div>
  );
}