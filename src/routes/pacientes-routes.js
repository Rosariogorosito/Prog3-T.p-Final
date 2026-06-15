import { Router } from "express";
import * as controller from "../controllers/pacientes-controller.js";
import { body, param } from "express-validator";
import validate from "../db/connection.js";


const router = Router();

router.get(
  "/",
  controller.getAll
);

router.patch(
  "/:id/obra-social",
  [
    param("id").isInt({ min: 1 }).withMessage("El ID del paciente debe ser un entero positivo"),
    body("id_obra_social")
      .notEmpty().withMessage("La obra social es obligatoria")
      .isInt({ min: 1 }).withMessage("El ID de obra social debe ser un entero positivo"),
    validate,
  ],
  controller.updateObraSocial
);

router.get(
  "/me",
  controller.getMyProfile
);

router.get(
  "/me/turnos",
  controller.getMyTurnos
);

router.post(
  "/me/reservas",
  [
    body("id_medico")
      .notEmpty().withMessage("El médico es obligatorio")
      .isInt({ min: 1 }).withMessage("El ID del médico debe ser un entero positivo"),
    body("id_obra_social")
      .notEmpty().withMessage("La obra social es obligatoria")
      .isInt({ min: 1 }).withMessage("El ID de obra social debe ser un entero positivo"),
    body("fecha_hora")
      .notEmpty().withMessage("La fecha y hora son obligatorias")
      .isISO8601().withMessage("La fecha debe tener formato válido (ej: 2025-07-20T10:30:00)"),
    validate,
  ],
  controller.createReserva
);

export default router;
