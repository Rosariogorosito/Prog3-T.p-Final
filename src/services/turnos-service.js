import db from "../db/connection.js";

export const create = async (
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

  const [[obraSocial]] = await db.query(
    `SELECT es_particular,
            porcentaje_descuento
     FROM obras_sociales
     WHERE id_obra_social = ?
       AND activo = 1`,
    [id_obra_social]
  );

  let valor_total;

  if (obraSocial.es_particular === 1) {

    valor_total = medico.valor_consulta;

  } else {

    valor_total =
      medico.valor_consulta -
      (obraSocial.porcentaje_descuento * medico.valor_consulta);

  }

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