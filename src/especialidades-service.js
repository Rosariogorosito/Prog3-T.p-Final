import db from "./db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM especialidades WHERE activo = 1"
  );
  return rows;
};

export const update = async (id, nombre) => {
  const [result] = await db.query(
    "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1",
    [nombre, id]
  );
  return result;
};
