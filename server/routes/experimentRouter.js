import express from 'express';
import { getExperiment, addExperiment, updateExperiment, getOneExperiment, deleteExperiment } from '../controllers/ExperimentController.js';
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getExperiment);

router.post('/', authToken, authRol(['user','admin']),  addExperiment);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults, updateExperiment);

router.delete('/:id', authToken, authRol(['admin']),  deleteExperiment);

router.get('/:id', authToken, authRol(['user','admin']),  getOneExperiment);

export default router;