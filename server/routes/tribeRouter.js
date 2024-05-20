import express from 'express';
import { getTribe, addTribe, updateTribe, getOneTribe, deleteTribe } from '../controllers/TribeController.js';
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getTribe);

router.post('/', authToken, authRol(['user','admin']),  addTribe);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateTribe);

router.delete('/:id', authToken, authRol(['user','admin']),  deleteTribe);

router.get('/:id', authToken, authRol(['user','admin']),  getOneTribe);

export default router;