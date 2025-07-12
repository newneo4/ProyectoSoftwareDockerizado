import axios from 'axios';

// const main_route = 'http://127.0.0.1:5000'
//const main_route = "http://flask_backend:5000";
//const main_route = "http://localhost:5000";
//const main_route = "http://backend:5000";


//DESCOMENTAR ANTES DE SUBIR
const main_route = "http://142.93.200.218:5000";

// Crear una instancia de Axios con la URL base de tu API backend
const api = axios.create({
  baseURL: main_route,  // Cambia a la URL de tu backend
  timeout: 5000, // tiempo máximo de espera en ms
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
