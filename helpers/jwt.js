const jwt = require('jsonwebtoken');

const generateJWT = id => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED, //contraseña creada en smallDev.tools y escrita en env
      {
        expiresIn: process.env.JWT_EXPIRE_IN, //expiracion del token creada en env
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err); //recibe el error de la promesa
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
