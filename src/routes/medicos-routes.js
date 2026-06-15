import { Router } from "express";
import * as controller from "../controllers/medicos-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get(
  "/",
  controller.getAll
);

router.get(
  "/especialidad/:id",
  verifyToken,
  requireRole(3),
  controller.getByEspecialidad
);

router.get(
  "/:id",
  verifyToken,
  requireRole(3),
  controller.getById
);

router.post(
  "/",
  verifyToken,
  requireRole(3),
  controller.create
);

router.put(
  "/:id",
  verifyToken,
  requireRole(3),
  controller.update
);

router.delete(
  "/:id",
  verifyToken,
  requireRole(3),
  controller.remove
);

router.post(
  "/obras-sociales",
  verifyToken,
  requireRole(3),
  controller.asignarObraSocial
);

router.get(
  "/me/turnos",
  verifyToken,
  requireRole(1),
  controller.getMyTurnos
);

router.patch(
  "/turnos/:id/atendido",
  verifyToken,
  requireRole(1),
  controller.marcarAtendido
);

export default router;