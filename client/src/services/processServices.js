import axios from "axios";

const API_URL_AE = 'http://localhost:8000/process';
const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};


export const getProcess = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL_AE}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los procesos:", error);
        throw error;
    }
};

export const getOneProcess = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL_AE}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el EA por ID", error);
        throw error;
    }
};

export const deleteProcess = async (id) => {
        try {
            const response = await axios.delete(`${API_URL_AE}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el Proceso?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el proceso ", error);
            throw error;
        }
};

export const postProcess = async (data) => {
    const response = await axios.post(API_URL_AE, data);
    return response;
  }


  export const updateProcess = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL_AE}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Proceso:", error);
        throw error;
    }
};

