import express from 'express';
import { getUser, deleteUser, createUser, updateUser, getOneUser } from '../controllers/usersController.js';
import { userValidator, updateUserValidator } from '../validators/usersValidator.js';
import handleValidationResults from '../helpers/validationHelper.js';
import { authRol } from '../middleware/rolMiddleware.js';

const router = express.Router();

router.get('/', authRol(['user']), getUser);

router.delete('/:id', authRol(['user']), deleteUser);

router.post('/', authRol(['user']), userValidator, handleValidationResults, createUser);

router.put('/:id', authRol(['user']), updateUserValidator, handleValidationResults, updateUser);

router.get('/:id', authRol(['user']), getOneUser);

export default router;
