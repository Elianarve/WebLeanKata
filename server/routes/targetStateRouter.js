import express from 'express';
import { getTargetState, addTargetState, updateTargetState, getOneTargetState, deleteTargetState } from '../controllers/TargetStateController.js'; 
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getTargetState);

router.post('/', authToken, authRol(['user','admin']),  addTargetState);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateTargetState);

router.delete('/:id', authToken, authRol(['admin']),  deleteTargetState);

router.get('/:id', authToken, authRol(['user','admin']),  getOneTargetState);

export default router;