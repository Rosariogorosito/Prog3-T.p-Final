import * as service from "./especialidades-service.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    console.log("ERROR REAL:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await service.getById(id);

    if (!data) {
      return res.status(404).json({
        message: "Especialidad no encontrada"
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