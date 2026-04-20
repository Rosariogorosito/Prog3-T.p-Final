import db from "./db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM especialidades WHERE activo = 1"
  );
  return rows;
};
