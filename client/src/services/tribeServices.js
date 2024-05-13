import axios from "axios";

const API_URL_AE = 'http://localhost:5000/tribe';

export const getTribe = async () => {
    try {
        const response = await axios.get(`${API_URL_AE}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener las tribus:", error);
        throw error;
    }
};

export const getOneTribe = async (id) => {
    try {
        const response = await axios.get(`${API_URL_AE}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener la tribu por ID", error);
        throw error;
    }
};

export const deleteTribe = async (id) => {
        try {
            const response = await axios.delete(`${API_URL_AE}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar la tribu?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar la tribu", error);
            throw error;
        }
};

export const postTribe = async (data) => {
    const response = await axios.post(API_URL_AE, data);
    alert("Tribu creada exitosamente")
    return response;
  }


  export const updateTribe = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL_AE}/${id}`,data);
        if (response.status === 200) {
            alert('Tribu actualizada correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar la tribu:", error);
        throw error;
    }
};
