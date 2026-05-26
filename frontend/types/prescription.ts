export interface PrescriptionItem {

  drug_id?: number;

  drug_name: string;

  dosage?: string;

  instruction_1?: string;
  instruction_2?: string;
  instruction_3?: string;

  frequency?: string;

  duration?: string;

  quantity: number;

  price: number;

  is_outside_drug: boolean;

  available_quantity?: number;

  stock_status?: string;
}