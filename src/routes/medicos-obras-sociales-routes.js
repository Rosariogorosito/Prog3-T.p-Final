import { Router } from "express";
import * as controller from "../medicos-obras-sociales-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

router.get("/", controller.getAll);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("El ID debe ser numérico"),
  validate,
  controller.getById
);

router.post(
  "/",
  [
    body("id_medico")
      .isInt()
      .withMessage("El id_medico debe ser numérico"),

    body("id_obra_social")
      .isInt()
      .withMessage("El id_obra_social debe ser numérico"),

    validate
  ],
  controller.create
);

router.delete(
  "/:id",
  [
    param("id")
      .isInt()
      .withMessage("El ID debe ser numérico"),

    validate
  ],
  controller.remove
);

export default router;