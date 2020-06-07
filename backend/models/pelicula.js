'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define('Pelicula', {
    calificacion: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    peliculaId:  DataTypes.INTEGER,
    isVista:  DataTypes.INTEGER,
    isPendiente :  DataTypes.INTEGER,
    isFavorita:  DataTypes.INTEGER,
    peliculaOserie: DataTypes.INTEGER // 0 pelicula, 1 serie
  }, {
    
  });
  Pelicula.associate = function(models) {
    // associations can be defined here
    Pelicula.belongsTo(models.User,{
      foreignKey: 'userId'
    });
  };
  return Pelicula;
};