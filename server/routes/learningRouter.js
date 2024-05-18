import express from 'express';
import { getLearning, addLearnings, updateLearnings, getOneLearning, deleteLearning } from '../controllers/LearningController.js'; 
import authToken from '../middleware/autmiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';



const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getLearning);

router.post('/', authToken, authRol(['user','admin']),  addLearnings);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateLearnings);

router.delete('/:id', authToken, authRol(['admin']),  deleteLearning);

router.get('/:id', authToken, authRol(['user','admin']),  getOneLearning);

export default router;