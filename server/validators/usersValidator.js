import { check } from "express-validator";
import UsersModel from "../models/userModel.js";

const userValidator = [
    check('name')
        .notEmpty().withMessage('Name field must not be empty.')
        .isString().withMessage('Name field must be a string.')
        .isLength({min:2}),

    check('email')
        .notEmpty().withMessage('Email field must not be empty.')
        .isEmail().withMessage('Email field must be a valid email.')
        .custom(async (value) => {
            const existingUser = await UsersModel.findOne({where: {email: value}})
            if(existingUser) {
                throw new Error('A user already exists with this e-mail address') 
            }
        }),

    check('password')
        .notEmpty().withMessage('Password field must not be empty.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one digit.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'),

    check('rol')
        .optional()
        .isIn(['user', 'admin']).withMessage('Rol field must be either "user" or "admin".')
        .default('user')
];

const updateUserValidator = [
    check('name')
        .notEmpty().withMessage('Name field must not be empty.')
        .isString().withMessage('Name field must be a string.')
        .isLength({min:2}),

    check('email')
        .notEmpty().withMessage('Email field must not be empty.')
        .isEmail().withMessage('Email field must be a valid email.'),

    check('password')
        .notEmpty().withMessage('Password field must not be empty.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[0-9]/).withMessage('Password must contain at least one digit.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).'),

    check('rol')
        .optional()
        .isIn(['user', 'admin']).withMessage('Rol field must be either "user" or "admin".')
        .default('user')
];

export { userValidator, updateUserValidator };
