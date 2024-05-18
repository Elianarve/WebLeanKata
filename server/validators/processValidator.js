import { check } from 'express-validator';

const processValidator = [
    check('id')
        .notEmpty().withMessage('The id field must not be empty.')
        .isString().withMessage('The id field must be a string')
        .isLength({ min: 3 }).withMessage('The id field must be at least 3 characters long.'),

    check('description')
        .notEmpty().withMessage('The description field must not be empty.')
        .isString().withMessage('The description field must be a string')
        .isLength({ min: 3 }).withMessage('The description field must be at least 3 characters long.'),
];

export default processValidator;
