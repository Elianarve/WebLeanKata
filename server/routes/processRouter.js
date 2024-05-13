import express from 'express';
import { getProcess, addProcess, updateProcess, getOneProcess, deleteProcess } from '../controllers/ProcessController.js';

const router = express.Router();

router.get('/', getProcess);

router.post('/', addProcess);

router.put('/:id', updateProcess);

router.delete('/:id', deleteProcess);

router.get('/:id', getOneProcess);

export default router;