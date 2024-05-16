import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

// Función para registrar un nuevo usuario
export const registerUser = async (name, email, password) => {
  try {
        
    const response = await axios.post('http://localhost:8000/auth/register', { // Realiza una solicitud POST al endpoint de registro
      name,
      email,
      password,
    });

    if (!response.data.token) { // Verifica si el token está presente en la respuesta
      throw new Error('Token no proporcionado en la respuesta'); // Lanza un error si el token no está presente
    }

    return response.data; // Retorna los datos de respuesta si todo está bien
  } catch (error) {
    throw new Error('Error en la solicitud de inicio de sesión: ' + error.message); // Lanza un error si ocurre algún problema durante la solicitud
  }
};

// Función para iniciar sesión de un usuario existente
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', { // Realiza una solicitud POST al endpoint de inicio de sesión
      email,
      password,
    });

    if (!response.data.token) { // Verifica si el token está presente en la respuesta
      throw new Error('Token no proporcionado en la respuesta'); // Lanza un error si el token no está presente
    }

    return response.data; // Retorna los datos de respuesta si todo está bien
  } catch (error) {
    if (error.response && error.response.status === 404) { // Verifica si el error es una respuesta 404 (Usuario no encontrado)
      throw new Error('Usuario no registrado.'); // Lanza un error indicando que el usuario no está registrado
    } else if (error.response && error.response.status === 401) { // Verifica si el error es una respuesta 401 (Contraseña incorrecta)
      throw new Error('Contraseña incorrecta.'); // Lanza un error indicando que la contraseña es incorrecta
    } else {
      throw new Error('Error en la solicitud de inicio de sesión: ' + error.message); // Lanza un error si ocurre algún otro problema durante la solicitud
    }
  }
};
