import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Verifica que el token JWT sea válido
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id_usuario, rol, email }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Verifica que el usuario tenga el rol requerido
// Uso: requireRole(3) para admin, requireRole(2) para paciente, requireRole(1) para médico
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: "No tenés permisos para realizar esta acción" });
    }
    next();
  };
};
