import api from "@/shared/utils/api";

export const RegistrarUsuario = async (data) => {
  try {
    const response = await api.post('/registro', data);
    return response.data;
  } catch (error) {
    console.error('No se pudo iniciar sesion:', error);
    throw error;
  }
};
