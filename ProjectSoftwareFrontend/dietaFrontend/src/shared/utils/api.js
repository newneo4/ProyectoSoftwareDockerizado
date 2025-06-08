import axios from 'axios';

// const main_route = 'http://127.0.0.1:5000'
const main_route = "http://flask_backend:5000";

// Crear una instancia de Axios con la URL base de tu API backend
const api = axios.create({
  baseURL: main_route,  // Cambia a la URL de tu backend
  timeout: 5000, // tiempo máximo de espera en ms
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
