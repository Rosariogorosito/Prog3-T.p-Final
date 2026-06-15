import { Router } from "express";
import * as controller from "../controllers/medicos-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/", controller.getAll);

router.get(
  "/especialidad/:id",
  controller.getByEspecialidad
);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

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


router.post(
  "/obras-sociales",
  controller.asignarObraSocial
);

export default router;