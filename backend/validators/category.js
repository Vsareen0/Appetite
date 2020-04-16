const { check } = require('express-validator');

exports.categoryValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Category is required'),
];
