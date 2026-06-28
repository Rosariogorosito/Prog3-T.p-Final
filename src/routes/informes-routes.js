import { Router } from "express";
import * as controller from "../controllers/informes-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get(
  "/turnos-por-especialidad",
  verifyToken,
  requireRole(3),
  controller.reporteTurnosPorEspecialidad
);

export default router;