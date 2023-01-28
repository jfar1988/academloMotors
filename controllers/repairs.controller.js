const Repair = require('../models/repair.model');

exports.findAllRepairs = async (req, res) => {
  const repair = await Repair.findAll({
    //1. creamos las condiciones  para traer las reparaciones
    where: {
      status: 'pending',
    },
  });
  res.json({
    status: 'SUCCESS',
    message: 'Method findAllRepairs was called',
    repair,
  });
};
exports.findRepairForId = async (req, res) => {
  //recibimos el id por parametro /:id
  const { id } = req.params;
  //encontramos la reparacion por id y status
  const repairforID = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  //enviamos respuesta al usuario
  res.json({
    status: 'SUCCESS',
    message: 'Method findRepairForId was called',
    repairforID,
  });
};
exports.createRepair = async (req, res) => {
  const { date, userId } = req.body;
  const newRepair = await Repair.create({
    date,
    userId,
  });
  res.json({
    status: 'SUCCESS',
    message: 'Method createRepair was called',
    newRepair,
  });
};
exports.updateRepair = async (req, res) => {
  //Obtengo el id por parametro /:id
  const { id } = req.params;
  //Obtengo la info ha actualizar
  const { status } = req.body;
  //Busco la reparacion que se va ha actualizar
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });
  // validar sí la repacion fue completada sino enviar error
  if (repair.status === 'completed') {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was completed',
    });
  }
  //cambia el status del reparacion seleccionado
  const updateRepair = await repair.update({ status: status.toLowerCase() });
  res.status(201).json({
    status: 'SUCCESS',
    message: 'Method updateRepair was called',
    updateRepair, //si quisieramos mostrar la reparacion completada
  });
};
// Me falta el delete
exports.deleteRepair = async (req, res) => {
  //Obtengo el id por parametro /:id
  const { id } = req.params;
  //Obtengo la info ha actualizar
  const { status } = req.body;
  //Busco la reparacion que se va ha actualizar
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });
  //validar sí la repacion fue completada sino enviar error
  if (repair.status === 'completed') {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was completed',
    });
  }
  //cambia el status del reparacion seleccionado
  const deleteRepair = await repair.update({ status: status.toLowerCase() });
  res.status(201).json({
    status: 'SUCCESS',
    message: 'Method deleteRepair was called',
    deleteRepair, //si quisieramos mostrar la reparacion completada
  });
};
