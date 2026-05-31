export interface Consultation {
  consultation_id: number;

  chief_complaint?: string;

  notes?: string;

  patient: {
    patient_id: number;
    patient_code: string;

    name: string;
    gender: string;

    phone?: string;
    allergies: any[];
  };

  symptoms: ConsultationSymptom[];

  examinations: Examination[];

  investigations: Investigation[];

  instructions: PatientInstruction[];

  diagnoses: Diagnosis[];
}

export interface ConsultationSymptom {
  consultation_symptom_id: number;

  severity?: number;

  duration_value?: number;

  duration_unit?: string;

  symptom: {
    symptom_id: number;
    name: string;
  };
}

export interface Examination {
  examination_id: number;

  title: string;

  result: string;
}

export interface Investigation {
  investigation_id: number;

  title: string;

  description?: string;
}

export interface PatientInstruction {
  instruction_id: number;

  instruction: string;
}

export interface Diagnosis {
  diagnosis_id: number;

  diagnosis_name: string;

  notes?: string;
}