import express from 'express';
import { getUser, createUser, updateUser, getOneUser } from '../controllers/usersController.js';
import { userValidator, updateUserValidator } from '../validators/usersValidator.js';
import handleValidationResults from '../helpers/validationHelper.js';
import { authRol } from '../middleware/rolMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', authRol(['user']), getUser);
userRouter.post('/', authRol(['user']), userValidator, handleValidationResults, createUser);
userRouter.put('/:id', authRol(['user']), updateUserValidator, handleValidationResults, updateUser);
userRouter.get('/:id', authRol(['user']), getOneUser);

export default userRouter;

