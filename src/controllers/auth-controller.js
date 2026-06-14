import * as service from "../services/auth-service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    const usuario = await service.login(email, contrasenia);

    if (!usuario) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        rol: usuario.rol,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombres: usuario.nombres,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno al iniciar sesión" });
  }
};
