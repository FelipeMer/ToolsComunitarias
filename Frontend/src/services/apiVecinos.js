import axios from "axios";

const API_URL = "http://localhost:3000/api/vecinos";

//Obtener los Vecinos

export function getVecinos () {
    return axios.get(API_URL);
}

//Crear un Vecino

export function createVecino (data) {
    return axios.post(API_URL, data);
}

//Actualizar Vecino

export function updateVecino (id, data) {
    return axios.put(`${API_URL}/${id}`, data);
}

//Eliminar Vecino

export function deleteVecino (id) {
    return axios.delete(`${API_URL}/${id}`);
}