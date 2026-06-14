import { Router } from "express";
import * as controller from "../pacientes-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";

// IMPORTANTE: reemplazá esta línea con el import real de tu middleware JWT
// Ejemplo: import { verifyToken, requireRole } from "../middlewares/auth.js";
// El middleware debe dejar disponible req.user.id_usuario y req.user.rol

// Roles según el TP:
//   ROL 1 = Médico | ROL 2 = Paciente | ROL 3 = Administrador

const router = Router();

// ─── ADMIN (ROL 3) ────────────────────────────────────────────────────────────

// GET /pacientes — listar todos los pacientes
// Proteger con: verifyToken, requireRole(3)
router.get(
  "/",
  // verifyToken, requireRole(3),
  controller.getAll
);

// PATCH /pacientes/:id/obra-social — asociar obra social a un paciente
// Proteger con: verifyToken, requireRole(3)
router.patch(
  "/:id/obra-social",
  [
    // verifyToken, requireRole(3),
    param("id").isInt({ min: 1 }).withMessage("El ID del paciente debe ser un entero positivo"),
    body("id_obra_social")
      .notEmpty().withMessage("La obra social es obligatoria")
      .isInt({ min: 1 }).withMessage("El ID de obra social debe ser un entero positivo"),
    validate,
  ],
  controller.updateObraSocial
);

// ─── PACIENTE (ROL 2) ─────────────────────────────────────────────────────────

// GET /pacientes/me — ver perfil propio
// Proteger con: verifyToken, requireRole(2)
router.get(
  "/me",
  // verifyToken, requireRole(2),
  controller.getMyProfile
);

// GET /pacientes/me/turnos — listar turnos propios
// Proteger con: verifyToken, requireRole(2)
router.get(
  "/me/turnos",
  // verifyToken, requireRole(2),
  controller.getMyTurnos
);

// POST /pacientes/me/reservas — crear una reserva
// Proteger con: verifyToken, requireRole(2)
router.post(
  "/me/reservas",
  [
    // verifyToken, requireRole(2),
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
