import axios from "axios";
import Swal from 'sweetalert2';


const API_URL = 'http://localhost:5000/obstacle';

const getHeaders = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token no encontrado en el almacenamiento local');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const getObstacle = async () => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}`, { headers });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error("Error al obtener los Obstacle:", error);
        throw error;
    }
};

export const getOneObstacle = async (id) => {
    try {
        const headers = getHeaders();
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el Obstacle por ID", error);
        throw error;
    }
};

export const deleteObstacle = async (id) => {
        try {
            const headers = getHeaders();
            const response = await axios.delete(`${API_URL}/${id}`, { headers });
            const confirmDelete = await Swal.fire({
                title: '¿Estás seguro que deseas borrar el obstaculo?',
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
            console.error("Error al eliminar el Obstacle ", error);
            throw error;
        }
};

export const postObstacle = async (data) => {
    const headers = getHeaders();
    const response = await axios.post(API_URL, data, { headers });
    return response;
  };


export const updateObstacle = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await axios.put(`${API_URL}/${id}`, data, { headers });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Obstacle:", error);
        throw error;
    }
};

export const uploadImage = async (imageData) => {
    try {
        const response = await axios.post(
            "http://api.cloudinary.com/v1_1/dpkll45y2/image/upload",
            imageData
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al cargar la imagen en Cloudinary: " + error.message);
    }
};

export const updateImage = async (imageData) => {
    try {
        const response = await axios.put(
            `http://api.cloudinary.com/v1_1/dpkll45y2/image/upload`,
            imageData
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al cargar la imagen en Cloudinary: " + error.message);
    }
}
