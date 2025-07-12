from flask import request, jsonify
from app import db
from app.models.libro import Libro
import os
from werkzeug.utils import secure_filename
from app.models.publicacion import Publicacion  

UPLOAD_FOLDER = "app/static/uploads"

def publicar_libro():
    data = request.form
    imagen_file = request.files.get("imagen")

    # Validar campos obligatorios
    campos = ['titulo', 'autor', 'estado', 'tipo', 'usuario_id', 'genero_id']
    for campo in campos:
        if campo not in data or not data[campo]:
            return jsonify({"error": f"Falta el campo '{campo}'"}), 400

    # Guardar la imagen si viene
    imagen_nombre = None
    if imagen_file:
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        imagen_nombre = secure_filename(imagen_file.filename)
        imagen_path = os.path.join(UPLOAD_FOLDER, imagen_nombre)
        imagen_file.save(imagen_path)

    # Crear libro
    libro = Libro(
        titulo=data['titulo'],
        autor=data['autor'],
        descripcion=data.get('descripcion'),
        estado=data['estado'],
        tipo=data['tipo'],
        usuario_id=int(data['usuario_id']),
        genero_id=int(data['genero_id']),
        imagen=imagen_nombre
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
    resultado = []
    for libro in libros:
        imagen_url = None
        if libro.imagen:
            # imagen_url = f"http://localhost:5000/static/uploads/{libro.imagen}"
            imagen_url = f"http://142.93.200.218:5000/static/uploads/{libro.imagen}"

        resultado.append({
            "id": libro.id,
            "titulo": libro.titulo,
            "autor": libro.autor,
            "descripcion": libro.descripcion,
            "estado": libro.estado,
            "tipo": libro.tipo,
            "usuario_id": libro.usuario_id,
            "genero_id": libro.genero_id,
            "imagen_url": imagen_url
        })

    return jsonify(resultado)



def obtener_libros_por_usuario(usuario_id):
    libros = Libro.query.filter_by(usuario_id=usuario_id).all()
    resultado = []

    for libro in libros:
        imagen_url = None
        if libro.imagen:
            # imagen_url = f"http://localhost:5000/static/uploads/{libro.imagen}"
            imagen_url = f"http://142.93.200.218:5000/static/uploads/{libro.imagen}"            

        publicacion_activa = Publicacion.query.filter_by(libro_id=libro.id).first()

        resultado.append({
            "id": libro.id,
            "titulo": libro.titulo,
            "autor": libro.autor,
            "descripcion": libro.descripcion,
            "estado": libro.estado,
            "tipo": libro.tipo,
            "usuario_id": libro.usuario_id,
            "genero_id": libro.genero_id,
            "genero": libro.genero.nombre if libro.genero else None,
            "imagen_url": imagen_url,
            "esta_publicado": publicacion_activa is not None  
        })

    return jsonify(resultado)
