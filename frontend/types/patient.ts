export interface Patient {
  patient_id: number;
  patient_code: string;

  name: string;
  gender: string;

  date_of_birth: string;

  nic?: string;
  phone?: string;
  address?: string;
}
