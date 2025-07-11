import api from "@/shared/utils/api";

export const crearPublicacion = async (data) => {
  try {
    const response = await api.post("/publicaciones/", data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el libro:", error);
    throw error;
  }
};

export const obtenerPublicaciones = async () => {
  try {
    const response = await api.get(`/publicaciones/`);
    return response.data;
  } catch (error) {
    console.error('No se pudo iniciar sesion:', error);
    throw error;
  }
};

export const obtenerPublicacionesPorUsuarios = async (id)=>{
  try {
    const response = await api.get(`/publicaciones/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error('No se pudo iniciar sesion:', error);
    throw error;
  }
};