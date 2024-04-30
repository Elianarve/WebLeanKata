import express from 'express';
import { getObstacle, addObstacle, updateObstacle, getOneObstacle, deleteObstacle } from '../controllers/ObstacleController.js'; 

const router = express.Router();

router.get('/', getObstacle);

router.post('/', addObstacle);

router.put('/:id', updateObstacle);

router.delete('/:id', deleteObstacle);

router.get('/:id', getOneObstacle);

export default router;