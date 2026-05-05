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

export const update = async (req, res) => {
  try {
    const id = req.params.id; 
    const { nombre } = req.body;
    const result = await service.update(id, nombre);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Especialidad no encontrada o ya eliminada" });
    }

      res.json({ message: "Especialidad actualizada correctamente" });
    
  } catch (error) {
    console.log("ERROR REAL:", error); 
    res.status(500).json({ message: "Error interno al actualizar" });
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

export const agregar = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    const resultado = await service.agregarEspecialidad(nombre);

    res.status(201).json({ 
      mensaje: "La especialidad se guardó correctamente",
      id_generado: resultado.insertId 
    });
    
  } catch (error) {
    console.log("Error detallado:", error); 
    res.status(500).json({ 
      mensaje: "Hubo un error al intentar guardar la especialidad" 
    });
  }
};