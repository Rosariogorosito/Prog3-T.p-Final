import * as estadisticasService from "../services/estadisticas-service.js";
import * as informesService from "../services/informes-service.js";

export const reporteTurnosPorEspecialidad = async (req, res) => {
  try {
    const datos = await estadisticasService.getEspecialidadesTurnos();

    const pdf = await informesService.reportePorEspecialidades(datos);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=turnos-por-especialidad.pdf"
    );

    res.send(pdf);

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error al generar el reporte PDF"
    });
  }
};