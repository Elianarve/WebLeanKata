import express from 'express';
import { getTask, addTask, updateTask, getOneTask, deleteTask } from '../controllers/TaskController.js'; 
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getTask);

router.post('/', authToken, authRol(['user','admin']),  addTask);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateTask);

router.delete('/:id', authToken, authRol(['user','admin']),  deleteTask);

router.get('/:id', authToken, authRol(['user','admin']),  getOneTask);

export default router;