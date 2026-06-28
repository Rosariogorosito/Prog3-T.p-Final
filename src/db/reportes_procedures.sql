CREATE PROCEDURE reporte_resumen_general()
BEGIN
  SELECT
    COUNT(*)                          AS total_turnos,
    SUM(atentido = 1)                 AS turnos_atendidos,
    SUM(atentido = 0)                 AS turnos_pendientes,
    ROUND(SUM(valor_total), 2)        AS recaudacion_total
  FROM turnos_reservas
  WHERE activo = 1;
END$$
DELIMITER ;

--obra social
DELIMITER $$
CREATE PROCEDURE reporte_turnos_por_obra_social()
BEGIN
  SELECT
    os.nombre                         AS obra_social,
    COUNT(tr.id_turno_reserva)        AS cantidad_turnos,
    ROUND(SUM(tr.valor_total), 2)     AS total_recaudado
  FROM turnos_reservas tr
  JOIN obras_sociales os
    ON os.id_obra_social = tr.id_obra_social
    AND os.activo = 1
  WHERE tr.activo = 1
  GROUP BY os.id_obra_social, os.nombre
  ORDER BY cantidad_turnos DESC;
END$$
DELIMITER ;

-- Detalle completo de turnos
DELIMITER $$
CREATE PROCEDURE reporte_detalle_turnos()
BEGIN
  SELECT
    tr.id_turno_reserva,
    tr.fecha_hora,
    CONCAT(up.apellido, ', ', up.nombres)   AS paciente,
    CONCAT(um.apellido, ', ', um.nombres)   AS medico,
    e.nombre                                AS especialidad,
    os.nombre                               AS obra_social,
    ROUND(tr.valor_total, 2)                AS valor_total,
    IF(tr.atentido = 1, 'Atendido', 'Pendiente') AS estado
  FROM turnos_reservas tr
  JOIN pacientes p
    ON p.id_paciente = tr.id_paciente
  JOIN usuarios up
    ON up.id_usuario = p.id_usuario
    AND up.activo = 1
  JOIN medicos m
    ON m.id_medico = tr.id_medico
  JOIN usuarios um
    ON um.id_usuario = m.id_usuario
    AND um.activo = 1
  JOIN especialidades e
    ON e.id_especialidad = m.id_especialidad
    AND e.activo = 1
  LEFT JOIN obras_sociales os
    ON os.id_obra_social = tr.id_obra_social
    AND os.activo = 1
  WHERE tr.activo = 1
  ORDER BY tr.fecha_hora DESC;
END$$
DELIMITER ;
