import { verifyToken } from '../utils/tokens.js';

export const authRol = (reqRol) => (req, res, next) => {
    const authToken = req.headers.authorization?.split(' ')[1];
    try {
        const dataToken = verifyToken(authToken);
        const rolUser = dataToken.rol;
        const rolesByUser = rolUser;
        const checkValueRol = reqRol.some((rolSingle) => rolesByUser.includes(rolSingle));
        if (!checkValueRol) {
            return res.status(401).send({ error: 'No tienes permisos para esta acción' });
        }
    } catch (error) {
        return res.status(401).send({ error: 'Error en el middleware' });
    }
    next();
};


