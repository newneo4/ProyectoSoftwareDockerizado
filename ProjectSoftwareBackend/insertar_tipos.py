from app import db
from app.models.tipo_usuario import TipoUsuario

tipos = ['Estudiante', 'Biblioteca', 'Lector']
for nombre in tipos:
    if not TipoUsuario.query.filter_by(nombre=nombre).first():
        db.session.add(TipoUsuario(nombre=nombre))
db.session.commit()
