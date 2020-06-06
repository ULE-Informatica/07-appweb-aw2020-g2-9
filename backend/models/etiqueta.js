'use strict';
module.exports = (sequelize, DataTypes) => {
  const Etiqueta = sequelize.define('Etiqueta', {
    etiqueta: DataTypes.STRING
  }, {
    
  });
  Etiqueta.associate = function(models) {
    // associations can be defined here
    
  };
  return Etiqueta;
};