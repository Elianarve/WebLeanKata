import express from 'express';
import { getMentalContrast, addMentalContrast, updateMentalContrast, getOneMentalContrast, deleteMentalContrast } from '../controllers/MentalContrastController.js'; 
import authToken from '../middleware/autMiddleware.js';
import { authRol } from '../middleware/rolMiddleware.js';
import handleValidationResults from '../helpers/validationHelper.js';
import processValidator from '../validators/processValidator.js';


const router = express.Router();

router.get('/', authToken, authRol(['user','admin']),  getMentalContrast);

router.post('/', authToken, authRol(['user','admin']),  addMentalContrast);

router.put('/:id', authToken, authRol(['user','admin']), processValidator, handleValidationResults,  updateMentalContrast);

router.delete('/:id', authToken, authRol(['user','admin']),  deleteMentalContrast);

router.get('/:id', authToken, authRol(['user','admin']),  getOneMentalContrast);

export default router;