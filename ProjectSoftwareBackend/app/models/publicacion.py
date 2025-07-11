from app import db
from datetime import datetime
from enum import Enum

class TipoPublicacionEnum(Enum):
    DONACION = 'donacion'
    INTERCAMBIO = 'intercambio'

class EstadoLibroEnum(Enum):
    NUEVO = 'nuevo'
    USADO = 'usado'
    BUEN_ESTADO= 'buen-estado'
    COMO_NUEVO = 'como-nuevo'

class Publicacion(db.Model):
    __tablename__ = 'publicaciones'

    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)     # ✅ corregido
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False) # ✅ corregido
    tipo = db.Column(db.Enum(TipoPublicacionEnum), nullable=False)
    estado_libro = db.Column(db.Enum(EstadoLibroEnum), nullable=False)
    ubicacion = db.Column(db.String(255), nullable=False)
    comentarios_adicionales = db.Column(db.Text)
    imagen_url = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    libro = db.relationship("Libro", backref="publicaciones")
    usuario = db.relationship("Usuario", backref="publicaciones")
