from app import db

class Solicitud(db.Model):
    __tablename__ = "solicitud"

    id = db.Column(db.Integer, primary_key=True)
    usuario_solicitante_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    estado = db.Column(db.String(20), default="pendiente")  # pendiente, aceptada, rechazada

    usuario_solicitante = db.relationship('Usuario', foreign_keys=[usuario_solicitante_id])
