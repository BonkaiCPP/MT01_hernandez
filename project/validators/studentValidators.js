const { body } = require('express-validator');

exports.createOrUpdate = [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('valid email is required'),
  body('age').isInt({ min: 16 }).withMessage('age must be >= 16'),
  body('course').optional().isString().trim().notEmpty().withMessage('course must be a non-empty string'),
  body('hobby.*').optional().isString().withMessage('each hobby must be a string')
];