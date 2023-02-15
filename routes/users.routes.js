const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllUsers,
  findOneUser,
  createUsers,
  updateUsers,
  deleteUser,
} = require('../controllers/users.controller');

const {
  checkIfUserExists,
  checkIfEmailExists,
} = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

check;

const router = Router();

router.get('', findAllUsers);

router.get('/:id', checkIfUserExists, findOneUser);

router.post(
  '',
  [
    check('name', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must contain an appropriate format').isEmail(),
    check('password', 'The email must be mandatory').not().isEmpty(),
    validateFields,
    checkIfEmailExists,
  ],
  createUsers
);

router.patch('/:id', checkIfUserExists, updateUsers);

router.delete('/:id', checkIfUserExists, deleteUser);

module.exports = { usersRouter: router };
