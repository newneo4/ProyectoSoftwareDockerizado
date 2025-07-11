from app import db
from datetime import datetime

class Solicitud(db.Model):
    __tablename__ = "solicitud"

    id = db.Column(db.Integer, primary_key=True)
    usuario_solicitante_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    mensaje = db.Column(db.Text, nullable=True)
    estado = db.Column(db.String(20), default="pendiente")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    aceptado_por_usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

    # Relaciones desambiguadas
    libro = db.relationship('Libro', back_populates='solicitudes')
    
    usuario_solicitante = db.relationship(
        'Usuario',
        foreign_keys=[usuario_solicitante_id],
        backref='solicitudes_realizadas'
    )

    aceptado_por_usuario = db.relationship(
        'Usuario',
        foreign_keys=[aceptado_por_usuario_id],
        backref='solicitudes_aceptadas'
    )
