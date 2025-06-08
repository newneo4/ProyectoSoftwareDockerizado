# tipo_usuario.py
from app import db

class TipoUsuario(db.Model):
    __tablename__ = 'tipo_usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False, unique=True)

    # Relación con Usuario
    usuarios = db.relationship('Usuario', back_populates='tipo_usuario')
