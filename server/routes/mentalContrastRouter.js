import express from 'express';
import { getMentalContrast, addMentalContrast, updateMentalContrast, getOneMentalContrast, deleteMentalContrast } from '../controllers/MentalContrastController.js'; 

const router = express.Router();

router.get('/', getMentalContrast);

router.post('/', addMentalContrast);

router.put('/:id', updateMentalContrast);

router.delete('/:id', deleteMentalContrast);

router.get('/:id', getOneMentalContrast);

export default router;