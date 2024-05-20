import { verifyToken } from '../utils/tokens.js';

const authToken = (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];
        const dataToken = verifyToken(authToken);
        const userId = dataToken.userId;
        req.body.userId = userId;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'invalid authentication' });
    }
};

export default authToken;