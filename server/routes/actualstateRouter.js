import express from 'express';
import { getAllActualState, addActualState } from '../controllers/ActualStateController.js';

const router = express.Router();

router.get('/', getAllActualState);

router.post('/', addActualState);

export default router;