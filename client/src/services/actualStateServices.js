import axios from "axios";

const API_URL_AE = 'http://localhost:5001/actualstates';

export const getActualState = async () => {
    try {
        const response = await axios.get(`${API_URL_AE}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los retos:", error);
        throw error;
    }
};

export const getOneActualState = async (id) => {
    try {
        const response = await axios.get(`${API_URL_AE}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el EA por ID", error);
        throw error;
    }
};

export const deleteActualState = async (id) => {
        try {
            const response = await axios.delete(`${API_URL_AE}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el estado objetivo?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el EA ", error);
            throw error;
        }
};

export const postActualState = async (data) => {
    const response = await axios.post(API_URL_AE, data);
    alert("EA creado exitosamente")
    return response;
  }


  export const updateActualState = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL_AE}/${id}`,data);
        if (response.status === 200) {
            alert('Estado actual actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el EA:", error);
        throw error;
    }
};

