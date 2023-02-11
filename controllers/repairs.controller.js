const Repair = require('../models/repair.model');

exports.findAllRepairs = async (req, res) => {
  try {
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
  } catch {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.findRepairForId = async (req, res) => {
  try {
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
        message: 'The repair not found',
      });
    }
    //enviamos respuesta al usuario
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Method findRepairForId was called',
      repairforID,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const newRepair = await Repair.create({
      date,
      userId,
    });
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Created Repair was called 😃',
      newRepair,
    });
  } catch {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.updateRepair = async (req, res) => {
  try {
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
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was completed',
      });
    }
    //cambia el status del reparacion seleccionado
    const updateRepair = await repair.update({ status: status.toLowerCase() });
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Method updateRepair was called',
      updateRepair, //si quisieramos mostrar la reparacion completada
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
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
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was completed',
      });
    }
    //cambia el status del reparacion seleccionado
    const deleteRepair = await repair.update({ status: 'cancelled' });
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Method deleteRepair was called',
      deleteRepair, //si quisieramos mostrar la reparacion completada
    });
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong 🧨',
    });
  }
};
