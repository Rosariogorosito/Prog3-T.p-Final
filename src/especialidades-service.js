import db from "./db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM especialidades WHERE activo = 1"
  );
  return rows;
};

export const getById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1",
    [id]
  );

  return rows[0];
};
