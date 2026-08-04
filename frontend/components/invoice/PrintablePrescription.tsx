"use client";

import React from "react";

interface Props {
	prescription: any;
}

const PrintablePrescription =
	React.forwardRef<
		HTMLDivElement,
		Props
	>(({ prescription }, ref) => {

	const patient =
		prescription?.consultation?.patient;

	return (
		<div
			ref={ref}
			className="bg-white p-10 text-black"
			style={{
				width: "800px",
			}}
		>

			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold">
					Medicare Medical Center
				</h1>
				<p>Negombo, Sri Lanka</p>
				<p>Tel: 0771234567</p>
			</div>

			<hr className="mb-6" />

			<div className="mb-6">
				<h2 className="font-bold text-xl mb-3">
					Prescription Details
				</h2>

				<p>
					Prescription ID:{" "}
					{prescription?.prescription_id ?? "-"}
				</p>

				<p>
					Consultation ID:{" "}
					{prescription?.consultation_id ?? "-"}
				</p>

				<p>
					Patient:{" "}
					{patient?.name ?? "-"}
				</p>

				<p>
					Patient ID:{" "}
					{patient?.patient_code ?? "-"}
				</p>
			</div>

			<table className="w-full border mb-6">
				<thead>
					<tr className="bg-gray-100">
						<th className="border p-2">Drug</th>
						<th className="border p-2">Dosage</th>
						<th className="border p-2">Frequency</th>
						<th className="border p-2">Duration</th>
						<th className="border p-2">Qty</th>
					</tr>
				</thead>

				<tbody>
					{(prescription?.items ?? []).map((item: any) => (
						<tr key={item.prescription_item_id ?? item.drug_name}>
							<td className="border p-2">
								<div className="font-medium">{item.drug_name}</div>
								<div className="text-xs text-gray-500">
									{item.is_outside_drug ? "Outside drug" : "Stock drug"}
								</div>
							</td>
							<td className="border p-2">{item.dosage || "-"}</td>
							<td className="border p-2">{item.frequency || "-"}</td>
							<td className="border p-2">{item.duration || "-"}</td>
							<td className="border p-2">{item.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="mb-6">
				<h3 className="font-bold text-lg mb-2">Instructions</h3>
				<div className="space-y-2 text-sm">
					{(prescription?.items ?? []).map((item: any) => (
						<div key={`instructions-${item.prescription_item_id ?? item.drug_name}`}>
							<div className="font-semibold">{item.drug_name}</div>
							<div>{item.instruction_1 || "-"}</div>
							<div>{item.instruction_2 || "-"}</div>
							<div>{item.instruction_3 || "-"}</div>
						</div>
					))}
				</div>
			</div>

			<div className="mt-12 text-center text-sm">
				<p>Thank you for visiting our clinic.</p>
				<p>Follow the prescription carefully.</p>
			</div>

		</div>
	);
});

PrintablePrescription.displayName =
	"PrintablePrescription";

export default PrintablePrescription;
