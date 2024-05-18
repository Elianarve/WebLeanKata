import express from 'express';
import { getResults, addResult, updateResult, getOneResult, deleteResult } from '../controllers/ResultsController.js';
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getResults);

router.post('/', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  addResult);

router.put('/:id', authToken, authRol(['admin']),  updateResult);

router.delete('/:id', authToken, authRol(['user','admin']),  deleteResult);

router.get('/:id', authToken, authRol(['user','admin']),  getOneResult);

export default router;