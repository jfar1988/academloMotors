const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repair.model');

exports.validRepairById = catchAsync(async (req, res, next) => {
  //Obtengo el id por parametro /:id
  const { id } = req.params;
  //Busco la reparacion que se va ha actualizar
  const repair = await Repair.findOne({
    where: {
      id,
      // status: 'pending', si pongo esto ya no me valida las condiciones de los if
    },
  });
  //validar sí la repacion fue completada sino enviar error
  if (repair.status === 'completed') {
    return next(new AppError('The repair was completed', 404));
  }
  if (repair.status === 'cancelled') {
    return next(new AppError('The repair was cancelled', 404));
  }
  // if (repair.status !== 'pending') {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'The repair not found',
  //   });
  // }
  req.repair = repair;
  next();
});
