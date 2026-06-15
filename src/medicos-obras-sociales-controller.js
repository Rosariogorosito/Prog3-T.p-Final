import * as service from "./medicos-obras-sociales-service.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();

    res.json(data);

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await service.getById(id);

    if (!data) {
      return res.status(404).json({
        message: "Asociación no encontrada"
      });
    }

    res.json(data);

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};

export const create = async (req, res) => {
  try {
    const {
      id_medico,
      id_obra_social
    } = req.body;

    await service.create(
      id_medico,
      id_obra_social
    );

    res.status(201).json({
      message: "Asociación creada correctamente"
    });

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const asociacion = await service.getById(id);

    if (!asociacion) {
      return res.status(404).json({
        message: "Asociación no encontrada"
      });
    }

    await service.remove(id);

    res.status(200).json({
      message: "Asociación eliminada correctamente"
    });

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};