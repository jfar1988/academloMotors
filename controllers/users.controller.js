const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  const users = await User.findAll({
    //aí se ponen las condiciones
    where: {
      status: true,
    },
  }); //funcion traer los usuarios
  res.status(200).json({
    status: 'SUCCESS',
    message: 'The users were found successful',
    users,
  });
};
exports.findAllUserForID = async (req, res) => {
  const { id } = req.params;
  const userForId = await User.findOne({
    //funcion traer un Solo usuario con el parametro que le doy
    where: {
      id,
      status: true,
    },
  });

  if (!userForId) {
    //esta condicion es para cuando el usuario está inactivo o no Existe
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }
  return res.json({
    status: 'SUCCESS',
    message: 'The user was found successful',
    userForId,
  });
};
exports.createUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    //funcion crear lo usuarios
    name: name.toLowerCase(),
    email,
    password,
    role: role.toLowerCase(),
  });
  res.status(201).json({
    status: 'SUCCESS',
    message: 'Method createUsers was called cargando',
    newUser,
  });
};
exports.updateUsers = async (req, res) => {
  // Obtengo el id de req.params
  const { id } = req.params;
  //obtengo la informacion a actualizar
  const { name, email } = req.body;
  //buscar el usuario ha actualizar
  const user = await User.findOne({
    where: {
      id,
      status: true,
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
  res.status(201).json({
    status: 'SUCCESS',
    message: 'Method updateUsers was called',
    updateUser,
  });
};
exports.deleteUser = async (req, res) => {
  // Obtengo el id del usuario por req.params
  const { id } = req.params;
  //Obtengo la info del usuario ha eliminar
  const user = await User.findOne({
    where: {
      id,
      status: true,
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
  const deleteUser = await user.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The product has been deleted successful',
    deleteUser,
  });
};
