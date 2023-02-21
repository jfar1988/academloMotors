const { Op } = require('sequelize');
const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repair.model');
const User = require('../models/user.model');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repair = await Repair.findAll({
    //1. creamos las condiciones  para traer las reparaciones
    where: {
      status: {
        [Op.in]: ['pending', 'completed'],
      },
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
    ],
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
    message: 'Completed and pending repairs were uploaded successfully',
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
    message: `Repair ${repairforID.id} was successfully brought`,
    repairforID,
  });
});
exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description, userId } = req.body;
  const newRepair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });

  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Repair was created successfully 😃',
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
    message: `the repair ${repair.id} has been updated successfully`,
    updateRepair, //si quisieramos mostrar la reparacion completada
  });
});
exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  // cambia el status del reparacion seleccionado
  const deleteRepair = await repair.update({ status: 'cancelled' });
  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Repair removed successfully',
    deleteRepair, //si quisieramos mostrar la reparacion completada
  });
});
