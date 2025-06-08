from flask import jsonify
from app import db
from app.models.solicitud import Solicitud

def crear_solicitud(data):
    try:
        nueva_solicitud = Solicitud(
            usuario_solicitante_id=data['usuario_solicitante_id'],
            libro_id=data['libro_id'],
            estado=data.get('estado', 'pendiente')
        )
        db.session.add(nueva_solicitud)
        db.session.commit()

        return jsonify({
            "id": nueva_solicitud.id,
            "usuario_solicitante_id": nueva_solicitud.usuario_solicitante_id,
            "libro_id": nueva_solicitud.libro_id,
            "estado": nueva_solicitud.estado
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
