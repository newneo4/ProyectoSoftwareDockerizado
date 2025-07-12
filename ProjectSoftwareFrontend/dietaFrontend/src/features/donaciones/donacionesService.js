// src/services/solicitudService.js
import api from "@/shared/utils/api";

// Crear solicitud
export const crearSolicitud = async (data) => {
  try {
    const response = await api.post("/solicitudes", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    throw error;
  }
};

// Obtener todas las solicitudes
export const obtenerSolicitudes = async () => {
  try {
    const response = await api.get("/solicitudes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    throw error;
  }
};

// Obtener solicitudes recibidas por usuario
export const obtenerSolicitudesPorUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/solicitudes/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitudes del usuario:", error);
    throw error;
  }
};


export const obtenerSolicitudesEnviadasPorUsuario = async (usuarioId) => {
  try {
    const response = await api.get(`/solicitudes/enviadas/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitudes del usuario:", error);
    throw error;
  }
};

// Obtener detalle de una solicitud
export const obtenerSolicitudPorId = async (solicitudId) => {
  try {
    const response = await api.get(`/solicitudes/${solicitudId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalle de la solicitud:", error);
    throw error;
  }
};

// Aceptar solicitud
export const aceptarSolicitud = async (solicitudId) => {
  try {
    const response = await api.put(`/solicitudes/${solicitudId}/aceptar`);
    return response.data;
  } catch (error) {
    console.error("Error al aceptar la solicitud:", error);
    throw error;
  }
};

// Rechazar solicitud
export const rechazarSolicitud = async (solicitudId) => {
  try {
    const response = await api.put(`/solicitudes/${solicitudId}/rechazar`);
    return response.data;
  } catch (error) {
    console.error("Error al rechazar la solicitud:", error);
    throw error;
  }
};
