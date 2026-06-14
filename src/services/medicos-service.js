import db from "../db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    `SELECT * 
     FROM medicos`
  );

  return rows;
};

export const getById = async (id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM medicos
     WHERE id_medico = ?`,
    [id]
  );

  return rows[0];
};

export const create = async (
  id_usuario,
  id_especialidad,
  matricula,
  descripcion,
  valor_consulta
) => {

  const [result] = await db.query(
    `INSERT INTO medicos
    (
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    ]
  );

  return result;
};

export const update = async (
  id,
  id_usuario,
  id_especialidad,
  matricula,
  descripcion,
  valor_consulta
) => {

  const [result] = await db.query(
    `UPDATE medicos
     SET
      id_usuario = ?,
      id_especialidad = ?,
      matricula = ?,
      descripcion = ?,
      valor_consulta = ?
     WHERE id_medico = ?`,
    [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
      id
    ]
  );

  return result;
};

export const remove = async (id) => {

  const [turnos] = await db.query(
    "SELECT * FROM turnos_reservas WHERE id_medico = ?",
    [id]
  );

  if (turnos.length > 0) {
    throw new Error("El médico tiene turnos asociados");
  }

  const [result] = await db.query(
    "DELETE FROM medicos WHERE id_medico = ?",
    [id]
  );

  return result;
};