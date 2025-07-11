from app import db
from datetime import datetime

class Intercambio(db.Model):
    __tablename__ = "intercambio"

    id = db.Column(db.Integer, primary_key=True)
    sender_user_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    receiver_user_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    book_offered_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    book_requested_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    message = db.Column(db.String(100), default="")
    status = db.Column(db.String(20), default="pendiente")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    usuario_solicitante = db.relationship(
        'Usuario',
        foreign_keys=[sender_user_id],
        backref='intercambio_enviado'
    )

    aceptado_por_usuario = db.relationship(
        'Usuario',
        foreign_keys=[receiver_user_id],
        backref='Intercambio_aceptado'
    )
    
    libro_ofrecido = db.relationship(
        'Libro',
        foreign_keys=[book_offered_id],
        backref='Libro_enviado'
    )

    libro_pedido = db.relationship(
        'Libro',
        foreign_keys=[book_requested_id],
        backref='Libro_requerido'
    )
