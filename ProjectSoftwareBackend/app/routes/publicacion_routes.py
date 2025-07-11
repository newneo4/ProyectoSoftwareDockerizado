from flask import Blueprint, request
from app.controllers.publicacion_controller import (
    crear_publicacion,
    obtener_publicaciones,
    obtener_publicacion,
    actualizar_publicacion,
    eliminar_publicacion,
    obtener_publicaciones_por_usuario
)

publicacion_bp = Blueprint('publicacion_bp', __name__, url_prefix='/publicaciones')

@publicacion_bp.route('/', methods=['POST'])  
def crear():
    data = request.json
    return crear_publicacion(data)

@publicacion_bp.route('/', methods=['GET'])  
def listar():
    return obtener_publicaciones()

@publicacion_bp.route('/<int:pub_id>', methods=['GET'])
def obtener(pub_id):
    return obtener_publicacion(pub_id)

@publicacion_bp.route('/<int:pub_id>', methods=['PUT'])
def actualizar(pub_id):
    data = request.json
    return actualizar_publicacion(pub_id, data)

@publicacion_bp.route('/<int:pub_id>', methods=['DELETE'])
def eliminar(pub_id):
    return eliminar_publicacion(pub_id)

@publicacion_bp.route('/usuario/<int:usuario_id>', methods=['GET'])
def publicaciones_por_usuario(usuario_id):
    return obtener_publicaciones_por_usuario(usuario_id)

print("✅ publicacion_routes.py CARGADO")
