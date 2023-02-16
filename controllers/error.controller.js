const AppError = require('../helpers/appError');

const handleCastError22P02 = err =>
  new AppError('Some type of data send does not match was expected', 400);

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

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
