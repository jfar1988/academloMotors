const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const AppError = require('../helpers/appError');

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

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  //traemos las dos contraseñas del body
  const { currentPass, newPass } = req.body;
  //comparamos la contraseña actual con la contraseña del usuario
  if (!(await bcrypt.compare(currentPass, user.password))) {
    return next(new AppError('wrong username or password', 401));
  }
  //encriptamos la contraseña los saltos deben ser entre 10-15
  const jumps = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPass, jumps);

  //actualizo la informacion del usuario poniendo la contraseña encriptada
  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });
  //Envio una respuesta
  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfully',
  });
});
