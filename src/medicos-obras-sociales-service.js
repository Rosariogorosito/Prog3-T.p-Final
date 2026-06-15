import db from "./db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    `SELECT *
     FROM medicos_obras_sociales
     WHERE activo = 1`
  );

  return rows;
};

export const getById = async (id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM medicos_obras_sociales
     WHERE id_medico_obra_social = ?
     AND activo = 1`,
    [id]
  );

  return rows[0];
};

export const create = async (
  id_medico,
  id_obra_social
) => {
  const [result] = await db.query(
    `INSERT INTO medicos_obras_sociales
     (id_medico, id_obra_social)
     VALUES (?, ?)`,
    [id_medico, id_obra_social]
  );

  return result;
};

export const remove = async (id) => {
  const [result] = await db.query(
    `UPDATE medicos_obras_sociales
     SET activo = 0
     WHERE id_medico_obra_social = ?`,
    [id]
  );

  return result;
};