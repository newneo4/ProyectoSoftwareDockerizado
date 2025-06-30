from flask import Blueprint
from app.controllers.libro_controller import publicar_libro, buscar_libros

libro_bp = Blueprint('libro_bp', __name__, url_prefix='/libros')

@libro_bp.route('/', methods=['POST'])
def crear_libro():
    from flask import request
    return publicar_libro(request.json)

@libro_bp.route('/', methods=['GET'])
def obtener_libros():
    from flask import request
    titulo = request.args.get('titulo')
    autor = request.args.get('autor')
    return buscar_libros(titulo, autor)
