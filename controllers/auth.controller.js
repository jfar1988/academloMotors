const User = require('../models/user.model');
const catchAsync = require('../helpers/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/jwt');
const AppError = require('../helpers/appError');

exports.createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //1. crear una instancia de la clase User
  const newUser = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role.toLowerCase(),
  });

  //2. encriptat la contraseña
  const jumps = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, jumps);

  // 3. guardar en la base de datos con las contraseñas encriptadas
  await newUser.save();

  //4. generar el jwt
  const token = await generateJWT(newUser.id);

  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Method createUsers was called',
    token,
    newUser: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. verificar sí existe el usuario y sí el password es correcto
  const user = await User.findOne({
    where: {
      email,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  //comparar contraseñas
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('wrong username or password', 401));
  }
  //2. sí todo esta bien, enviamos un token al cliente
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
