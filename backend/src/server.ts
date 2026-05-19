import "./config/env-loader";
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import patientRoutes from "./modules/patients/patient.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { roleMiddleware } from "./middleware/role.middleware";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

app.get("/", (_req, res) => res.json({ message: "API is running" }));

app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);

// Example protected routes for each role
app.get(
	"/protected/admin",
	authMiddleware,
	roleMiddleware("ADMIN"),
	(_req, res) => res.json({ message: "Admin access granted" })
);

app.get(
	"/protected/doctor",
	authMiddleware,
	roleMiddleware("DOCTOR"),
	(_req, res) => res.json({ message: "Doctor access granted" })
);

app.get(
	"/protected/receptionist",
	authMiddleware,
	roleMiddleware("RECEPTIONIST"),
	(_req, res) => res.json({ message: "Receptionist access granted" })
);

app.get(
	"/protected/dispenser",
	authMiddleware,
	roleMiddleware("DISPENSER"),
	(_req, res) => res.json({ message: "Dispenser access granted" })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on port ${PORT}`);
});

export default app;
