import { Router } from "express";
import * as controller from "../controllers/pacientes-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/me", verifyToken, requireRole(2), controller.getMyProfile);

router.get("/me/turnos", verifyToken, requireRole(2), controller.getMyTurnos);

router.post("/me/reservas", verifyToken, requireRole(2), controller.createReserva);

router.put("/:id/obra-social", verifyToken, requireRole(3), controller.updateObraSocial);

export default router;