import express from "express";
import * as controller from "../controllers/turnos-reservas-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = express.Router();

/*
  Roles:
  1 = Médico
  2 = Paciente
  3 = Administrador
*/

router.get("/", verifyToken, requireRole(3), controller.getAll);

router.get(
  "/paciente/:id_paciente",
  verifyToken,
  requireRole(2, 3),
  controller.getByPaciente
);

router.get(
  "/medico/:id_medico",
  verifyToken,
  requireRole(1, 3),
  controller.getByMedico
);

router.get("/:id", verifyToken, requireRole(1, 2, 3), controller.getById);

router.post("/", verifyToken, requireRole(3), controller.create);

router.put(
  "/:id/atendido",
  verifyToken,
  requireRole(1, 3),
  controller.marcarAtendido
);

router.delete("/:id", verifyToken, requireRole(3), controller.remove);

export default router;