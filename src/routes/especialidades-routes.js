import { Router } from "express";
import * as controller from "../especialidades-controller.js";
import { param } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

router.get("/", controller.getAll);

router.get(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser numérico"),
  validate,
  controller.getById
);

export default router;