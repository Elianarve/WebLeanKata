import axios from "axios";

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const register = async (email, password, confirmPassword) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/register', { email, password, confirmPassword });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error al intentar registrarse:', error);
        throw error;
    }
};
