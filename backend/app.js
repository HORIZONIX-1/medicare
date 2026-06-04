const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  try {
    require("ts-node/register");
  } catch (_error) {
    // Development can still run compiled routes if they already exist.
  }
}

const loadEnv = () => {
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf8");

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnv();

const unwrapModule = (moduleValue) => moduleValue.default || moduleValue;

const loadRoute = (developmentPath, productionPath) => {
  const modulePath = isProduction ? productionPath : developmentPath;

  try {
    return unwrapModule(require(modulePath));
  } catch (error) {
    if (isProduction && error.code === "MODULE_NOT_FOUND") {
      throw new Error(
        `Route module not found at ${modulePath}. Run "npm run build" before starting in production.`
      );
    }

    throw error;
  }
};

const authRoutes = loadRoute("./src/modules/auth/auth.routes.ts", "./dist/src/modules/auth/auth.routes");
const patientRoutes = loadRoute(
  "./src/modules/patients/patient.routes.ts",
  "./dist/src/modules/patients/patient.routes"
);
const consultationRoutes = loadRoute(
  "./src/modules/consultations/consultation.routes.ts",
  "./dist/src/modules/consultations/consultation.routes"
);
const symptomRoutes = loadRoute(
  "./src/modules/symptoms/symptom.routes.ts",
  "./dist/src/modules/symptoms/symptom.routes"
);
const examinationRoutes = loadRoute(
  "./src/modules/examinations/examination.routes.ts",
  "./dist/src/modules/examinations/examination.routes"
);
const investigationRoutes = loadRoute(
  "./src/modules/investigations/investigation.routes.ts",
  "./dist/src/modules/investigations/investigation.routes"
);
const instructionRoutes = loadRoute(
  "./src/modules/instructions/instruction.routes.ts",
  "./dist/src/modules/instructions/instruction.routes"
);
const diagnoseRoutes = loadRoute(
  "./src/modules/diagnoses/diagnose.routes.ts",
  "./dist/src/modules/diagnoses/diagnose.routes"
);
const prescriptionRoutes = loadRoute(
  "./src/modules/prescriptions/prescription.routes.ts",
  "./dist/src/modules/prescriptions/prescription.routes"
);
const drugRoutes = loadRoute(
  "./src/modules/drugs/drug.routes.ts",
  "./dist/src/modules/drugs/drug.routes"
);
const stockRoutes = loadRoute(
  "./src/modules/stock/stock.routes.ts",
  "./dist/src/modules/stock/stock.routes"
);
const invoiceRoutes = loadRoute(
  "./src/modules/invoices/invoice.routes.ts",
  "./dist/src/modules/invoices/invoice.routes"
);
const adminAuthRoutes = loadRoute(
  "./src/modules/admin/auth/auth.routes.js",
  "./src/modules/admin/auth/auth.routes.js"
);
const adminUserRoutes = loadRoute(
  "./src/modules/admin/users/user.routes.js",
  "./src/modules/admin/users/user.routes.js"
);
const adminDashboardRoutes = loadRoute(
  "./src/modules/admin/dashboard/dashboard.routes.js",
  "./src/modules/admin/dashboard/dashboard.routes.js"
);
const dispenserDashboardRoutes = loadRoute(
  "./src/modules/dispenser/dashboard.routes.ts",
  "./dist/src/modules/dispenser/dashboard.routes"
);
const dispenserAlertsRoutes = loadRoute(
  "./src/modules/dispenser/alerts.routes.ts",
  "./dist/src/modules/dispenser/alerts.routes"
);
const dispenserReportsRoutes = loadRoute(
  "./src/modules/dispenser/reports.routes.ts",
  "./dist/src/modules/dispenser/reports.routes"
);
const adminOrganizationRoutes = loadRoute(
  "./src/modules/admin/organization/organization.routes.js",
  "./src/modules/admin/organization/organization.routes.js"
);
const adminAuditRoutes = loadRoute(
  "./src/modules/admin/audit/audit.routes.js",
  "./src/modules/admin/audit/audit.routes.js"
);
const { authMiddleware } = loadRoute(
  "./src/middleware/auth.middleware.ts",
  "./dist/src/middleware/auth.middleware"
);
const { roleMiddleware } = loadRoute(
  "./src/middleware/role.middleware.ts",
  "./dist/src/middleware/role.middleware"
);

const createCorsOptions = () => {
  const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  };
};

const app = express();
const apiPrefix = process.env.API_PREFIX || "";

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors(createCorsOptions()));
app.options(/.*/, cors(createCorsOptions()));
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || "1mb" }));
app.use(express.urlencoded({ extended: true, limit: process.env.URLENCODED_BODY_LIMIT || "1mb" }));
app.use(morgan(isProduction ? "combined" : "dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Medical Center Admin API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/patients`, patientRoutes);
app.use(`${apiPrefix}/consultations`, consultationRoutes);
app.use(`${apiPrefix}/symptoms`, symptomRoutes);
app.use(`${apiPrefix}/examinations`, examinationRoutes);
app.use(`${apiPrefix}/investigations`, investigationRoutes);
app.use(`${apiPrefix}/instructions`, instructionRoutes);
app.use(`${apiPrefix}/diagnoses`, diagnoseRoutes);
app.use(`${apiPrefix}/prescriptions`, prescriptionRoutes);
app.use(`${apiPrefix}/drugs`, drugRoutes);
app.use(`${apiPrefix}/stock`, stockRoutes);
app.use(`${apiPrefix}/invoices`, invoiceRoutes);
app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/admin/users", adminUserRoutes);
app.use("/api/v1/admin/dashboard", adminDashboardRoutes);
app.use("/api/v1/admin/organization", adminOrganizationRoutes);
app.use("/api/v1/admin/audit-logs", adminAuditRoutes);
app.use("/api/v1/dispenser/dashboard", dispenserDashboardRoutes);
app.use("/api/v1/dispenser/alerts", dispenserAlertsRoutes);
app.use("/api/v1/dispenser/reports", dispenserReportsRoutes);

app.get(`${apiPrefix}/protected/admin`, authMiddleware, roleMiddleware("ADMIN"), (_req, res) => {
  res.json({ message: "Admin access granted" });
});

app.get(`${apiPrefix}/protected/doctor`, authMiddleware, roleMiddleware("DOCTOR"), (_req, res) => {
  res.json({ message: "Doctor access granted" });
});

app.get(`${apiPrefix}/protected/receptionist`, authMiddleware, roleMiddleware("RECEPTIONIST"), (_req, res) => {
  res.json({ message: "Receptionist access granted" });
});

app.get(`${apiPrefix}/protected/dispenser`, authMiddleware, roleMiddleware("DISPENSER"), (_req, res) => {
  res.json({ message: "Dispenser access granted" });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || error.status || 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message: isServerError && isProduction ? "Internal server error" : error.message,
    ...(error.details ? { details: error.details } : {}),
    ...(isProduction ? {} : { stack: error.stack }),
  });
});

module.exports = app;
