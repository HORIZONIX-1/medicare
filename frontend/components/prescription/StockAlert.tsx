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
      <div className="text-red-600 font-semibold">

        ❌ Out of Stock

      </div>
    );
  }

  if (status === "LOW_STOCK") {

    return (
      <div className="text-yellow-600 font-semibold">

        ⚠ Only {quantity} remaining

      </div>
    );
  }

  return (
    <div className="text-green-600 font-semibold">

      ✅ In Stock

    </div>
  );
}