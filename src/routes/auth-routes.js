import { Router } from "express";
import * as controller from "../auth-controller.js";
import { body } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

// POST /auth/login
router.post(
  "/login",
  [
    body("email")
      .notEmpty().withMessage("El email es obligatorio")
      .isEmail().withMessage("El email no tiene formato válido"),
    body("contrasenia")
      .notEmpty().withMessage("La contraseña es obligatoria"),
    validate,
  ],
  controller.login
);

export default router;
