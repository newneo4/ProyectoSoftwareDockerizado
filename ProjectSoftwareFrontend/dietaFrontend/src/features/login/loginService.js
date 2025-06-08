import api from "@/shared/utils/api";

export const ObtenerUsuario = async (data) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    console.error('No se pudo iniciar sesion:', error);
    throw error;
  }
};
