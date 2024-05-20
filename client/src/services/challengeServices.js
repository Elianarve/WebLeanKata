import axios from "axios";
import Swal from 'sweetalert2';


const API_URL_CHALLENGE = 'http://localhost:5000/challenge';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const getChallenge = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL_CHALLENGE}`, {headers});
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los retos:", error);
        throw error;
    }
};

export const getOneChallenge = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL_CHALLENGE}/${id}`, {headers});
        return response;
    } catch (error) {
        console.error("Error al obtener el reto por ID", error);
        throw error;
    }
};

export const deleteChallenge = async (id) => {
        try {
            const headers = getHeaders();
            const response = await axios.delete(`${API_URL_CHALLENGE}/${id}`, {headers});
            const confirmDelete = await Swal.fire({
                title: '¿Estás seguro que deseas borrar el reto?',
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
            console.error("Error al eliminar el reto ", error);
            throw error;
        }
};


export const postChallenge = async (data) => {
    const headers = getHeaders();
    const response = await axios.post(API_URL_CHALLENGE, data, {headers});
    return response;
  };


  export const updateChallenge = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL_CHALLENGE}/${id}`,data, {headers});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el reto:", error);
        throw error;
    }
};