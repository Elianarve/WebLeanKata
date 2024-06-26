import axios from "axios";
import Swal from 'sweetalert2';


const API_URL = 'http://localhost:5000/results';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const getResult = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}`, {headers});
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los Result:", error);
        throw error;
    }
};

export const getOneResult = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}/${id}`, {headers});
        return response;
    } catch (error) {
        console.error("Error al obtener el Result por ID", error);
        throw error;
    }
};

export const deleteResult = async (id) => {
        try {
            const headers = getHeaders();
            const response = await axios.delete(`${API_URL}/${id}`, {headers});
            const confirmDelete = await Swal.fire({
                title: '¿Estás seguro que deseas borrar el resultado?',
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
            console.error("Error al eliminar el Result ", error);
            throw error;
        }
};


export const postResult = async (data) => {
    const headers = getHeaders();
    const response = await axios.post(API_URL, data, {headers});
    return response;
  };


  export const updateResult = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`,data, {headers});
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Result:", error);
        throw error;
    }
};
