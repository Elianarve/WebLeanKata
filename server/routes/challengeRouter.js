import express from 'express';
import { getChallenge, addChallenge, updateChallenge, getOneChallenge, deleteChallenge } from '../controllers/ChallengeController.js';

const router = express.Router();

router.get('/', getChallenge);

router.post('/', addChallenge);

router.put('/:id', updateChallenge);

router.delete('/:id', deleteChallenge);

router.get('/:id', getOneChallenge);

export default router;