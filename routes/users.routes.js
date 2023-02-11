const { Router } = require('express');

const {
  findAllUsers,
  findOneUser,
  createUsers,
  updateUsers,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', findOneUser);

router.post('', createUsers);

router.patch('/:id', updateUsers);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
