# Postman tests — Prescription model

Prerequisites:

- Backend running at `http://localhost:4000` (or set `{{baseUrl}}` in Postman environment).
- A valid JWT token stored in `{{authToken}}` (get via `/auth/login`).
- A valid `consultation_id` that exists in the DB (used when creating a prescription).

Postman environment variables (recommended):

- `baseUrl` = `http://localhost:4000`
- `authToken` = (filled after login request)
- `createdPrescriptionId` = (set by Create request tests)

Requests (collection folder: "Prescriptions"):

1) Login (set token)

- Method: POST
- URL: `{{baseUrl}}/auth/login`
- Body (raw JSON):

```
{
  "email": "doctor@example.com",
  "password": "password"
}
```

Tests (Postman Tests tab):

```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
const json = pm.response.json();
if (json?.token) pm.environment.set("authToken", json.token);
```

2) Create Prescription

- Method: POST
- URL: `{{baseUrl}}/prescriptions`
- Headers:
  - `Authorization: Bearer {{authToken}}`
  - `Content-Type: application/json`
- Body (raw JSON example) — change `consultation_id` to an existing consultation:

```
{
  "consultation_id": 1,
  "total_amount": 150.0,
  "items": [
    {
      "drug_id": "1",
      "drug_name": "Paracetamol",
      "dosage": "500mg",
      "quantity": 2,
      "price": 50,
      "is_outside_drug": false
    },
    {
      "drug_name": "Cough Syrup",
      "dosage": "10ml",
      "quantity": 1,
      "price": 50,
      "is_outside_drug": true
    }
  ]
}
```

Tests (Postman Tests tab):

```javascript
pm.test("Status is 201", () => pm.response.to.have.status(201));
const json = pm.response.json();
pm.test("returns prescription_id", () => pm.expect(json).to.have.property('prescription_id'));
pm.test("returns items array", () => pm.expect(json).to.have.property('items'));
pm.test("items length matches", () => pm.expect(json.items.length).to.eql(2));
// save id for follow-up request
if (json?.prescription_id) pm.environment.set('createdPrescriptionId', json.prescription_id);
```

3) Get Prescription

- Method: GET
- URL: `{{baseUrl}}/prescriptions/{{createdPrescriptionId}}`
- Headers:
  - `Authorization: Bearer {{authToken}}`

Tests (Postman Tests tab):

```javascript
pm.test("Status is 200", () => pm.response.to.have.status(200));
const json = pm.response.json();
pm.test("has prescription_id", () => pm.expect(json).to.have.property('prescription_id'));
pm.test("has items", () => pm.expect(json).to.have.property('items'));
```

Notes and troubleshooting:

- Ensure `consultation_id` exists (create a consultation first via `/consultations/start` if needed).
- If you receive `401 Invalid token`, re-run the Login request and check `authToken` environment variable.
- If Create returns `500` check backend logs; the created prescription will be returned with `items` included.

Running tests from CLI (optional):

1) Export the Postman collection and environment to JSON files (`prescriptions.postman_collection.json` and `prescriptions.env.json`).
2) Run with Newman:

```bash
newman run prescriptions.postman_collection.json -e prescriptions.env.json
```

Expected outcomes:

- Create Prescription returns `201` and a `prescription_id` with `items`.
- Get Prescription returns `200` with the same `prescription_id` and included `items` and `consultation` (patient & doctor info).
