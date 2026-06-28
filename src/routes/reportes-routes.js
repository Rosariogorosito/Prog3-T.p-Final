import { Router } from "express";
import { generarReportePDF } from "../controllers/reportes-controller.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/pdf", verifyToken, requireRole(3), generarReportePDF);

export default router;
