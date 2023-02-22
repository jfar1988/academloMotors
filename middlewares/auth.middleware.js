const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  // 1. obtener el token y chequiarlo
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  // 2. verificar el token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  // 3. verificar que el usuario exista
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }

  // 4. verificar sí el usuario ha cambiado la contraseña despues de expirar el token
  //verificar sí el usuario cambio la contraseña a la hora de generar una nueva solicitud
  // const changedTimeStamp = parseInt(
  //   user.passwordChangedAt.getTime() / 1000,
  //   10
  // );
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User recently changed password!, please login again', 401)
      );
    }
  }

  //cual usuario está logueado
  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  //sí el usuario autenticado desea hacer la petición a un usuario diferente a él, salta el error
  if (user.id !== sessionUser.id && sessionUser.role !== 'employee') {
    return next(new AppError('You do not own this account', 401));
  }
  //continua
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }
    next();
  };
};
