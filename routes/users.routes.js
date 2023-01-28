const { Router } = require('express');
const {
  findAllUsers,
  createUsers,
  updateUsers,
  findAllUserForID,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('', findAllUsers);
router.get('/:id', findAllUserForID);
router.post('', createUsers);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };
