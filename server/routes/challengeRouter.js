import express from 'express';
import { getChallenge, addChallenge } from '../controllers/ChallengeController.js';

const router = express.Router();

router.get('/', getChallenge);

router.post('/', addChallenge);

export default router;