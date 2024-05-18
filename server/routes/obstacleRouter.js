import express from 'express';
import { getObstacle, addObstacle, updateObstacle, getOneObstacle, deleteObstacle } from '../controllers/ObstacleController.js'; 
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getObstacle);

router.post('/', authToken, authRol(['user','admin']),  addObstacle);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateObstacle);

router.delete('/:id', authToken, authRol(['admin']),  deleteObstacle);

router.get('/:id', authToken, authRol(['user','admin']),  getOneObstacle);

export default router;