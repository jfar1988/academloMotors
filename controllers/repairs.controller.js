const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repair.model');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repair = await Repair.findAll({
    //1. creamos las condiciones  para traer las reparaciones
    where: {
      status: 'pending',
    },
  });
  // validar sí la repacion fue completada o cancelada sino enviar error
  // if (repair.status !== 'pending') {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'The repair was completed or cancelled',
  //   });
  // }
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Method findAllRepairs was called',
    repair,
  });
});
exports.findRepairForId = catchAsync(async (req, res, next) => {
  //recibimos el id por parametro /:id
  const { id } = req.params;
  //encontramos la reparacion por id y status
  const repairforID = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });
  if (!repairforID) {
    return res.status(404).json({
      status: 'error',
      message: 'repair not found',
    });
  }
  //enviamos respuesta al usuario
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Method findRepairForId was called',
    repairforID,
  });
});
exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const newRepair = await Repair.create({
    date,
    motorsNumber,
    description,
  });

  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Created Repair was called 😃',
    newRepair,
  });
});
exports.updateRepair = catchAsync(async (req, res, next) => {
  //Obtengo el id por parametro /:id
  const { repair } = req;

  //cambia el status del reparacion seleccionado
  const updateRepair = await repair.update({ status: 'completed' });
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'the repair has been updated successfully',
    updateRepair, //si quisieramos mostrar la reparacion completada
  });
});
exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  // cambia el status del reparacion seleccionado
  const deleteRepair = await repair.update({ status: 'cancelled' });
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Method deleteRepair was called',
    deleteRepair, //si quisieramos mostrar la reparacion completada
  });
});
