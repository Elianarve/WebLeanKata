import express from 'express';
import { getLearning, addLearnings, updateLearnings, getOneLearning, deleteLearning } from '../controllers/LearningController.js'; 


const router = express.Router();

router.get('/', getLearning);

router.post('/', addLearnings);

router.put('/:id', updateLearnings);

router.delete('/:id', deleteLearning);

router.get('/:id', getOneLearning);

export default router;