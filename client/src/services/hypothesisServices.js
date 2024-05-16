import axios from "axios";

const API_URL = 'http://localhost:8000/hypothesis';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const getHypothesis = async () => {
    try {
        const headers = getHeaders();
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
        const headers = getHeaders();
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
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar la Hypothesis ", error);
            throw error;
        }
};

export const postHypothesis = async (data) => {
    try {
        const headers = getHeaders();
        const response = await axios.post(`${API_URL}`, data);
        if (response.status === 201) {
            alert('Hypothesis creado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al crear la Hypothesis:", error);
        throw error;
    }
}


  export const updateHypothesis = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('Hypothesis actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Hypothesis:", error);
        throw error;
    }
};

