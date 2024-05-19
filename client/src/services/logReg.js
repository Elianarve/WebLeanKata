import axios from 'axios'; 


export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/auth/register', {
      name,
      email,
      password,
    });

    if (!response.data.token) { 
      throw new Error('Token no proporcionado en la respuesta'); 
    }

    return response.data;
  } catch (error) {
    throw new Error('Error en la solicitud de inicio de sesión: ' + error.message); 
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000//auth/login', { 
      email,
      password,
    });

    if (!response.data.token) { 
      throw new Error('Token no proporcionado en la respuesta'); 
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) { 
      throw new Error('Usuario no registrado.'); 
    } else if (error.response && error.response.status === 401) { 
      throw new Error('Contraseña incorrecta.'); 
    } else {
      throw new Error('Error en la solicitud de inicio de sesión: ' + error.message); 
    }
  }
};