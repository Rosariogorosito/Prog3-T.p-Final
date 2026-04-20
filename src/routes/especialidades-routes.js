import { Router } from "express";
import * as controller from "../especialidades-controller.js";
import { body, param } from "express-validator";
import validate from "../db/validate.js";

const router = Router();

router.get("/", controller.getAll);

export default router;