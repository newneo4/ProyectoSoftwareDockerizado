# 🧩 Estructura MVC - Proyecto Flask API
Este proyecto está organizado utilizando el patrón Modelo-Vista-Controlador (MVC), ideal para aplicaciones backend escalables y fáciles de mantener. La estructura se divide en Modelos para la gestión de datos, Controladores para la lógica de negocio y Rutas para los endpoints de la API, todo ello siguiendo buenas prácticas para garantizar un desarrollo ágil y pruebas efectivas.

## 📁 Estructura de carpetas

```plaintext
/tu_proyecto/
│
├── app/                         # 🚀 Módulo principal de la aplicación
│   ├── __init__.py              # 🧩 Inicializa Flask y registra Blueprints
│   │
│   ├── models/                  # 🧬 Modelos (SQLAlchemy)
│   │   ├── __init__.py
│   │   └── usuario.py           # 📄 Modelo Usuario
│   │
│   ├── controllers/             # 🧠 Lógica de negocio (controladores)
│   │   ├── __init__.py
│   │   └── usuario_controller.py
│   │
│   ├── routes/                  # 🌐 Rutas (endpoints de la API)
│   │   ├── __init__.py
│   │   └── usuario_routes.py
│   │
│   ├── config.py                # ⚙️ Configuración (entorno, BD, claves)
│
├── tests/                       # 🧪 Pruebas unitarias / integración
│   └── test_usuario.py
│
├── migrations/                  # 📦 Migraciones de base de datos (Flask-Migrate)
│
├── .env                         # 🔐 Variables sensibles (no subir al repo)
├── requirements.txt             # 📦 Lista de dependencias del proyecto
├── run.py                       # ▶️ Punto de entrada para ejecutar la app
└── README.md                    # 📘 Documentación del proyecto
```

## 📁 Como correr el proyecto
```plaintext
python -m venv venv
source venv/bin/activate   # o venv\Scripts\activate en Windows
pip install -r requirements.txt

# Inicializar la base de datos
flask db init
flask db migrate -m "crear tabla usuario"
flask db upgrade

# Ejecutar la app
python run.py
```

## COMANDOS PARA SUBIR CAMBIOS A GITHUB
git pull
git add .
git commit -m "cambios"
git push

## COMANOS PARA DESCARGAR LOS CAMBIOS A NUESTRO LOCAL
git pull

### IMPORTANTE !!!! 
siempre guardar los cambios y subirlos, 
Siempre hacer " git pull " antes de empezar a trabajar
