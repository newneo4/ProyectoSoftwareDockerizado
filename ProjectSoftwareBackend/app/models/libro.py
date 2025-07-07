from app import db
from app.models.genero import Genero  # ✅ ESTA LÍNEA es la clave

class Libro(db.Model):
    __tablename__ = "libro"

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    estado = db.Column(db.String(50), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)
    imagen = db.Column(db.String(255), nullable=True)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    genero_id = db.Column(db.Integer, db.ForeignKey('genero.id'), nullable=False)

    solicitudes = db.relationship('Solicitud', backref='libro', lazy=True)
    genero = db.relationship('Genero', backref='libros')
