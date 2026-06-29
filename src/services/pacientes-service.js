import db from "../db/connection.js";

export const getAll = async () => {
  const [rows] = await db.query(
    `SELECT
        p.id_paciente,
        u.documento,
        u.apellido,
        u.nombres,
        u.email,
        u.foto_path,
        p.id_obra_social,
        os.nombre AS obra_social
     FROM pacientes p
     JOIN usuarios u
       ON u.id_usuario = p.id_usuario
      AND u.activo = 1
     LEFT JOIN obras_sociales os
       ON os.id_obra_social = p.id_obra_social
      AND os.activo = 1
     WHERE u.activo = 1`
  );

  return rows;
};

export const getByUsuarioId = async (id_usuario) => {
  const [rows] = await db.query(
    `SELECT
        p.id_paciente,
        u.documento,
        u.apellido,
        u.nombres,
        u.email,
        u.foto_path,
        p.id_obra_social,
        os.nombre AS obra_social
     FROM pacientes p
     JOIN usuarios u
       ON u.id_usuario = p.id_usuario
      AND u.activo = 1
     LEFT JOIN obras_sociales os
       ON os.id_obra_social = p.id_obra_social
      AND os.activo = 1
     WHERE p.id_usuario = ?
       AND u.activo = 1`,
    [id_usuario]
  );

  return rows[0];
};

export const updateObraSocial = async (id_paciente, id_obra_social) => {
  const [result] = await db.query(
    `UPDATE pacientes p
     JOIN usuarios u
       ON u.id_usuario = p.id_usuario
     SET p.id_obra_social = ?
     WHERE p.id_paciente = ?
       AND u.activo = 1`,
    [id_obra_social, id_paciente]
  );

  return result;
};

export const createReserva = async (
  id_paciente,
  id_medico,
  id_obra_social,
  fecha_hora
) => {

  const [[medico]] = await db.query(
    `SELECT valor_consulta
     FROM medicos
     WHERE id_medico = ?`,
    [id_medico]
  );

  if (!medico) {
    throw new Error("Médico no encontrado");
  }

  const [[obraSocial]] = await db.query(
    `SELECT
        es_particular,
        porcentaje_descuento
     FROM obras_sociales
     WHERE id_obra_social = ?
       AND activo = 1`,
    [id_obra_social]
  );

  if (!obraSocial) {
    throw new Error("Obra social no encontrada");
  }

  const valor_total =
    obraSocial.es_particular === 1
      ? medico.valor_consulta
      : medico.valor_consulta -
      ((obraSocial.porcentaje_descuento / 100) * medico.valor_consulta);

  const [result] = await db.query(
    `INSERT INTO turnos_reservas
    (
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
      atentido,
      activo
    )
    VALUES (?, ?, ?, ?, ?, 0, 1)`,
    [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total
    ]
  );

  return result;
};

export const getTurnosByPaciente = async (id_paciente) => {
  const [rows] = await db.query(
    `SELECT
        tr.id_turno_reserva,
        tr.fecha_hora,
        tr.valor_total,
        tr.atentido,
        u.apellido AS medico_apellido,
        u.nombres AS medico_nombres,
        e.nombre AS especialidad,
        os.nombre AS obra_social
     FROM turnos_reservas tr
     JOIN medicos m
       ON m.id_medico = tr.id_medico
     JOIN usuarios u
       ON u.id_usuario = m.id_usuario
      AND u.activo = 1
     JOIN especialidades e
       ON e.id_especialidad = m.id_especialidad
      AND e.activo = 1
     LEFT JOIN obras_sociales os
       ON os.id_obra_social = tr.id_obra_social
      AND os.activo = 1
     WHERE tr.id_paciente = ?
       AND tr.activo = 1
     ORDER BY tr.fecha_hora DESC`,
    [id_paciente]
  );

  return rows;
};