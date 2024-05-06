import axios from "axios";

const API_URL = 'http://localhost:5000/mentalcontrast';

export const getMentalContrast = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los MentalContrast:", error);
        throw error;
    }
};

export const getOneMentalContrast = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el MentalContrast por ID", error);
        throw error;
    }
};

export const deleteMentalContrast = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el MentalContrast ", error);
            throw error;
        }
};


export const postMentalContrast = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    alert("MentalContrast creado exitosamente");
    return response;
  };


  export const updateMentalContrast = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('MentalContrast actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Learning:", error);
        throw error;
    }
};

