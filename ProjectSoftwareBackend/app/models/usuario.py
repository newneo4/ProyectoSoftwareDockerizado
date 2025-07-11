from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    
    tipo_usuario_id = db.Column(db.Integer, db.ForeignKey('tipo_usuario.id'), nullable=False)
    
    tipo_usuario = db.relationship('TipoUsuario', back_populates='usuarios')
    libros = db.relationship('Libro', backref='dueño', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
