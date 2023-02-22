const { Router } = require('express');
const { check } = require('express-validator');

const {
  createUsers,
  login,
  renewToken,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const { checkIfEmailExists } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must contain an appropriate format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
  ],
  checkIfEmailExists,
  validateFields,
  createUsers
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must contain an appropriate format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

router.use(protect);

router.get('/renew', renewToken);

module.exports = {
  authRouter: router,
};
