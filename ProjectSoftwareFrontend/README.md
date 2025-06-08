# 🧩 Estructura por Features - Proyecto React

Este proyecto está organizado utilizando el patrón de **estructura por funcionalidades** (*feature-based architecture*), ideal para proyectos escalables y mantenibles.

## 📁 Estructura de carpetas

```plaintext

public/
├── images/                   #Directorio donde guardaremos las imagenes de la landing
src/
├── features/
│   ├── login/
│   │   ├── Login.jsx         # Componente principal de Login
│   │   ├── loginService.js   # Llamadas API relacionadas a Login
│   │   ├── loginSlice.js     # Redux slice para Login
│   │   ├── useLogin.js       # Hook personalizado para Login
│   │   ├── login.css         # Estilos propios del módulo
│   │   └── login.test.js     # Pruebas del módulo Login
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   └── ...                   # Otros features(tipo Login, Register)
│─── components/              # Componentes reutilizables
│   ├── ui/                   # Componentes que se cargaran mediante la instacion por comandos de shadcn (No tocar)
├── shared/
│   ├── hooks/                # Custom hooks reutilizables
│   ├── utils/                # Funciones utilitarias
├── routes/
│   └── AppRouter.jsx         # Definición de rutas de la aplicación
├── assets/                   # Imágenes, fuentes, etc.
├── App.jsx                   # Componente raíz
└── main.jsx                  # Punto de entrada (Vite)
```
## 🇦 Librerias
<ul>
<li>https://react-icons.github.io/react-icons/icons/fc/  #ICONOS</li>
<li>https://emojipedia.org/chicken #ICONOS Q NO REQUIEREN IMPORTAR SOLO COPIAR Y PEGAR</li>
<li>https://uicolors.app/browse/tailwind-colors  #PALETAS</li>
<li>https://fonts.google.com/  #FUENTES </li>
</ul>
