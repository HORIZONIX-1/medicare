import React from "react";
import ReceptionistShell from "../../../../components/receptionist/ReceptionistShell";
import RegisterPatient from "../../../../components/receptionist/RegisterPatient";

export const metadata = {
  title: "Patient Registration",
};

export default function RegisterPatientPage() {
  return (
    <ReceptionistShell title="Register Patient">
      <RegisterPatient />
    </ReceptionistShell>
  );
}
