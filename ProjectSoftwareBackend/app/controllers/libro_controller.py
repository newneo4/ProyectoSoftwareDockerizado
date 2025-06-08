from flask import jsonify
from app import db
from app.models.libro import Libro
from app.models.usuario import Usuario

def publicar_libro(data):
    usuario = Usuario.query.get(data['usuario_id'])
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    libro = Libro(
        titulo=data['titulo'],
        autor=data['autor'],
        estado=data['estado'],
        tipo=data['tipo'],
        usuario_id=usuario.id
    )
    db.session.add(libro)
    db.session.commit()

    return jsonify({"mensaje": "Libro publicado", "id_libro": libro.id}), 201

def buscar_libros(titulo=None, autor=None):
    query = Libro.query
    if titulo:
        query = query.filter(Libro.titulo.ilike(f"%{titulo}%"))
    if autor:
        query = query.filter(Libro.autor.ilike(f"%{autor}%"))
    
    libros = query.all()
    resultado = [{
        "id": libro.id,
        "titulo": libro.titulo,
        "autor": libro.autor,
        "estado": libro.estado,
        "tipo": libro.tipo,
        "usuario_id": libro.usuario_id
    } for libro in libros]

    return jsonify(resultado)
