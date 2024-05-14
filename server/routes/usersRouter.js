import express from 'express';
import { getUser, deleteUser, createUser, updateUser, getOneUser } from '../controllers/usersController.js';
import { userValidator, updateUserValidator } from '../validators/usersValidator.js';
import handleValidationResults from '../helpers/validationHelper.js';
import { authRol } from '../middleware/rolMiddleware.js';

const router = express.Router();

router.get('/', authRol(['admin']), getUser);

router.delete('/:id', authRol(['admin']), deleteUser);

router.post('/', authRol(['admin']), userValidator, handleValidationResults, createUser);

router.put('/:id', authRol(['admin']), updateUserValidator, handleValidationResults, updateUser);

router.get('/:id', authRol(['admin']), getOneUser);

export default router;
