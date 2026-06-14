import { Router } from "express";
import * as controller from "../obras-sociales-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

router.get("/", controller.getAll);

router.get(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser numérico"),
  validate,
  controller.getById
);

router.post(
  "/",
  [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),

    body("descripcion")
      .notEmpty()
      .withMessage("La descripción es obligatoria"),

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
  [
    param("id")
      .isInt()
      .withMessage("El ID debe ser un número entero"),

    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),

    body("descripcion")
      .notEmpty()
      .withMessage("La descripción es obligatoria"),

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
  [
    param("id")
      .isInt()
      .withMessage("El ID debe ser un número entero"),

    validate
  ],
  controller.remove
);

export default router;