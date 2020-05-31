
const Sequelize = require('sequelize');
const {database} =require ('./datoBD');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(database.database, database.user, database.password, {
  host: database.host,
  dialect: database.dialect
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  module.exports=sequelize;
  //app.use(require('./modelos/usuario.js'))