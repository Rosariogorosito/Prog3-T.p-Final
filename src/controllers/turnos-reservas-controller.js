import * as service from "../services/turnos-reservas-service.js";

export const getAll = async (req, res) => {
  try {
    const turnos = await service.getAll();
    res.json(turnos);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const turno = await service.getById(id);

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    res.json(turno);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getByPaciente = async (req, res) => {
  try {
    const { id_paciente } = req.params;

    const turnos = await service.getByPaciente(id_paciente);

    res.json(turnos);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getByMedico = async (req, res) => {
  try {
    const { id_medico } = req.params;

    const turnos = await service.getByMedico(id_medico);

    res.json(turnos);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const create = async (req, res) => {
  try {
    const turno = await service.create(req.body);

    res.status(201).json({
      message: "Turno creado correctamente",
      turno
    });
  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor"
    });
  }
};

export const marcarAtendido = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.marcarAtendido(id);

    res.json(result);
  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await service.remove(id);

    res.json(result);
  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor"
    });
  }
};