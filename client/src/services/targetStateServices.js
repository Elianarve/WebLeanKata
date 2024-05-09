import axios from "axios";

const API_URL = 'http://localhost:5000/targetstate';

export const getTargetState = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los TargetState:", error);
        throw error;
    }
};

export const getOneTargetState = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener el TargetState por ID", error);
        throw error;
    }
};

export const deleteTargetState = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el estado objetivo?"); 
            if (confirmDelete && response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el TargetState ", error);
            throw error;
        }
};


export const postTargetState = async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(response);
    alert("TargetState creado exitosamente");
    return response;
  };


  export const updateTargetState = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`,data);
        if (response.status === 200) {
            alert('TargetState actualizado correctamente');
            return response.data;
        }
    } catch (error) {
        console.error("Error al actualizar el TargetState:", error);
        throw error;
    }
};

