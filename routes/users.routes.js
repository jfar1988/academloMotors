const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllUsers,
  findOneUser,
  updateUsers,
  deleteUser,
  updatePassword,
} = require('../controllers/users.controller');

const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');

const { checkIfUserExists } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

check;

const router = Router();

router.get('', findAllUsers);

//proteger las rutas(loguearse antes de hacer cualquier petición)
router.use(protect);

router.get('/:id', checkIfUserExists, findOneUser);

router.patch('/:id', checkIfUserExists, protectAccountOwner, updateUsers);

router.patch(
  '/password/:id',
  [
    check('currentPass', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPass', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    checkIfUserExists,
    protectAccountOwner,
  ],
  updatePassword
);

router.delete('/:id', checkIfUserExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
