import { Router } from "express";
import * as controller from "../controllers/pacientes-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";
import upload from "../../middlewares/multer.js";

const router = Router();

router.get("/me", verifyToken, requireRole(2), controller.getMyProfile);

router.get("/me/turnos", verifyToken, requireRole(2), controller.getMyTurnos);

router.post("/me/reservas", verifyToken, requireRole(2, 3), controller.createReserva);

router.put("/:id/obra-social", verifyToken, requireRole(3), controller.updateObraSocial);

router.post(
  "/foto",
  verifyToken,
  upload.single("foto"),
  controller.subirFoto
);

export default router;