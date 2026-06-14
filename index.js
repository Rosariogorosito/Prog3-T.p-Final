import express from "express";
import especialidadesRoutes from "./src/routes/especialidades-routes.js";
import pacientesRoutes from "./src/routes/pacientes-routes.js";
import authRoutes from "./src/routes/auth-routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);  
app.use("/especialidades", especialidadesRoutes);
app.use("/pacientes", pacientesRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});