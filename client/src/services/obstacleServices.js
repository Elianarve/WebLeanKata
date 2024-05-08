import axios from "axios";

const API_URL = 'http://localhost:5000/obstacle';

export const getObstacle = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los Obstacle:", error);
        throw error;
    }
};

export const getOneObstacle = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el Obstacle por ID", error);
        throw error;
    }
};

export const deleteObstacle = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Obstacle ", error);
            throw error;
        }
};


export const postObstacle = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    alert("Obstacle creado exitosamente");
    return response;
  };


  export const updateObstacle = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('Obstacle actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Obstacle:", error);
        throw error;
    }
};

