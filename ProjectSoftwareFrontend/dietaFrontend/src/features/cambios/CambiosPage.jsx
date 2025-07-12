import { BookHeart, MailCheck, ThumbsDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  obtenerIntercambiosPorUsuario,
  obtenerIntercambiosPorEnviados,
  aceptarIntercambio,
  rechazarIntercambio,
} from './cambiosService';

const estados = ['todas', 'pendiente', 'aceptado', 'rechazado'];
const vistas = ['recibidos', 'enviados'];

const CambiosPage = () => {
  const [intercambios, setIntercambios] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('todas');
  const [vista, setVista] = useState('recibidos');
  const [loading, setLoading] = useState(true);

  const usuarioId = JSON.parse(localStorage.getItem('currentUser'))?.id;

  const cargarIntercambios = async () => {
    try {
      setLoading(true);
      let data = [];
      if (vista === 'recibidos') {
        data = await obtenerIntercambiosPorUsuario(usuarioId);
      } else {
        data = await obtenerIntercambiosPorEnviados(usuarioId);
      }
      setIntercambios(data);
    } catch (error) {
      console.error('Error al cargar intercambios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAceptar = async (id) => {
    await aceptarIntercambio(id);
    cargarIntercambios();
  };

  const handleRechazar = async (id) => {
    await rechazarIntercambio(id);
    cargarIntercambios();
  };

  useEffect(() => {
    if (usuarioId) {
      cargarIntercambios();
    }
  }, [usuarioId, vista]);

  const intercambiosFiltrados =
    estadoSeleccionado === 'todas'
      ? intercambios
      : intercambios.filter((i) => i.status === estadoSeleccionado);

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <BookHeart className="h-8 w-8 text-amber-800" />
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">
              Mis intercambios
            </h1>
          </div>
          <div className="text-sm text-amber-700">
            Gestiona tus intercambios con otros usuarios
          </div>
        </div>

        {/* Selector de vista */}
        <div className="flex gap-4 mb-4">
          {vistas.map((opcion) => (
            <button
              key={opcion}
              onClick={() => setVista(opcion)}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                vista === opcion
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-amber-800 border border-amber-300 hover:bg-amber-100'
              }`}
            >
              {opcion === 'recibidos' ? 'Recibidos' : 'Enviados'}
            </button>
          ))}
        </div>

        {/* Filtros por estado */}
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
          <p className="text-center text-gray-500">Cargando intercambios...</p>
        ) : intercambiosFiltrados.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay intercambios {estadoSeleccionado !== 'todas' && `en estado ${estadoSeleccionado}`}.
          </p>
        ) : (
          <div className="space-y-4">
            {intercambiosFiltrados.map((intercambio) => (
              <div
                key={intercambio.id}
                className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div className="flex-1">
                  <p className="text-lg text-amber-900 font-semibold">
                    🎁 Ofrece:{' '}
                    <span className="font-bold">
                      {intercambio.libro_ofrecido?.titulo || 'N/A'}
                    </span>
                  </p>
                  <p className="text-lg text-amber-900 font-semibold">
                    🎁 Pide:{' '}
                    <span className="font-bold">
                      {intercambio.libro_pedido?.titulo || 'N/A'}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    👤 {vista === 'recibidos' ? 'Solicitado por' : 'Enviado a'}:{' '}
                    {vista === 'recibidos'
                      ? `${intercambio.usuario_solicitante?.nombre} ${intercambio.usuario_solicitante?.apellido}`
                      : `${intercambio.usuario_receptor?.nombre} ${intercambio.usuario_receptor?.apellido}`}
                  </p>
                  <p className="text-gray-600 mt-1 italic">
                    ✉️ {intercambio.message || 'Sin mensaje'}
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    Estado:{' '}
                    <span className="font-semibold">{intercambio.status}</span>
                  </p>
                </div>

                {/* Solo permitir aceptar/rechazar si la vista es 'recibidos' */}
                {vista === 'recibidos' && intercambio.status === 'pendiente' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAceptar(intercambio.id)}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      <MailCheck size={16} />
                      Aceptar
                    </button>
                    <button
                      onClick={() => handleRechazar(intercambio.id)}
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

export default CambiosPage;
