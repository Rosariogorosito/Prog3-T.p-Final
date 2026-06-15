import { Router } from "express";
import * as controller from "../controllers/turnos-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  requireRole(3),
  controller.create
);

export default router;