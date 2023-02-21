const Repair = require('./repair.model');
const User = require('./user.model');

const initModel = () => {
  //Relaciones 1 a muchos
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
