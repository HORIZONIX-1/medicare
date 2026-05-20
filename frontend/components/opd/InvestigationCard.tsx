interface Props {
  investigations: any[];
}

export default function InvestigationCard({
  investigations,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4">

      <h2 className="font-semibold mb-4">
        4A. Investigations
      </h2>

      <div className="space-y-3">

        {investigations.map((item) => (

          <div
            key={item.investigation_id}
            className="border rounded p-3"
          >

            <p className="font-medium">
              {item.title}
            </p>

            <p className="text-sm text-gray-600">
              {item.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}