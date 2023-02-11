const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userForId = await User.findOne({
      //funcion traer un Solo usuario con el parametro que le doy
      where: {
        id,
        status: 'available',
      },
    });

    if (!userForId) {
      //esta condicion es para cuando el usuario está inactivo o no Existe
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'The user was found successful',
      userForId,
    });
  } catch {
    return res.status(500);
  }
};
exports.createUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
      //funcion crear lo usuarios
      name: name.toLowerCase(),
      email,
      password,
      role: role.toLowerCase(),
    });
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Method createUsers was called',
      newUser,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.updateUsers = async (req, res) => {
  try {
    // Obtengo el id de req.params
    const { id } = req.params;
    //obtengo la informacion a actualizar
    const { name, email } = req.body;
    //buscar el usuario ha actualizar
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    //validar si el usuario está activo o existe
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found ',
      });
    }
    const updateUser = await user.update({ name, email });
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Method updateUsers was called',
      updateUser,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    // Obtengo el id del usuario por req.params
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
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    //actualizar el estado
    const deleteUser = await user.update({ status: 'disabled' });
    return res.status(200).json({
      status: 'success',
      message: 'The product has been deleted successful',
      deleteUser,
    });
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
