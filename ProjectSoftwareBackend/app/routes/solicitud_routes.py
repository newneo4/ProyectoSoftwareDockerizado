from flask import Blueprint, request
from app.controllers.solicitud_controller import (
    crear_solicitud,
    listar_solicitudes,
    obtener_solicitud,
    aceptar_solicitud,
    rechazar_solicitud,
    listar_solicitudes_por_usuario,
    listar_solicitudes_enviadas_por_usuario
)

solicitud_bp = Blueprint('solicitud_bp', __name__, url_prefix='/solicitudes')

@solicitud_bp.route('', methods=['POST'])
def crear():
    data = request.get_json()
    return crear_solicitud(data)

@solicitud_bp.route('', methods=['GET'])
def listar():
    return listar_solicitudes()

@solicitud_bp.route('/<int:id>', methods=['GET'])
def obtener(id):
    return obtener_solicitud(id)

@solicitud_bp.route('/<int:id>/aceptar', methods=['PUT'])
def aceptar(id):
    return aceptar_solicitud(id)

@solicitud_bp.route('/<int:id>/rechazar', methods=['PUT'])
def rechazar(id):
    return rechazar_solicitud(id)

@solicitud_bp.route('/usuario/<int:usuario_id>', methods=['GET'])
def listar_por_usuario(usuario_id):
    return listar_solicitudes_por_usuario(usuario_id)

@solicitud_bp.route('/enviadas/<int:usuario_id>', methods=['GET'])
def listar_enviadas(usuario_id):
    return listar_solicitudes_enviadas_por_usuario(usuario_id)


print("✅ solicitud_routes.py CARGADO")
