'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lista = sequelize.define('Lista', {
    nombre: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    tableName: 'Listas',
  });
  Lista.associate = function(models) {
    // associations can be defined here
    Lista.belongsTo(models.User);
    //Lista.belongsToMany(models.Pelicula,{through: 'listapelicula'});
  };
  return Lista;
};