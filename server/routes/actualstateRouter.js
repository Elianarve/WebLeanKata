import express from 'express';
import { getActualState, addActualState, updateActualState, getOneActualState, deleteActualState, searchActualState  } from '../controllers/ActualStateController.js';

const router = express.Router();

router.get('/', getActualState);

router.post('/', addActualState);

router.put('/:id', updateActualState);

router.delete('/:id', deleteActualState);

router.get('/:id', getOneActualState);

router.get('/search', searchActualState);

export default router;