import db from "../db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    `SELECT *
     FROM medicos`
  );

  return rows;
};

export const getByEspecialidad = async (id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM medicos
     WHERE id_especialidad = ?`,
    [id]
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

export const getTurnosAsociados = async (id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM turnos_reservas
     WHERE id_medico = ?`,
    [id]
  );

  return rows;
};

export const remove = async (id) => {
  const [result] = await db.query(
    `DELETE FROM medicos
     WHERE id_medico = ?`,
    [id]
  );

  return result;
};

export const getTurnosByMedico = async (id_usuario) => {
  const [rows] = await db.query(
    `SELECT
        tr.id_turno_reserva,
        tr.fecha_hora,
        tr.valor_total,
        tr.atentido,
        u.apellido AS paciente_apellido,
        u.nombres AS paciente_nombres,
        os.nombre AS obra_social
     FROM turnos_reservas tr
     JOIN medicos m
       ON m.id_medico = tr.id_medico
     JOIN pacientes p
       ON p.id_paciente = tr.id_paciente
     JOIN usuarios u
       ON u.id_usuario = p.id_usuario
     LEFT JOIN obras_sociales os
       ON os.id_obra_social = tr.id_obra_social
     WHERE m.id_usuario = ?
       AND tr.activo = 1`,
    [id_usuario]
  );

  return rows;
};

export const marcarAtendido = async (id_turno) => {
  const [result] = await db.query(
    `UPDATE turnos_reservas
     SET atentido = 1
     WHERE id_turno_reserva = ?`,
    [id_turno]
  );

  return result;
};

export const asignarObraSocial = async (id_medico, id_obra_social) => {
  const [result] = await db.query(
    `INSERT INTO medicos_obras_sociales
     (id_medico, id_obra_social, activo)
     VALUES (?, ?, 1)`,
    [id_medico, id_obra_social]
  );

  return result;
};