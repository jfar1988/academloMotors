const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllUsers,
  findOneUser,
  updateUsers,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');

const { checkIfUserExists } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

check;

const router = Router();

router.get('', findAllUsers);

router.get('/:id', checkIfUserExists, findOneUser);

router.patch('/:id', checkIfUserExists, updateUsers);

router.patch(
  '/password/:id',
  [
    check('currentPass', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPass', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    checkIfUserExists,
  ],
  updatePassword
);

router.delete('/:id', checkIfUserExists, deleteUser);

module.exports = { usersRouter: router };
