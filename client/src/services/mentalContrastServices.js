import axios from "axios";

const API_URL = 'http://localhost:8000/mentalcontrast';
const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};


export const getMentalContrast = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los MentalContrast:", error);
        throw error;
    }
};

export const getOneMentalContrast = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el MentalContrast por ID", error);
        throw error;
    }
};

export const deleteMentalContrast = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el contraste mental?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el MentalContrast ", error);
            throw error;
        }
};


export const postMentalContrast = async (data) => {
    const response = await axios.post(API_URL, data);
    return response;
  };


  export const updateMentalContrast = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Learning:", error);
        throw error;
    }
};

