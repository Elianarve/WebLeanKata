import axios from "axios";

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};