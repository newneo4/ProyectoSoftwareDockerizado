import axios from "axios";

// const main_route = "http://127.0.0.1:5000";

//DESCOMENTAR AL SUBIR
const main_route = "http://142.93.200.218:5000";

const formApi = axios.create({
  baseURL: main_route,
  timeout: 5000,
});

export default formApi;
