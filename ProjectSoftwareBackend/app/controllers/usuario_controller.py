from flask import jsonify
from app import db
from app.models.usuario import Usuario
from app.models.tipo_usuario import TipoUsuario

def registrar_usuario(data):
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    password = data.get('password')
    tipo_usuario_id = data.get('tipo_usuario_id')

    if not all([nombre, apellido, email, password, tipo_usuario_id]):
        return jsonify({"error": "Faltan datos requeridos"}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"error": "Email ya registrado"}), 400

    tipo_usuario = TipoUsuario.query.get(tipo_usuario_id)
    if not tipo_usuario:
        return jsonify({"error": "Tipo de usuario no válido"}), 400

    usuario = Usuario(
        nombre=nombre,
        apellido=apellido,
        email=email,
        tipo_usuario_id=tipo_usuario_id
    )
    usuario.set_password(password)
    db.session.add(usuario)
    db.session.commit()

    return jsonify({
        "id": usuario.id,
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "email": usuario.email,
        "tipo_usuario": tipo_usuario.nombre
    }), 201

def login_usuario(data):
    usuario = Usuario.query.filter_by(email=data['email']).first()
    if usuario and usuario.check_password(data['password']):
        return jsonify({"message": "Login exitoso", "usuario": usuario.nombre, "id": usuario.id, "email": usuario.email})
    return jsonify({"error": "Credenciales inválidas"}), 401