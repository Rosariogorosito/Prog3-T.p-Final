import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { parse } from "yaml";
import especialidadesRoutes from "./src/routes/especialidades-routes.js";
import obrasSocialesRoutes from "./src/routes/obras-sociales-routes.js";
import medicosRoutes from "./src/routes/medicos-routes.js";
import authRoutes from "./src/routes/auth-routes.js";
import pacientesRoutes from "./src/routes/pacientes-routes.js";
import turnosRoutes from "./src/routes/turnos-routes.js";
import informesRoutes from "./src/routes/informes-routes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());

// Swagger
const swaggerDocument = parse(readFileSync("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(morgan("dev"));

app.use("/especialidades", especialidadesRoutes);
app.use("/obras-sociales", obrasSocialesRoutes);
app.use("/medicos", medicosRoutes);
app.use("/auth", authRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/turnos", turnosRoutes);
app.use("/informes", informesRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
  console.log("Documentación disponible en http://localhost:3000/api-docs");
});
