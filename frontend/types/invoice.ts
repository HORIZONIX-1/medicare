export interface InvoiceItem {

  prescription_item_id: number;

  drug_name: string;

  quantity: number;

  price: number;

  total?: number;
}

export interface Invoice {

  invoice_id?: number;

  consultation_id: number;

  prescription_id: number;

  total_drug_cost: number;

  doctor_fee: number;

  discount: number;

  total_amount: number;

  is_patient_denied: boolean;

  prescription: {
    items: InvoiceItem[];
  };

  consultation: {
    patient: {
      name: string;

      patient_code: string;
    };
  };
}