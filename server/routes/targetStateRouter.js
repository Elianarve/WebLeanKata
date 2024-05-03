import express from 'express';
import { getTargetState, addTargetState, updateTargetState, getOneTargetState, deleteTargetState } from '../controllers/TargetStateController.js'; 

const router = express.Router();

router.get('/', getTargetState);

router.post('/', addTargetState);

router.put('/:id', updateTargetState);

router.delete('/:id', deleteTargetState);

router.get('/:id', getOneTargetState);

export default router;