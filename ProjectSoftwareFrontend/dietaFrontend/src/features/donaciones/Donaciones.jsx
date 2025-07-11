import { BookHeart, MailCheck, ThumbsDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  obtenerSolicitudesPorUsuario,
  aceptarSolicitud,
  rechazarSolicitud,
} from './donacionesService';

const estados = ['todas', 'pendiente', 'aceptada', 'rechazado'];

const DonacionesPage = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todas');
  const [loading, setLoading] = useState(true);

  const usuarioId = JSON.parse(localStorage.getItem('currentUser'))?.id;

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      const data = await obtenerSolicitudesPorUsuario(usuarioId);
      setSolicitudes(data);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAceptar = async (id) => {
    await aceptarSolicitud(id);
    cargarSolicitudes();
  };

  const handleRechazar = async (id) => {
    await rechazarSolicitud(id);
    cargarSolicitudes();
  };

  useEffect(() => {
    if (usuarioId) cargarSolicitudes();
  }, [usuarioId]);

  const solicitudesFiltradas =
    estadoSeleccionado === 'todas'
      ? solicitudes
      : solicitudes.filter((s) => s.estado === estadoSeleccionado);

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <BookHeart className="h-8 w-8 text-amber-800" />
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">
              Mis donaciones
            </h1>
          </div>
          <div className="text-sm text-amber-700">
            Gestiona tu historial de intercambios y donaciones
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-4">
          {estados.map((estado) => (
            <button
              key={estado}
              onClick={() => setEstadoSeleccionado(estado)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                estadoSeleccionado === estado
                  ? 'bg-amber-800 text-white'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>

        {/* Lista */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando solicitudes...</p>
        ) : solicitudesFiltradas.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay solicitudes {estadoSeleccionado !== 'todas' && `en estado ${estadoSeleccionado}`}.
          </p>
        ) : (
          <div className="space-y-4">
            {solicitudesFiltradas.map((solicitud) => (
              <div
                key={solicitud.id}
                className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div className="flex-1">
                  <p className="text-lg text-amber-900 font-semibold">
                    📘 Libro:{' '}
                    <span className="font-bold">
                      {solicitud.libro?.titulo || 'Título no disponible'}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    👤 Solicitado por:{' '}
                    {solicitud.usuario_solicitante?.nombre}{' '}
                    {solicitud.usuario_solicitante?.apellido}
                  </p>
                  <p className="text-gray-600 mt-1 italic">
                    ✉️ {solicitud.mensaje || 'Sin mensaje'}
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    Estado:{' '}
                    <span className="font-semibold">{solicitud.estado}</span>
                  </p>
                </div>

                {solicitud.estado === 'pendiente' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAceptar(solicitud.id)}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      <MailCheck size={16} />
                      Aceptar
                    </button>
                    <button
                      onClick={() => handleRechazar(solicitud.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <ThumbsDown size={16} />
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonacionesPage;
