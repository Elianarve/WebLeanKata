import express from 'express';
import { getActualState, addActualState, updateActualState, getOneActualState, deleteActualState, searchActualState  } from '../controllers/ActualStateController.js'; // Se corrigieron los nombres de las funciones de los controladores.

const router = express.Router();

router.get('/', getActualState);

router.post('/', addActualState);

router.put('/:id', updateActualState);

router.delete('/:id', deleteActualState);

router.get('/:id', getOneActualState);

router.get('/search', searchActualState);

export default router;