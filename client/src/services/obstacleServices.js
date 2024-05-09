import axios from "axios";

const API_URL = 'http://localhost:5000/obstacle';

export const getObstacle = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los Obstacle:", error);
        throw error;
    }
};

export const getOneObstacle = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el Obstacle por ID", error);
        throw error;
    }
};

export const deleteObstacle = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200) {
            return { success: true, message: 'Eliminado correctamente' };
        }
    } catch (error) {
        console.error("Error al eliminar el Obstacle ", error);
        throw error;
    }
};

export const postObstacle = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return { success: true, message: 'Obstacle creado exitosamente', data: response.data };
    } catch (error) {
        console.error("Error al crear el Obstacle:", error);
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

export const updateObstacle = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        if (response.status === 200) {
            return { success: true, message: 'Obstacle actualizado correctamente', data: response.data };
        }
    } catch (error) {
        console.error("Error al actualizar el Obstacle:", error);
        throw error;
    }
};
