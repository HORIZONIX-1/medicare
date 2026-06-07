import PatientProfileView from "@/components/patients/PatientProfileView";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReceptionistPatientProfilePage({ params }: Props) {
  const { id } = await params;

  return <PatientProfileView patientIdOrCode={id} backHref="/receptionist/patients" />;
}
