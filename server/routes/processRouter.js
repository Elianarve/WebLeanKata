import express from 'express';
import { getProcess, addProcess, updateProcess, getOneProcess, deleteProcess } from '../controllers/ProcessController.js';
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']), getProcess);

router.post('/', authToken, authRol(['user','admin']), addProcess);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults, updateProcess);

router.delete('/:id',  authToken, authRol(['admin']), deleteProcess);

router.get('/:id', authToken, authRol(['user','admin']), getOneProcess);

export default router;