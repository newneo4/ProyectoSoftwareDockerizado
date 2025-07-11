import api from "@/shared/utils/api";
import formApi from "@/shared/utils/formApi";

export const crearLibro = async (formData) => {
  try {
    const response = await formApi.post("/libros", formData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el libro:", error);
    throw error;
  }
};

export const obtenerLibros = async (data) => {
  try {
    const response = await api.get(`/libros/usuario/${data}`);
    return response.data;
  } catch (error) {
    console.error('No se pudo iniciar sesion:', error);
    throw error;
  }
};