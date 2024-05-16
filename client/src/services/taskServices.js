import axios from "axios";

const API_URL = 'http://localhost:8000/task';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const getTask = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(API_URL, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los Task :", error);
        throw error;
    }
};

export const getOneTask = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el Task  por ID", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200) {
            alert('Eliminado correctamente');
        }
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el Task  ", error);
        throw error;
    }
};

export const postTask = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        alert("Task creado exitosamente");
        return response.data;
    } catch (error) {
        console.error("Error al crear el Task :", error);
        throw error;
    }
};

export const updateTask = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`, data, { headers });
        if (response.status === 200) {
            alert('Task actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Task :", error);
        throw error;
    }
};
