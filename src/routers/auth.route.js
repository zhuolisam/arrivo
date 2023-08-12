const express = require('express');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');
const validate = require('../middlewares/validate');

const router = express.Router();

router
  .post('/register', validate(authValidation.register), authController.register)
  .post('/login', validate(authValidation.login), authController.login);

module.exports = router;
