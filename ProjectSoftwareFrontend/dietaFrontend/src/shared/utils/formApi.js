import axios from "axios";

const formApi = axios.create({
  baseURL: "http://127.0.0.1:5000", 
  timeout: 5000,
});

export default formApi;
