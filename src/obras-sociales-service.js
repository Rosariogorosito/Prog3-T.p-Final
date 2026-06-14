import db from "./db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    "SELECT * FROM obras_sociales WHERE activo = 1"
  );
  return rows;
};

export const getById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",
    [id]
  );

  return rows[0];
};

export const create = async (
  nombre,
  descripcion,
  porcentaje_descuento,
  es_particular
) => {
  const [result] = await db.query(
    `INSERT INTO obras_sociales
    (nombre, descripcion, porcentaje_descuento, es_particular)
    VALUES (?, ?, ?, ?)`,
    [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    ]
  );

  return result;
};

export const update = async (
  id,
  nombre,
  descripcion,
  porcentaje_descuento,
  es_particular
) => {
  const [result] = await db.query(
    `UPDATE obras_sociales
     SET nombre = ?,
         descripcion = ?,
         porcentaje_descuento = ?,
         es_particular = ?
     WHERE id_obra_social = ?
     AND activo = 1`,
    [
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular,
      id
    ]
  );

  return result;
};

export const remove = async (id) => {
  const [result] = await db.query(
    "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?",
    [id]
  );

  return result;
};