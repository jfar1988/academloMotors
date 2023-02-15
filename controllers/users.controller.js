const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    //aí se ponen las condiciones
    where: {
      status: 'available',
    },
  }); //funcion traer los usuarios
  return res.status(200).json({
    status: 'SUCCESS',
    message: 'The users were found successful',
    users,
  });
});
exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'SUCCESS',
    message: 'The user was found successful',
    user,
  });
});
exports.createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    //funcion crear lo usuarios
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role.toLowerCase(),
  });
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Method createUsers was called',
    newUser,
  });
});
exports.updateUsers = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  const updateUser = await user.update({ name, email });

  return res.status(200).json({
    status: 'SUCCESS',
    message: 'Method updateUsers was called',
    updateUser,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  // Obtengo el id del usuario por req.params
  const { user } = req;
  //Obtengo la info del usuario ha eliminar

  //actualizar el estado
  const deleteUser = await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success',
    message: 'The product has been deleted successful',
    deleteUser,
  });
});
