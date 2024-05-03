import express from 'express';
import { getExperiment, addExperiment, updateExperiment, getOneExperiment, deleteExperiment } from '../controllers/ExperimentController.js';

const router = express.Router();

router.get('/', getExperiment);

router.post('/', addExperiment);

router.put('/:id', updateExperiment);

router.delete('/:id', deleteExperiment);

router.get('/:id', getOneExperiment);

export default router;