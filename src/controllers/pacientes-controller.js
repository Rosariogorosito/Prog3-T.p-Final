import * as service from "../services/pacientes-service.js";

export const getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const data = await service.getByUsuarioId(id_usuario);

    if (!data) {
      return res.status(404).json({
        message: "Perfil de paciente no encontrado",
      });
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno",
    });
  }
};

export const updateObraSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_obra_social } = req.body;

    const result = await service.updateObraSocial(
      id,
      id_obra_social
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Paciente no encontrado",
      });
    }

    res.json({
      message: "Obra social asignada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno",
    });
  }
};

export const createReserva = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const perfil = await service.getByUsuarioId(id_usuario);

    const {
      id_medico,
      id_obra_social,
      fecha_hora,
    } = req.body;

    const result = await service.createReserva(
      perfil.id_paciente,
      id_medico,
      id_obra_social,
      fecha_hora
    );

    res.status(201).json({
      message: "Reserva creada correctamente",
      id_turno_reserva: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno",
    });
  }
};

export const getMyTurnos = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const perfil = await service.getByUsuarioId(id_usuario);

    const data = await service.getTurnosByPaciente(
      perfil.id_paciente
    );

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error interno",
    });
  }
};

export const subirFoto = async (req, res) => {

  try {

    res.status(200).json({
      message: "Foto subida correctamente",
      archivo: req.file.filename
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error interno"
    });

  }

};