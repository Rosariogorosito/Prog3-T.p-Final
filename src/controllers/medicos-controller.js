import * as service from "../services/medicos-service.js";

export const getAll = async (req, res) => {
  try {

    const medicos = await service.getAll();

    res.status(200).json(medicos);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });

  }
};

export const getById = async (req, res) => {
  try {

    const { id } = req.params;

    const medico = await service.getById(id);

    if (!medico) {
      return res.status(404).json({
        message: "Médico no encontrado"
      });
    }

    res.status(200).json(medico);

  } catch (error) {

    res.status(500).json({
      message: "Error interno"
    });

  }
};

export const create = async (req, res) => {
  try {

    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    } = req.body;

    const result = await service.create(
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    );

    res.status(201).json({
      message: "Médico creado correctamente",
      id: result.insertId
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });

  }
};

export const update = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    } = req.body;

    const medico = await service.getById(id);

    if (!medico) {
      return res.status(404).json({
        message: "Médico no encontrado"
      });
    }

    await service.update(
      id,
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    );

    res.status(200).json({
      message: "Médico actualizado correctamente"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });

  }
};

export const remove = async (req, res) => {
  try {

    const { id } = req.params;

    const medico = await service.getById(id);

    if (!medico) {
      return res.status(404).json({
        message: "Médico no encontrado"
      });
    }

    await service.remove(id);

    res.status(200).json({
      message: "Médico eliminado correctamente"
    });

  } catch (error) {

    if (error.message === "El médico tiene turnos asociados") {
      return res.status(400).json({
        message: error.message
      });
    }

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};