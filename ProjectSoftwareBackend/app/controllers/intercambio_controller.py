from flask import jsonify
from app import db
from app.models.intercambio import Intercambio
from app.models.usuario import Usuario
from app.models.libro import Libro
from app.models.publicacion import Publicacion

def crear_intercambio(data):
    try:
        nuevo_intercambio = Intercambio(
            sender_user_id=data['sender_user_id'],
            receiver_user_id=data['receiver_user_id'],
            book_offered_id=data['book_offered_id'],
            book_requested_id=data['book_requested_id'],
            message=data.get('message', ''),
            status=data.get('status', 'pendiente')
        )

        db.session.add(nuevo_intercambio)
        db.session.commit()

        return jsonify({
            "id": nuevo_intercambio.id,
            "sender_user_id": nuevo_intercambio.sender_user_id,
            "receiver_user_id": nuevo_intercambio.receiver_user_id,
            "book_offered_id": nuevo_intercambio.book_offered_id,
            "book_requested_id": nuevo_intercambio.book_requested_id,
            "message": nuevo_intercambio.message,
            "status": nuevo_intercambio.status,
            "created_at": nuevo_intercambio.created_at.isoformat()
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


def listar_intercambios():
    intercambios = Intercambio.query.all()
    resultado = [{
        "id": i.id,
        "sender_user_id": i.sender_user_id,
        "receiver_user_id": i.receiver_user_id,
        "status": i.status
    } for i in intercambios]

    return jsonify(resultado), 200


def obtener_intercambio(id):
    intercambio = Intercambio.query.get(id)
    if not intercambio:
        return jsonify({'error': 'Intercambio no encontrado'}), 404

    return jsonify({
        'id': intercambio.id,
        'sender_user_id': intercambio.sender_user_id,
        'receiver_user_id': intercambio.receiver_user_id,
        'book_offered_id': intercambio.book_offered_id,
        'book_requested_id': intercambio.book_requested_id,
        'message': intercambio.message,
        'status': intercambio.status,
        'created_at': intercambio.created_at.isoformat()
    })


def aceptar_intercambio(id):
    intercambio = Intercambio.query.get(id)
    if not intercambio:
        return jsonify({'error': 'Intercambio no encontrado'}), 404

    intercambio.status = 'aceptado'

    publicacion_ofrecida = Publicacion.query.filter_by(libro_id=intercambio.book_offered_id).first()
    if publicacion_ofrecida:
        publicacion_ofrecida.is_active = False

    publicacion_solicitada = Publicacion.query.filter_by(libro_id=intercambio.book_requested_id).first()
    if publicacion_solicitada:
        publicacion_solicitada.is_active = False

    db.session.commit()

    return jsonify({'mensaje': 'Intercambio aceptado correctamente'})


def rechazar_intercambio(id):
    intercambio = Intercambio.query.get(id)
    if not intercambio:
        return jsonify({'error': 'Intercambio no encontrado'}), 404

    intercambio.status = 'rechazado'
    db.session.commit()

    return jsonify({'mensaje': 'Intercambio rechazado correctamente'})


def listar_intercambios_por_usuario(usuario_id):
    intercambios = Intercambio.query.filter_by(receiver_user_id=usuario_id).all()

    resultado = []
    for i in intercambios:
        resultado.append({
            "id": i.id,
            "status": i.status,
            "message": i.message,
            "created_at": i.created_at.isoformat(),

            "libro_ofrecido": {
                "id": i.libro_ofrecido.id,
                "titulo": i.libro_ofrecido.titulo,
                "autor": i.libro_ofrecido.autor
            },

            "libro_pedido": {
                "id": i.libro_pedido.id,
                "titulo": i.libro_pedido.titulo,
                "autor": i.libro_pedido.autor
            },

            "usuario_solicitante": {
                "id": i.usuario_solicitante.id,
                "nombre": i.usuario_solicitante.nombre,
                "apellido": i.usuario_solicitante.apellido,
                "email": i.usuario_solicitante.email
            }
        })

    return jsonify(resultado), 200

def listar_intercambios_enviados_por_usuario(usuario_id):
    intercambios = Intercambio.query.filter_by(sender_user_id=usuario_id).all()

    resultado = []
    for i in intercambios:
        resultado.append({
            "id": i.id,
            "status": i.status,
            "message": i.message,
            "created_at": i.created_at.isoformat(),

            "libro_ofrecido": {
                "id": i.libro_ofrecido.id,
                "titulo": i.libro_ofrecido.titulo,
                "autor": i.libro_ofrecido.autor
            },

            "libro_pedido": {
                "id": i.libro_pedido.id,
                "titulo": i.libro_pedido.titulo,
                "autor": i.libro_pedido.autor
            },

            "usuario_receptor": {
                "id": i.aceptado_por_usuario.id,
                "nombre": i.aceptado_por_usuario.nombre,
                "apellido": i.aceptado_por_usuario.apellido,
                "email": i.aceptado_por_usuario.email
            }
        })

    return jsonify(resultado), 200
