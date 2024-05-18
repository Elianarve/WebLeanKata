import express from 'express';
import { getActualState, addActualState, updateActualState, getOneActualState, deleteActualState, searchActualState  } from '../controllers/ActualStateController.js';
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getActualState);

router.post('/', authToken, authRol(['user','admin']),  addActualState);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateActualState);

router.delete('/:id', authToken, authRol(['admin']),  deleteActualState);

router.get('/:id', authToken, authRol(['user','admin']),  getOneActualState);

router.get('/search', authToken, authRol(['user','admin']),  searchActualState);

export default router;