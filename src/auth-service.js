import db from "./db/connection.js";

export const login = async (email, contrasenia) => {
  // SHA2(?, 256) lo ejecuta MySQL directamente, igual que en clase
  const [rows] = await db.query(
    "SELECT id_usuario, apellido, nombres, email, rol FROM usuarios WHERE email = ? AND contrasenia = SHA2(?, 256) AND activo = 1",
    [email, contrasenia]
  );
  return rows[0]; // undefined si no existe
};
