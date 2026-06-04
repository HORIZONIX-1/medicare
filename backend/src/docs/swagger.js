const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const openapiDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Horizonix Medicare API",
    version: "1.0.0",
    description: "Backend APIs for dispenser module including dashboard, stock, alerts, reports, suppliers, and metrics.",
  },
  servers: [{ url: "http://localhost:4000", description: "Local" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/v1/dispenser/dashboard/stats": {
      get: { summary: "Get dispenser dashboard metrics", tags: ["Dispenser Dashboard"] },
    },
    "/api/v1/dispenser/alerts/low-stock": {
      get: { summary: "Get low stock alerts", tags: ["Dispenser Alerts"] },
    },
    "/api/v1/dispenser/reports/inventory-summary": {
      get: { summary: "Get inventory summary report", tags: ["Dispenser Reports"] },
    },
    "/api/v1/dispenser/suppliers": {
      get: { summary: "List suppliers", tags: ["Dispenser Suppliers"] },
      post: { summary: "Create supplier", tags: ["Dispenser Suppliers"] },
    },
    "/api/v1/dispenser/metrics": {
      get: { summary: "List dashboard metrics cache", tags: ["Dispenser Metrics"] },
      post: { summary: "Set dashboard metric cache", tags: ["Dispenser Metrics"] },
    },
  },
};

const specs = swaggerJsdoc({
  definition: openapiDefinition,
  apis: [],
});

const setupSwagger = (app) => {
  app.get("/api-docs.json", (_req, res) => {
    res.json(specs);
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = {
  setupSwagger,
};
