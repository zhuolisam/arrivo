const express = require('express');
const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const userValidation = require('../../validations/user.validation');
const roleType = require('../../config/roles');

const router = express.Router();

router.route('/').get(auth([roleType.ADMIN]), userController.getUsers);

router
  .route('/:userId')
  .get(
    auth([roleType.ADMIN]),
    validate(userValidation.getUser),
    userController.getUser
  )
  .delete(
    auth([roleType.ADMIN]),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )
  .patch(
    auth([roleType.ADMIN]),
    validate(userValidation.updateUser),
    userController.updateUser
  );

module.exports = router;
