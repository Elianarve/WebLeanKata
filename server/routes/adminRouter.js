import express from 'express';
import { getUser, deleteUser, createUser, updateUser, getOneUser } from '../controllers/usersController.js';
import { userValidator, updateUserValidator } from '../validators/usersValidator.js';
import handleValidationResults from '../helpers/validationHelper.js';
import { authRol } from '../middleware/rolMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/', authRol(['admin']), getUser);
adminRouter.delete('/:id', authRol(['admin']), deleteUser);
adminRouter.post('/', authRol(['admin']), userValidator, handleValidationResults, createUser);
adminRouter.put('/:id', authRol(['admin']), updateUserValidator, handleValidationResults, updateUser);
adminRouter.get('/:id', authRol(['admin']), getOneUser);

export default adminRouter;
