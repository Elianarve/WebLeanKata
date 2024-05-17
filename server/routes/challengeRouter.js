import express from 'express';
import { getChallenge, addChallenge, updateChallenge, getOneChallenge, deleteChallenge, searchChallenge } from '../controllers/ChallengeController.js'; // Se corrigieron los nombres de las funciones de los controladores.

const router = express.Router();

router.get('/', getChallenge);

router.post('/', addChallenge);

router.put('/:id', updateChallenge);

router.delete('/:id', deleteChallenge);

router.get('/:id', getOneChallenge);

router.get('/search', searchChallenge);

export default router;