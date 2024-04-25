import express from 'express';
import { getActualState, addActualState } from '../controllers/ActualStateController.js';

const router = express.Router();

router.get('/', getActualState);

router.post('/', addActualState);

export default router;