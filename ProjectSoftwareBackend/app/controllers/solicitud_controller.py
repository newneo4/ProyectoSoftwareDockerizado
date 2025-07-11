from flask import jsonify
from app import db
from app.models.solicitud import Solicitud
from app.models.usuario import Usuario
from app.models.libro import Libro
from app.models.publicacion import Publicacion


def crear_solicitud(data):
    try:
        nueva_solicitud = Solicitud(
            usuario_solicitante_id=data['usuario_solicitante_id'],
            libro_id=data['libro_id'],            
            mensaje=data.get('message', ''),
            estado=data.get('status', 'pendiente'),
            aceptado_por_usuario_id=data['accepted_by_user']
        )
        db.session.add(nueva_solicitud)
        db.session.commit()

        return jsonify({
            "id": nueva_solicitud.id,
            "usuario_solicitante_id": nueva_solicitud.usuario_solicitante_id,
            "libro_id": nueva_solicitud.libro_id,
            "mensaje": nueva_solicitud.mensaje,
            "estado": nueva_solicitud.estado,
            "created_at": nueva_solicitud.created_at.isoformat(),
            "accepted_by_user": nueva_solicitud.aceptado_por_usuario_id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

def listar_solicitudes():
    solicitudes = Solicitud.query.all()
    resultado = [{
        "id": s.id,
        "usuario_solicitante_id": s.usuario_solicitante_id,
        "libro_id": s.libro_id,
        "estado": s.estado
    } for s in solicitudes]

    return jsonify(resultado), 200

def obtener_solicitud(id):
    solicitud = Solicitud.query.get(id)
    if not solicitud:
        return jsonify({'error': 'Solicitud no encontrada'}), 404

    return jsonify({
        'id': solicitud.id,
        'usuario_solicitante_id': solicitud.usuario_solicitante_id,
        'libro_id': solicitud.libro_id,
        'mensaje': solicitud.mensaje,
        'estado': solicitud.estado,
        'created_at': solicitud.created_at.isoformat(),
        'accepted_by_user': solicitud.aceptado_por_usuario_id
    })

def aceptar_solicitud(id):
    solicitud = Solicitud.query.get(id)
    if not solicitud:
        return jsonify({'error': 'Solicitud no encontrada'}), 404

    solicitud.estado = 'aceptada'

    publicacion = Publicacion.query.filter_by(libro_id=solicitud.libro_id).first()
    if publicacion:
        publicacion.is_active = False

    db.session.commit()

    return jsonify({'mensaje': 'Solicitud aceptada correctamente'})

def rechazar_solicitud(id):
    solicitud = Solicitud.query.get(id)
    if not solicitud:
        return jsonify({'error': 'Solicitud no encontrada'}), 404

    solicitud.estado = 'rechazada'
    db.session.commit()

    return jsonify({'mensaje': 'Solicitud rechazada correctamente'})

def listar_solicitudes_por_usuario(usuario_id):
    solicitudes = Solicitud.query.filter_by(aceptado_por_usuario_id=usuario_id).all()

    resultado = []
    for solicitud in solicitudes:
        resultado.append({
            "id": solicitud.id,
            "estado": solicitud.estado,
            "mensaje": solicitud.mensaje,
            "created_at": solicitud.created_at.isoformat(),

            "libro": {
                "id": solicitud.libro.id,
                "titulo": solicitud.libro.titulo,
                "autor": solicitud.libro.autor
            },

            "usuario_solicitante": {
                "id": solicitud.usuario_solicitante.id,
                "nombre": solicitud.usuario_solicitante.nombre,
                "apellido": solicitud.usuario_solicitante.apellido,
                "email": solicitud.usuario_solicitante.email
            }
        })

    return jsonify(resultado)
