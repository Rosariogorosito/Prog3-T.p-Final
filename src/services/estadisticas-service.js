import db from "../db/connection.js";

export const getEspecialidadesTurnos = async () => {
  const [rows] = await db.query("CALL especialidades_x_turnos()");
  return rows[0];
};