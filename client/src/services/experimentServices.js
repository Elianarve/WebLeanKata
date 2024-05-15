import axios from "axios";

const API_URL = 'http://localhost:8000/experiment';

export const getExperiment = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los experimentos:", error);
        throw error;
    }
};

export const getOneExperiment = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el Experiment por ID", error);
        throw error;
    }
};

export const deleteExperiment = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el contraste mental?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Experiment ", error);
            throw error;
        }
};

export const postExperiment = async (data) => {
    const response = await axios.post(API_URL, data);
    return response;
  }

  export const updateExperiment = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Result:", error);
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

