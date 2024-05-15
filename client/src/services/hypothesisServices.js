import axios from "axios";

const API_URL = 'http://localhost:8000/hypothesis';

export const getHypothesis = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener las Hypothesis:", error);
        throw error;
    }
};

export const getOneHypothesis = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener la Hypothesis por ID", error);
        throw error;
    }
};

export const deleteHypothesis = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el contraste mental?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar la Hypothesis ", error);
            throw error;
        }
};

export const postHypothesis = async (data) => {
    const response = await axios.post(API_URL, data);
    return response;
  }


  export const updateHypothesis = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Hypothesis:", error);
        throw error;
    }
};

