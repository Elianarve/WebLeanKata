import express from 'express';
import { getTask, addTask, updateTask, getOneTask, deleteTask } from '../controllers/TaskController.js'; 

const router = express.Router();

router.get('/', getTask);

router.post('/', addTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

router.get('/:id', getOneTask);

export default router;