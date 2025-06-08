from app import db

class Libro(db.Model):
    __tablename__ = "libro"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # donación o intercambio
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

    solicitudes = db.relationship('Solicitud', backref='libro', lazy=True)
