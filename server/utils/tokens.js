import jwt from 'jsonwebtoken';
import { TK_SECRET } from '../config.js';

export const tokenSign = (user) => {
    const data = {
        userId: user.id,
        rol: user.rol
    };
    const token = jwt.sign(data, TK_SECRET, { expiresIn: '2h' });
    return token;
};

export const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, TK_SECRET);
    } catch (error) {
        return null;
    }
};

