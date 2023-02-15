const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');

exports.checkIfUserExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //Obtengo la info del usuario ha eliminar
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  //valido o lanzó un error sí el usuario esta inactivo o no existe
  if (!user) {
    return next(new AppError('The user was not found', 404));
  }
  req.user = user;
  next();
});

exports.checkIfEmailExists = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user && user.status === 'disabled') {
    //TODO: lo que debe hacer es un update o cambiar el estado de la cuenta a available
    return next(
      new AppError(
        'El usuario tiene una cuenta, pero está desactivada por favor hable con el administrador para activarla',
        400
      )
    );
  }
  if (user) {
    return next(new AppError('The email user already exists', 400));
  }
  next();
});
