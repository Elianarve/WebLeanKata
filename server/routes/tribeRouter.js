import express from 'express';
import { getTribe, addTribe, updateTribe, getOneTribe, deleteTribe } from '../controllers/TribeController.js';

const router = express.Router();

router.get('/', getTribe);

router.post('/', addTribe);

router.put('/:id', updateTribe);

router.delete('/:id', deleteTribe);

router.get('/:id', getOneTribe);

export default router;