const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const { db } = require('../database/db');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../helpers/appError');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //Path Router
    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
    };

    //Metodo de conexion a DB
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);
    // this.app.all('*', (req, res, next) => {
    //   res.status(404).json({
    //     status: 'error',
    //     message: `Can't find ${req.originalUrl} on this server!`,
    //   });
    // });
    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('DataBase Authenticated 😁'))
      .catch(err => console.log(err));
    db.sync()
      .then(() => console.log('Database Synced 😁'))
      .catch(err => console.log(err));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port 😁 ${this.port}`);
    });
  }
}

module.exports = Server;
