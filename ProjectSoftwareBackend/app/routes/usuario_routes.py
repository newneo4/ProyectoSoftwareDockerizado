from flask import Blueprint, request
from app.controllers.usuario_controller import (
    registrar_usuario,
    login_usuario,
)
from app.controllers.libro_controller import (
    publicar_libro,
    buscar_libros,
)
from app.controllers.solicitud_controller import (
    crear_solicitud,
    listar_solicitudes,
)

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/registro', methods=['POST'])
def registro():
    data = request.json
    return registrar_usuario(data)

@usuario_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    return login_usuario(data)

@usuario_bp.route('/libros', methods=['POST'])
def publicar():
    # data = request.json
    return publicar_libro()

@usuario_bp.route('/libros', methods=['GET'])
def buscar():
    titulo = request.args.get('titulo')
    autor = request.args.get('autor')
    return buscar_libros(titulo, autor)

@usuario_bp.route('/solicitudes', methods=['POST'])
def solicitud():
    data = request.json
    return crear_solicitud(data)

@usuario_bp.route('/solicitudes', methods=['GET'])
def obtener_solicitudes():
    return listar_solicitudes()
