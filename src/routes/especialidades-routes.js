import { Router } from "express";
import * as controller from "../especialidades-controller.js";
import { param } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

router.get("/", controller.getAll);

router.put("/:id", 
    [
    param("id").isInt().withMessage("El ID debe ser un número entero"),
    
    body("nombre")
    .notEmpty().withMessage("El nombre de la especialidad es obligatorio")
    .isLength({ max: 120 }).withMessage("El nombre no puede tener más de 120 caracteres"),
    
    validate
    ], 
controller.update 
);

export default router;