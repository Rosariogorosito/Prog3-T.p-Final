import * as service from "../services/turnos-service.js";

export const create = async (req, res) => {
  try {

    const {
      id_paciente,
      id_medico,
      id_obra_social,
      fecha_hora
    } = req.body;

    const result = await service.create(
      id_paciente,
      id_medico,
      id_obra_social,
      fecha_hora
    );

    res.status(201).json({
      message: "Turno registrado correctamente",
      id_turno_reserva: result.insertId
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });

  }
};