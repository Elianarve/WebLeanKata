import axios from "axios";

const API_URL_CHALLENGE = 'http://localhost:5000/challenge';

export const getChallenge = async () => {
    try {
        const response = await axios.get(`${API_URL_CHALLENGE}`);
        const data = await response.data
        return data;
    } catch (error) {
        console.error("Error al obtener los retos:", error);
        throw error;
    }
};
export const getOneChallenge = async (id) => {
    try {
        const response = await axios.get(`${API_URL_CHALLENGE}/${id}`);
        return response.data; // Devolver solo los datos del reto, no todo el objeto de respuesta
    } catch (error) {
        console.error("Error al obtener el reto por ID", error);
        throw error;
    }
};

export const deleteChallenge = async (id) => {
        try {
            const response = await axios.delete(`${API_URL_CHALLENGE}/${id}`);
            if (response.status === 200) {
                alert('Eliminado correctamente');
            }
        } catch (error) {
            console.error("Error al eliminar el reto ", error);
            throw error;
        }
};


export const postChallenge = async (data) => {
    const response = await axios.post(API_URL_CHALLENGE, data);
    console.log(response);
    alert("Reto creado exitosamente");
    return response;
  };

  export const updateChallenge = async (id, newData) => { 
    try {
      const response = await fetch(`http://localhost:3000/bicycles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
  
      if (!response.ok) { 
        throw new Error('Error updatingItem'); 
      }
  
      return response.json(); 
    } catch (error) {
      console.error('Error updatingItem:', error);
      throw error;
    }
  };

