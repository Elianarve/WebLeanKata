import express from 'express';
import { getHypothesis, addHypothesis, updateHypothesis, getOneHypothesis, deleteHypothesis } from '../controllers/HypothesisController.js'; 
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';



const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getHypothesis);

router.post('/', authToken, authRol(['user','admin']),  addHypothesis);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults, updateHypothesis);

router.delete('/:id', authToken, authRol(['admin']),  deleteHypothesis);

router.get('/:id', authToken, authRol(['user','admin']),  getOneHypothesis);

export default router;