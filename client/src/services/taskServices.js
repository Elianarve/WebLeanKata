import axios from "axios";

const API_URL = 'http://localhost:8000/task';

export const getTask = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los Task :", error);
        throw error;
    }
};

export const getOneTask  = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el Task  por ID", error);
        throw error;
    }
};

export const deleteTask  = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el Task  ", error);
            throw error;
        }
};


export const postTask  = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    alert("Task  creado exitosamente");
    return response;
  };


  export const updateTask  = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('Task  actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el Task :", error);
        throw error;
    }
};

