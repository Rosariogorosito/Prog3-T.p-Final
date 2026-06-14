import express from "express";
import * as controller from "../controllers/auth-controller.js";
import { body } from "express-validator";
import validate from "../db/validate.js";

const router = express.Router();

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