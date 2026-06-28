import db from "../db/connection.js";

export const getResumenGeneral = async () => {
  const [rows] = await db.query("CALL reporte_resumen_general()");
  return rows[0][0];
};

export const getTurnosPorObraSocial = async () => {
  const [rows] = await db.query("CALL reporte_turnos_por_obra_social()");
  return rows[0];
};

export const getDetalleTurnos = async () => {
  const [rows] = await db.query("CALL reporte_detalle_turnos()");
  return rows[0];
};
