import { Router } from "express";
import * as controller from "../obras-sociales-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";
import { verifyToken, requireRole } from "../../middlewares/auth.js";

const router = Router();

router.get("/", verifyToken, requireRole(3), controller.getAll);

router.get(
  "/:id",
  verifyToken,
  requireRole(3),
  param("id").isInt().withMessage("El ID debe ser numérico"),
  validate,
  controller.getById
);

router.post(
  "/",
  verifyToken,
  requireRole(3),
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
    body("porcentaje_descuento")
      .isNumeric()
      .withMessage("El porcentaje debe ser numérico"),
    body("es_particular")
      .isInt()
      .withMessage("El valor debe ser numérico"),
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
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
    body("porcentaje_descuento")
      .isNumeric()
      .withMessage("El porcentaje debe ser numérico"),
    body("es_particular")
      .isInt()
      .withMessage("El valor debe ser numérico"),
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