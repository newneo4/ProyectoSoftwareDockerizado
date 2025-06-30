from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)
    from app import models  
    migrate.init_app(app, db)

    from app.routes.usuario_routes import usuario_bp
    from app.routes.publicacion_routes import publicacion_bp

    from app.routes.libro_routes import libro_bp
    app.register_blueprint(libro_bp)

    app.register_blueprint(usuario_bp)
    app.register_blueprint(publicacion_bp)


    return app
