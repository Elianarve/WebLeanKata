import axios from "axios";

const API_URL = 'http://localhost:8000/learning';

export const getLearning = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los Learning:", error);
        throw error;
    }
};

export const getOneLearning = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el Learning por ID", error);
        throw error;
    }
};

export const deleteLearning = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el contraste mental?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Learning ", error);
            throw error;
        }
};


export const postLearning = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    return response;
  };


  export const updateLearning = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Learning:", error);
        throw error;
    }
};

