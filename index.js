import express from "express";
import cors from "cors";
import morgan from "morgan";

import especialidadesRoutes from "./src/routes/especialidades-routes.js";
import obrasSocialesRoutes from "./src/routes/obras-sociales-routes.js";
import medicosRoutes from "./src/routes/medicos-routes.js";
import authRoutes from "./src/routes/auth-routes.js";
import pacientesRoutes from "./src/routes/pacientes-routes.js";
import turnosRoutes from "./src/routes/turnos-routes.js";
import estadisticasRoutes from "./src/routes/estadisticas-routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/especialidades", especialidadesRoutes);
app.use("/obras-sociales", obrasSocialesRoutes);
app.use("/medicos", medicosRoutes);
app.use("/auth", authRoutes);
app.use("/pacientes", pacientesRoutes);
app.use("/turnos", turnosRoutes);
app.use("/estadisticas", estadisticasRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});