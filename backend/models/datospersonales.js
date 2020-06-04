'use strict';
module.exports = (sequelize, DataTypes) => {
  const Datospersonales = sequelize.define('Datospersonales', {
    Nombre: DataTypes.STRING,
    Apellido: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    indexes: [
      // Create a unique index
      {
        unique: true,
        fields: ['userId']
      }
    ]
  });
  Datospersonales.associate = function(models) {
    Datospersonales.belongsTo(models.User);
  };
  return Datospersonales;
};