(async ()=>{
  const base = 'http://localhost:4000';

  const loginRes = await fetch(base + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'doctor@example.com', password: 'password' }),
  });

  const loginJson = await loginRes.json().catch(() => null);
  console.log('LOGIN', loginRes.status, loginJson);

  const token = loginJson?.token;

  const body = {
    consultation_id: 1,
    total_amount: 150.0,
    items: [
      { drug_id: '1', drug_name: 'Paracetamol', dosage: '500mg', quantity: 2, price: 50, is_outside_drug: false },
      { drug_name: 'Cough Syrup', dosage: '10ml', quantity: 1, price: 50, is_outside_drug: true },
    ],
  };

  const createRes = await fetch(base + '/prescriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(body),
  });

  const text = await createRes.text();
  console.log('CREATE', createRes.status, text);

})().catch(e=>{console.error('SCRIPT ERROR', e); process.exit(1);});