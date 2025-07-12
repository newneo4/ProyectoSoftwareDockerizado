import api from "@/shared/utils/api";

// Crear intercambio
export const crearIntercambio = async (data) => {
  try {
    const response = await api.post("/intercambios", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear el intercambio:", error);
    throw error;
  }
};

// Obtener todos los intercambios
export const obtenerIntercambios = async () => {
  try {
    const response = await api.get("/intercambios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener intercambios:", error);
    throw error;
  }
};

// Obtener detalle de un intercambio
export const obtenerIntercambioPorId = async (intercambioId) => {
  try {
    const response = await api.get(`/intercambios/${intercambioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalle del intercambio:", error);
    throw error;
  }
};

// Aceptar intercambio
export const aceptarIntercambio = async (intercambioId) => {
  try {
    const response = await api.put(`/intercambios/${intercambioId}/aceptar`);
    return response.data;
  } catch (error) {
    console.error("Error al aceptar el intercambio:", error);
    throw error;
  }
};

// Rechazar intercambio
export const rechazarIntercambio = async (intercambioId) => {
  try {
    const response = await api.put(`/intercambios/${intercambioId}/rechazar`);
    return response.data;
  } catch (error) {
    console.error("Error al rechazar el intercambio:", error);
    throw error;
  }
};

// Obtener intercambios recibidos por usuario
export const obtenerIntercambiosPorUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/intercambios/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener intercambios del usuario:", error);
    throw error;
  }
};


export const obtenerIntercambiosPorEnviados = async (usuarioId) => {
  try {
    const response = await api.get(`/intercambios/enviados/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener intercambios del usuario:", error);
    throw error;
  }
};
