import jwt from 'jsonwebtoken';
import { TK_SECRET } from '../config';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'No authentication token provided.' });
    }

    jwt.verify(token, TK_SECRET, (err) => {
        if (err) {
            return res.status(403).send({ error: 'Invalid Token.' });
        }

        next();
    });
};

export default authenticateToken;
