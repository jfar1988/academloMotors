const AppError = require('../helpers/appError');

const handleCastError22P02 = err =>
  new AppError('the data type does not match what is expected🤔', 400);

const handleJWTError = err =>
  new AppError('Invalid Token. Please login again! 🤔', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired!. Please loggin again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // es un error operacional
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //error de programacion(500) no tengo que informarle al usuario o al frontend
    console.log('Error 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!!🧨🧨',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (!error.parent?.code) {
      error = err;
    }

    if (error.parent?.code === '22P02') error = handleCastError22P02(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name == 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
