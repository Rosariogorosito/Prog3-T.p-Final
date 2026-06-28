import * as data from "./medicos-data.js";

export const getAll = async () => {
  return await data.getAll();
};

export const getByEspecialidad = async (id) => {
  return await data.getByEspecialidad(id);
};

export const getById = async (id) => {
  return await data.getById(id);
};

export const create = async (
  id_usuario,
  id_especialidad,
  matricula,
  descripcion,
  valor_consulta
) => {
  return await data.create(
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
  );
};

export const update = async (
  id,
  id_usuario,
  id_especialidad,
  matricula,
  descripcion,
  valor_consulta
) => {
  return await data.update(
    id,
    id_usuario,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta
  );
};

export const remove = async (id) => {
  const turnos = await data.getTurnosAsociados(id);

  if (turnos.length > 0) {
    throw new Error("El médico tiene turnos asociados");
  }

  return await data.remove(id);
};

export const getTurnosByMedico = async (id_usuario) => {
  return await data.getTurnosByMedico(id_usuario);
};

export const marcarAtendido = async (id_turno) => {
  return await data.marcarAtendido(id_turno);
};

export const asignarObraSocial = async (id_medico, id_obra_social) => {
  return await data.asignarObraSocial(
    id_medico,
    id_obra_social
  );
};