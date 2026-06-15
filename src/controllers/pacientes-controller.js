import * as service from "../services/pacientes-service.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario; 
    const data = await service.getByUsuarioId(id_usuario);

    if (!data) {
      return res.status(404).json({ message: "Perfil de paciente no encontrado" });
    }

    res.json(data);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const updateObraSocial = async (req, res) => {
  try {
    const { id } = req.params;           
    const { id_obra_social } = req.body;

    const result = await service.updateObraSocial(id, id_obra_social);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Paciente no encontrado o inactivo" });
    }

    res.json({ message: "Obra social asignada correctamente" });
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno al asignar obra social" });
  }
};

export const createReserva = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { id_medico, id_obra_social, fecha_hora } = req.body;

    const perfil = await service.getByUsuarioId(id_usuario);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil de paciente no encontrado" });
    }

    const result = await service.createReserva(
      perfil.id_paciente,
      id_medico,
      id_obra_social,
      fecha_hora
    );

    res.status(201).json({
      message: "Reserva creada correctamente",
      id_turno_reserva: result.insertId
    });
  } catch (error) {
    console.log("ERROR REAL:", error);
    if (error.message.includes("no encontrado") || error.message.includes("inactiv")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error interno al crear la reserva" });
  }
};

export const getMyTurnos = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const perfil = await service.getByUsuarioId(id_usuario);
    if (!perfil) {
      return res.status(404).json({ message: "Perfil de paciente no encontrado" });
    }

    const data = await service.getTurnosByPaciente(perfil.id_paciente);
    res.json(data);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno" });
  }
};
