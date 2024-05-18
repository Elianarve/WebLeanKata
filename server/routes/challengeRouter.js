import express from 'express';
import { getChallenge, addChallenge, updateChallenge, getOneChallenge, deleteChallenge, searchChallenge } from '../controllers/ChallengeController.js';
import authToken from '../middleware/autmiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getChallenge);

router.post('/', authToken, authRol(['user','admin']),  addChallenge);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateChallenge);

router.delete('/:id', authToken, authRol(['admin']),  deleteChallenge);

router.get('/:id', authToken, authRol(['user','admin']),  getOneChallenge);

router.get('/search', authToken, authRol(['user','admin']),  searchChallenge);

export default router;