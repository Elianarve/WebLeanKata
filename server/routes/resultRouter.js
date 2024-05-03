import express from 'express';
import { getResults, addResult, updateResult, getOneResult, deleteResult } from '../controllers/ResultsController.js';

const router = express.Router();

router.get('/', getResults);

router.post('/', addResult);

router.put('/:id', updateResult);

router.delete('/:id', deleteResult);

router.get('/:id', getOneResult);

export default router;