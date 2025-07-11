from flask import Blueprint
from app.controllers.libro_controller import publicar_libro, buscar_libros, obtener_libros_por_usuario

libro_bp = Blueprint('libro_bp', __name__, url_prefix='/libros')

@libro_bp.route('/', methods=['POST'])
def crear_libro():
    return publicar_libro()  # 🔥 Ya NO usar `request.json`

@libro_bp.route('/', methods=['GET'])
def obtener_libros():
    from flask import request
    titulo = request.args.get('titulo')
    autor = request.args.get('autor')
    return buscar_libros(titulo, autor)


@libro_bp.route('/usuario/<int:usuario_id>', methods=['GET'])
def libros_por_usuario(usuario_id):
    return obtener_libros_por_usuario(usuario_id)