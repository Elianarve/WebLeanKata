import axios from "axios";
import Swal from 'sweetalert2';


const API_URL = 'http://localhost:5000/hypothesis';

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
        const response = await axios.get(`${API_URL}`, {headers});
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
        const response = await axios.get(`${API_URL}/${id}`, {headers});
        return response;
    } catch (error) {
        console.error("Error al obtener la Hypothesis por ID", error);
        throw error;
    }
};

export const deleteHypothesis = async (id) => {
        try {const headers = getHeaders();
            const response = await axios.delete(`${API_URL}/${id}`, {headers});
            const confirmDelete = await Swal.fire({
                title: '¿Estás seguro que deseas borrar la hipotesis?',
                showCancelButton: true,
                confirmButtonColor: '#fb005a',
                cancelButtonColor: '#171717',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });           
             if (confirmDelete && response.status === 200) {
                Swal.fire('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar la Hypothesis ", error);
            throw error;
        }
};

export const postHypothesis = async (data) => {
    const headers = getHeaders();
    const response = await axios.post(API_URL, data, {headers});
    return response;
  }


  export const updateHypothesis = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`,data, {headers});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Hypothesis:", error);
        throw error;
    }
};

