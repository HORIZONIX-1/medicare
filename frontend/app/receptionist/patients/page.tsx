import React from "react";
import PatientSearch from "../../../components/receptionist/PatientSearch";
import ReceptionistShell from "../../../components/receptionist/ReceptionistShell";

export const metadata = {
  title: "Patient Search",
};

export default function PatientsPage() {
	return (
		<ReceptionistShell title="Patient Search">
			<PatientSearch />
		</ReceptionistShell>
	);
}
