import * as service from "../services/estadisticas-service.js";

export const getEstadisticas = async (req, res) => {
  try {
    const data = await service.getEstadisticas();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};