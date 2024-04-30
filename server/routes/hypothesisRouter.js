import express from 'express';
import { getHypothesis, addHypothesis, updateHypothesis, getOneHypothesis, deleteHypothesis } from '../controllers/HypothesisController.js'; 


const router = express.Router();

router.get('/', getHypothesis);

router.post('/', addHypothesis);

router.put('/:id', updateHypothesis);

router.delete('/:id', deleteHypothesis);

router.get('/:id', getOneHypothesis);

export default router;