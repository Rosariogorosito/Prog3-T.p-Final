import express from "express";
import especialidadesRoutes from "./src/routes/especialidades-routes.js";

const app = express();

app.use(express.json());

app.use("/especialidades", especialidadesRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});