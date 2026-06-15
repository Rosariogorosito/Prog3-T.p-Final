import { Router } from "express";
import * as controller from "../controllers/estadisticas-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get(
  "/",
  verifyToken,
  requireRole(3),
  controller.getEstadisticas
);

export default router;