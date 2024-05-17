import { verifyToken } from '../utils/tokens.js';

export const authRol = (reqRol) => (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ error: 'No se proporcionó token de autenticación' });
    }

    const authToken = req.headers.authorization.split(' ')[1];
    try {
        const dataToken = verifyToken(authToken);
        const rolUser = dataToken.rol;
        const rolesByUser = rolUser;
        const checkValueRol = reqRol.some((rolSingle) => rolesByUser.includes(rolSingle));
        if (!checkValueRol) {
            return res.status(401).send({ error: 'No tienes permisos para esta acción' });
        }
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Error en el middleware' });
    }
};




