from flask import jsonify
from app import db
from app.models.publicacion import Publicacion, TipoPublicacionEnum, EstadoLibroEnum

def crear_publicacion(data):
    try:
        nueva = Publicacion(
            libro_id=data['libro_id'],
            usuario_id=data['usuario_id'],
            tipo=TipoPublicacionEnum(data['tipo']),
            estado_libro=EstadoLibroEnum(data['estado_libro']),
            ubicacion=data['ubicacion'],
            comentarios_adicionales=data.get('comentarios_adicionales'),
            imagen_url=data.get('imagen_url')
        )
        db.session.add(nueva)
        db.session.commit()
        return jsonify({'mensaje': 'Publicación creada exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def obtener_publicaciones():
    publicaciones = Publicacion.query.filter_by(is_active=True).all()
    resultado = [
        {
            'id': p.id,
            'libro_id': p.libro_id,
            'usuario_id': p.usuario_id,
            'tipo': p.tipo.value,
            'estado_libro': p.estado_libro.value,
            'ubicacion': p.ubicacion,
            'comentarios_adicionales': p.comentarios_adicionales,
            'imagen_url': p.imagen_url,
            'is_active': p.is_active,
            'created_at': p.created_at.isoformat(),
            'updated_at': p.updated_at.isoformat(),
            'libro': {
                'titulo': p.libro.titulo,
                'autor': p.libro.autor,
                'descripcion': p.libro.descripcion,
                'estado': p.libro.estado,
                'tipo': p.libro.tipo,
                # 'imagen_url': f"http://localhost:5000/static/uploads/{p.libro.imagen}" if p.libro.imagen else None,
                'imagen_url': f"http://142.93.200.218:5000/static/uploads/{p.libro.imagen}" if p.libro.imagen else None,
                'genero_id': p.libro.genero_id,
            },
            'usuario': {
                'nombre': p.usuario.nombre, 
                'email': p.usuario.email,
            }
        } for p in publicaciones
    ]
    return jsonify(resultado), 200

def obtener_publicacion(pub_id):
    pub = Publicacion.query.get(pub_id)
    if not pub:
        return jsonify({'error': 'No encontrada'}), 404
    return jsonify({
        'id': pub.id,
        'libro_id': pub.libro_id,
        'usuario_id': pub.usuario_id,
        'tipo': pub.tipo.value,
        'estado_libro': pub.estado_libro.value,
        'ubicacion': pub.ubicacion,
        'comentarios_adicionales': pub.comentarios_adicionales,
        'imagen_url': pub.imagen_url,
        'is_active': pub.is_active,
        'created_at': pub.created_at.isoformat(),
        'updated_at': pub.updated_at.isoformat()
    })

def actualizar_publicacion(pub_id, data):
    pub = Publicacion.query.get(pub_id)
    if not pub:
        return jsonify({'error': 'No encontrada'}), 404
    try:
        pub.ubicacion = data.get('ubicacion', pub.ubicacion)
        pub.estado_libro = EstadoLibroEnum(data.get('estado_libro', pub.estado_libro.value))
        pub.imagen_url = data.get('imagen_url', pub.imagen_url)
        pub.comentarios_adicionales = data.get('comentarios_adicionales', pub.comentarios_adicionales)
        pub.is_active = data.get('is_active', pub.is_active)
        db.session.commit()
        return jsonify({'mensaje': 'Actualizada correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def eliminar_publicacion(pub_id):
    pub = Publicacion.query.get(pub_id)
    if not pub:
        return jsonify({'error': 'No encontrada'}), 404
    db.session.delete(pub)
    db.session.commit()
    return jsonify({'mensaje': 'Publicación eliminada'}), 200

def obtener_publicaciones_por_usuario(usuario_id):
    publicaciones = Publicacion.query.filter_by(usuario_id=usuario_id).all()

    resultado = [
        {
            'id': p.id,
            'libro_id': p.libro_id,
            'usuario_id': p.usuario_id,
            'tipo': p.tipo.value,
            'estado_libro': p.estado_libro.value,
            'ubicacion': p.ubicacion,
            'comentarios_adicionales': p.comentarios_adicionales,
            'imagen_url': p.imagen_url,
            'is_active': p.is_active,
            'created_at': p.created_at.isoformat(),
            'updated_at': p.updated_at.isoformat(),
            'libro': {
                'titulo': p.libro.titulo,
                'autor': p.libro.autor,
                'descripcion': p.libro.descripcion,
                'estado': p.libro.estado,
                'tipo': p.libro.tipo,
                # 'imagen_url': f"http://localhost:5000/static/uploads/{p.libro.imagen}" if p.libro.imagen else None,
                'imagen_url': f"http://142.93.200.218:5000/static/uploads/{p.libro.imagen}" if p.libro.imagen else None,
                'genero_id': p.libro.genero_id,
                'genero': p.libro.genero.nombre if p.libro.genero else None,
            },
            'usuario': {
                'nombre': p.usuario.nombre if p.usuario else 'Usuario desconocido',
                'email': p.usuario.email,
            }
        } for p in publicaciones
    ]
    return jsonify(resultado), 200
