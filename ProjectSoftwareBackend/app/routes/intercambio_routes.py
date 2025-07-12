from flask import Blueprint, request
from app.controllers.intercambio_controller import (
    crear_intercambio,
    listar_intercambios,
    obtener_intercambio,
    aceptar_intercambio,
    rechazar_intercambio,
    listar_intercambios_por_usuario,
    listar_intercambios_enviados_por_usuario
)

intercambio_bp = Blueprint('intercambio_bp', __name__, url_prefix='/intercambios')

# Crear intercambio
@intercambio_bp.route('', methods=['POST'])
def crear():
    data = request.get_json()
    return crear_intercambio(data)

# Listar todos los intercambios
@intercambio_bp.route('', methods=['GET'])
def listar():
    return listar_intercambios()

# Obtener un intercambio por ID
@intercambio_bp.route('/<int:id>', methods=['GET'])
def obtener(id):
    return obtener_intercambio(id)

# Aceptar un intercambio
@intercambio_bp.route('/<int:id>/aceptar', methods=['PUT'])
def aceptar(id):
    return aceptar_intercambio(id)

# Rechazar un intercambio
@intercambio_bp.route('/<int:id>/rechazar', methods=['PUT'])
def rechazar(id):
    return rechazar_intercambio(id)

# Listar intercambios por usuario receptor
@intercambio_bp.route('/usuario/<int:usuario_id>', methods=['GET'])
def listar_por_usuario(usuario_id):
    return listar_intercambios_por_usuario(usuario_id)


@intercambio_bp.route('/enviados/<int:usuario_id>', methods=['GET'])
def listar_enviados(usuario_id):
    return listar_intercambios_enviados_por_usuario(usuario_id)

print("✅ intercambio_routes.py CARGADO")
