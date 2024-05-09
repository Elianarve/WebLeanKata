import axios from "axios";

const API_URL = 'http://localhost:5000/results';

export const getResult = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los Result:", error);
        throw error;
    }
};

export const getOneResult = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el Result por ID", error);
        throw error;
    }
};

export const deleteResult = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Result ", error);
            throw error;
        }
};


export const postResult = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    alert("Result creado exitosamente");
    return response;
  };


  export const updateResult = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('Result actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Result:", error);
        throw error;
    }
};

