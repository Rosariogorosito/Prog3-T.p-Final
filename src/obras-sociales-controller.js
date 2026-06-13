import * as service from "./obras-sociales-service.js";

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
        message: "Obra social no encontrada"
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
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    } = req.body;

    await service.create(
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    );

    res.status(201).json({
      message: "Obra social creada correctamente"
    });

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    } = req.body;

    const obraSocial = await service.getById(id);

    if (!obraSocial) {
      return res.status(404).json({
        message: "Obra social no encontrada"
      });
    }

    await service.update(
      id,
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    );

    res.json({
      message: "Obra social actualizada correctamente"
    });

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno al actualizar"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const obraSocial = await service.getById(id);

    if (!obraSocial) {
      return res.status(404).json({
        message: "Obra social no encontrada"
      });
    }

    await service.remove(id);

    res.status(200).json({
      message: "Obra social eliminada correctamente (Soft Delete)"
    });

  } catch (error) {
    console.log("ERROR REAL:", error);

    res.status(500).json({
      message: "Error interno"
    });
  }
};