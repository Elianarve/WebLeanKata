import axios from "axios";

const API_URL = 'http://localhost:5001/experiment';

export const getExperiment = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        console.log(data)
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
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Experiment ", error);
            throw error;
        }
};

export const postExperiment = async (data) => {
    const response = await axios.post(API_URL, data);
    alert("Experimento creado exitosamente")
    return response;
  }


  export const updateExperiment = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('Experiment actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Experiment:", error);
        throw error;
    }
};

