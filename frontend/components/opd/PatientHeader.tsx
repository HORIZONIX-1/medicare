interface Props {
  patient: any;
}

export default function PatientHeader({
  patient,
}: Props) {

  return (
    <div className="patient-header">

      <div className="patient-header-content">

        <div>

          <h2 className="patient-header-title">
            {patient.name}
          </h2>

          <div className="patient-info-list">
            <div className="patient-info-item">
              <span className="patient-info-label">Patient ID:</span>
              <span className="patient-info-value">
                {patient.patient_code}
              </span>
            </div>

            <div className="patient-info-item">
              <span className="patient-info-label">Phone:</span>
              <span className="patient-info-value-secondary">
                {patient.phone}
              </span>
            </div>
          </div>

        </div>

        <div className="patient-status-container">
          <div className="patient-status-badge">
            Active Consultation
          </div>
        </div>

      </div>

    </div>
  );
}