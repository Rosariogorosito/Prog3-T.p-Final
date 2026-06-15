import db from "../db/connection.js";

const crearError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const obtenerPacientePorUsuario = async (id_usuario) => {
  const [rows] = await db.query(
    `SELECT id_paciente
     FROM pacientes
     WHERE id_usuario = ?
     AND activo = 1`,
    [id_usuario]
  );

  return rows[0];
};

const obtenerMedicoPorUsuario = async (id_usuario) => {
  const [rows] = await db.query(
    `SELECT id_medico
     FROM medicos
     WHERE id_usuario = ?
     AND activo = 1`,
    [id_usuario]
  );

  return rows[0];
};

const verificarAccesoTurno = async (turno, usuario) => {
  const rol = Number(usuario.rol);

  if (rol === 3) {
    return true;
  }

  if (rol === 1) {
    const medico = await obtenerMedicoPorUsuario(usuario.id_usuario);

    if (!medico || Number(medico.id_medico) !== Number(turno.id_medico)) {
      throw crearError("No tiene permisos para acceder a este turno", 403);
    }

    return true;
  }

  if (rol === 2) {
    const paciente = await obtenerPacientePorUsuario(usuario.id_usuario);

    if (!paciente || Number(paciente.id_paciente) !== Number(turno.id_paciente)) {
      throw crearError("No tiene permisos para acceder a este turno", 403);
    }

    return true;
  }

  throw crearError("Rol no autorizado", 403);
};

export const getAll = async () => {
  const [rows] = await db.query(
    `SELECT *
     FROM turnos_reservas
     WHERE activo = 1
     ORDER BY fecha_hora ASC`
  );

  return rows;
};

export const getMisTurnos = async (usuario) => {
  const rol = Number(usuario.rol);

  if (rol === 3) {
    return await getAll();
  }

  if (rol === 1) {
    const medico = await obtenerMedicoPorUsuario(usuario.id_usuario);

    if (!medico) {
      throw crearError("No se encontró el médico asociado al usuario", 404);
    }

    return await getByMedico(medico.id_medico, usuario);
  }

  if (rol === 2) {
    const paciente = await obtenerPacientePorUsuario(usuario.id_usuario);

    if (!paciente) {
      throw crearError("No se encontró el paciente asociado al usuario", 404);
    }

    return await getByPaciente(paciente.id_paciente, usuario);
  }

  throw crearError("Rol no autorizado", 403);
};

export const getById = async (id, usuario = null) => {
  const [rows] = await db.query(
    `SELECT *
     FROM turnos_reservas
     WHERE id_turno_reserva = ?
     AND activo = 1`,
    [id]
  );

  const turno = rows[0];

  if (!turno) {
    return null;
  }

  if (usuario) {
    await verificarAccesoTurno(turno, usuario);
  }

  return turno;
};

export const getByPaciente = async (id_paciente, usuario = null) => {
  if (usuario && Number(usuario.rol) === 2) {
    const paciente = await obtenerPacientePorUsuario(usuario.id_usuario);

    if (!paciente || Number(paciente.id_paciente) !== Number(id_paciente)) {
      throw crearError("No puede consultar turnos de otro paciente", 403);
    }
  }

  const [rows] = await db.query(
    `SELECT *
     FROM turnos_reservas
     WHERE id_paciente = ?
     AND activo = 1
     ORDER BY fecha_hora ASC`,
    [id_paciente]
  );

  return rows;
};

export const getByMedico = async (id_medico, usuario = null) => {
  if (usuario && Number(usuario.rol) === 1) {
    const medico = await obtenerMedicoPorUsuario(usuario.id_usuario);

    if (!medico || Number(medico.id_medico) !== Number(id_medico)) {
      throw crearError("No puede consultar turnos de otro médico", 403);
    }
  }

  const [rows] = await db.query(
    `SELECT *
     FROM turnos_reservas
     WHERE id_medico = ?
     AND activo = 1
     ORDER BY fecha_hora ASC`,
    [id_medico]
  );

  return rows;
};

export const create = async (data, usuario) => {
  const rol = Number(usuario.rol);

  let {
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora
  } = data;

  if (![2, 3].includes(rol)) {
    throw crearError("No tiene permisos para crear reservas", 403);
  }

  if (!id_medico || !fecha_hora) {
    throw crearError("id_medico y fecha_hora son obligatorios", 400);
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    if (rol === 2) {
      const pacienteUsuario = await obtenerPacientePorUsuario(usuario.id_usuario);

      if (!pacienteUsuario) {
        throw crearError("No se encontró el paciente asociado al usuario", 404);
      }

      id_paciente = pacienteUsuario.id_paciente;
    }

    if (rol === 3) {
      if (!id_paciente) {
        throw crearError("El id_paciente es obligatorio para registrar el turno", 400);
      }
    }

    if (!id_obra_social) {
      throw crearError("El id_obra_social es obligatorio", 400);
    }

    const [medicos] = await connection.query(
      `SELECT id_medico, valor_consulta
       FROM medicos
       WHERE id_medico = ?
       AND activo = 1`,
      [id_medico]
    );

    if (medicos.length === 0) {
      throw crearError("El médico no existe o está inactivo", 400);
    }

    const [pacientes] = await connection.query(
      `SELECT id_paciente
       FROM pacientes
       WHERE id_paciente = ?
       AND activo = 1`,
      [id_paciente]
    );

    if (pacientes.length === 0) {
      throw crearError("El paciente no existe o está inactivo", 400);
    }

    const [obrasSociales] = await connection.query(
      `SELECT id_obra_social, porcentaje_descuento, es_particular
       FROM obras_sociales
       WHERE id_obra_social = ?
       AND activo = 1`,
      [id_obra_social]
    );

    if (obrasSociales.length === 0) {
      throw crearError("La obra social no existe o está inactiva", 400);
    }

    const [turnoExistente] = await connection.query(
      `SELECT id_turno_reserva
       FROM turnos_reservas
       WHERE id_medico = ?
       AND fecha_hora = ?
       AND activo = 1`,
      [id_medico, fecha_hora]
    );

    if (turnoExistente.length > 0) {
      throw crearError(
        "El médico ya tiene un turno reservado en esa fecha y hora",
        400
      );
    }

    const medico = medicos[0];
    const obraSocial = obrasSociales[0];

    const valorConsulta = Number(medico.valor_consulta);
    const porcentajeDescuento = Number(obraSocial.porcentaje_descuento);

    let valorTotal;

    if (Number(obraSocial.es_particular) === 1) {
      valorTotal = valorConsulta;
    } else {
      valorTotal = valorConsulta - porcentajeDescuento * valorConsulta;
    }

    const [result] = await connection.query(
      `INSERT INTO turnos_reservas
       (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
       VALUES (?, ?, ?, ?, ?, 0, 1)`,
      [id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal]
    );

    await connection.commit();

    return {
      id_turno_reserva: result.insertId,
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total: valorTotal,
      atendido: 0,
      activo: 1
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const marcarAtendido = async (id, usuario) => {
  const turno = await getById(id);

  if (!turno) {
    throw crearError("El turno no existe o está inactivo", 404);
  }

  const rol = Number(usuario.rol);

  if (![1, 3].includes(rol)) {
    throw crearError("No tiene permisos para marcar turnos como atendidos", 403);
  }

  if (rol === 1) {
    await verificarAccesoTurno(turno, usuario);
  }

  await db.query(
    `UPDATE turnos_reservas
     SET atendido = 1
     WHERE id_turno_reserva = ?
     AND activo = 1`,
    [id]
  );

  return {
    message: "Turno marcado como atendido correctamente"
  };
};

export const remove = async (id) => {
  const turno = await getById(id);

  if (!turno) {
    throw crearError("El turno no existe o ya fue eliminado", 404);
  }

  await db.query(
    `UPDATE turnos_reservas
     SET activo = 0
     WHERE id_turno_reserva = ?
     AND activo = 1`,
    [id]
  );

  return {
    message: "Turno eliminado correctamente"
  };
};