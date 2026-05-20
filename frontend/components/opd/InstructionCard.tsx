interface Props {
  instructions: any[];
}

export default function InstructionCard({
  instructions,
}: Props) {

  return (
    <div className="bg-white border rounded-lg p-4 mt-4">

      <h2 className="font-semibold mb-4">
        4B. Patient Instructions
      </h2>

      <ul className="list-disc ml-6">

        {instructions.map((item) => (

          <li key={item.instruction_id}>
            {item.instruction}
          </li>

        ))}

      </ul>

    </div>
  );
}