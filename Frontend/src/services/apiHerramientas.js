import axios from "axios";

const API_URL = "http://localhost:3000/api/herramientas";

//Obtener las herramientas

export function getHerramientas () {
    return axios.get(API_URL);
}

//Crear una herramienta

export function createHerramienta (data) {
    return axios.post(API_URL, data);
}

//Actualizar herramienta

export function updateHerramienta (id, data) {
    return axios.put(`${API_URL}/${id}`, data);
}

//Eliminar Herramienta

export function deleteHerramienta (id) {
    return axios.delete(`${API_URL}/${id}`);
}