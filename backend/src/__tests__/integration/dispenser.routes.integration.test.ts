import request from "supertest";
import jwt from "jsonwebtoken";
import express from "express";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

jest.mock("../../modules/dispenser/dashboard.service", () => ({
  __esModule: true,
  getAllMetrics: jest.fn(),
}));

jest.mock("../../modules/dispenser/alerts.service", () => ({
  __esModule: true,
  getLowStockAlerts: jest.fn(),
  getExpiryAlerts: jest.fn(),
  getOutOfStockAlerts: jest.fn(),
  getDamagedStockAlerts: jest.fn(),
}));

jest.mock("../../modules/dispenser/reports.service", () => ({
  __esModule: true,
  getInventorySummary: jest.fn(),
  getStockMovementReport: jest.fn(),
  getValueReport: jest.fn(),
  getExpiryForecast: jest.fn(),
  getSupplierPerformance: jest.fn(),
}));

jest.mock("../../modules/dispenser/supplier.service", () => ({
  __esModule: true,
  createSupplier: jest.fn(),
  listSuppliers: jest.fn(),
  getSupplierById: jest.fn(),
  updateSupplier: jest.fn(),
  deleteSupplier: jest.fn(),
}));

jest.mock("../../modules/dispenser/dashboardMetric.service", () => ({
  __esModule: true,
  setMetric: jest.fn(),
  getMetric: jest.fn(),
  listMetrics: jest.fn(),
}));

import dashboardRoutes from "../../modules/dispenser/dashboard.routes";
import alertsRoutes from "../../modules/dispenser/alerts.routes";
import reportsRoutes from "../../modules/dispenser/reports.routes";
import supplierRoutes from "../../modules/dispenser/supplier.routes";
import metricRoutes from "../../modules/dispenser/dashboardMetric.routes";

import * as dashboardService from "../../modules/dispenser/dashboard.service";
import * as alertsService from "../../modules/dispenser/alerts.service";
import * as reportsService from "../../modules/dispenser/reports.service";
import * as supplierService from "../../modules/dispenser/supplier.service";
import * as metricService from "../../modules/dispenser/dashboardMetric.service";

const app = express();
app.use(express.json());
app.use("/api/v1/dispenser/dashboard", dashboardRoutes);
app.use("/api/v1/dispenser/alerts", alertsRoutes);
app.use("/api/v1/dispenser/reports", reportsRoutes);
app.use("/api/v1/dispenser/suppliers", supplierRoutes);
app.use("/api/v1/dispenser/metrics", metricRoutes);

const authToken = (role = "DISPENSER") =>
  jwt.sign({ user_id: 1, role }, process.env.JWT_SECRET as string);

describe("Dispenser route integration", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GET /api/v1/dispenser/dashboard/stats returns metrics", async () => {
    (dashboardService.getAllMetrics as jest.Mock).mockResolvedValue({ totalTypes: 10 });

    const res = await request(app)
      .get("/api/v1/dispenser/dashboard/stats")
      .set("Authorization", `Bearer ${authToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalTypes).toBe(10);
  });

  test("GET /api/v1/dispenser/alerts/low-stock returns alert list", async () => {
    (alertsService.getLowStockAlerts as jest.Mock).mockResolvedValue([{ drug_id: 1 }]);

    const res = await request(app)
      .get("/api/v1/dispenser/alerts/low-stock")
      .set("Authorization", `Bearer ${authToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([{ drug_id: 1 }]);
  });

  test("GET /api/v1/dispenser/reports/inventory-summary returns report", async () => {
    (reportsService.getInventorySummary as jest.Mock).mockResolvedValue({ totalDrugs: 5 });

    const res = await request(app)
      .get("/api/v1/dispenser/reports/inventory-summary")
      .set("Authorization", `Bearer ${authToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalDrugs).toBe(5);
  });

  test("POST /api/v1/dispenser/suppliers creates supplier", async () => {
    (supplierService.createSupplier as jest.Mock).mockResolvedValue({ supplier_id: 1, name: "Acme" });

    const res = await request(app)
      .post("/api/v1/dispenser/suppliers")
      .set("Authorization", `Bearer ${authToken()}`)
      .send({ name: "Acme", email: "a@acme.com" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Acme");
  });

  test("POST /api/v1/dispenser/metrics stores metric", async () => {
    (metricService.setMetric as jest.Mock).mockResolvedValue({ metric_key: "m1", metric_value: "12" });

    const res = await request(app)
      .post("/api/v1/dispenser/metrics")
      .set("Authorization", `Bearer ${authToken()}`)
      .send({ key: "m1", value: "12" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.metric_key).toBe("m1");
  });

  test("Role middleware blocks non-dispenser users", async () => {
    const res = await request(app)
      .get("/api/v1/dispenser/dashboard/stats")
      .set("Authorization", `Bearer ${authToken("DOCTOR")}`);

    expect(res.status).toBe(403);
  });
});
