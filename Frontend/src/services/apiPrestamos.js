import axios from "axios";

const API_URL = "http://localhost:3000/api/prestamos";

//Obtener los Prestamos

export function getPrestamos () {
    return axios.get(API_URL);
}

//Crear un Prestamo

export function createPrestamo (data) {
    return axios.post(API_URL, data);
}

//Actualizar Prestamo

export function updatePrestamo (id, data) {
    return axios.put(`${API_URL}/${id}`, data);
}