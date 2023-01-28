const express = require('express');
const cors = require('cors');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const { db } = require('../database/db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
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
  }
  database() {
    db.authenticate()
      .then(() => console.log('DataBase Authenticated'))
      .catch(err => console.log(err));
    db.sync()
      .then(() => console.log('Database Synced'))
      .catch(err => console.log(err));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
