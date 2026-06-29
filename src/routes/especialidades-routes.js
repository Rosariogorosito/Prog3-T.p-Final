import { Router } from "express";
import * as controller from "../especialidades-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, requireRole(2, 3), controller.getAll);

router.get(
  "/:id",
  verifyToken,
  requireRole(2, 3),
  param("id").isInt().withMessage("El ID debe ser numérico"),
  validate,
  controller.getById
);

router.post(
  "/",
  verifyToken,
  requireRole(3),
  [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre de la especialidad es obligatorio")
      .isLength({ max: 120 })
      .withMessage("El nombre no puede tener más de 120 caracteres"),
    validate
  ],
  controller.create
);

router.put(
  "/:id",
  verifyToken,
  requireRole(3),
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    body("nombre")
      .notEmpty()
      .withMessage("El nombre de la especialidad es obligatorio")
      .isLength({ max: 120 })
      .withMessage("El nombre no puede tener más de 120 caracteres"),
    validate
  ],
  controller.update
);

router.delete(
  "/:id",
  verifyToken,
  requireRole(3),
  [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    validate
  ],
  controller.remove
);

export default router;