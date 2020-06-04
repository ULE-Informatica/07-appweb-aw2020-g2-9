'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define('Pelicula', {
    calificacion: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    peliculaId:  DataTypes.INTEGER,
    isVista:  DataTypes.INTEGER,
    isPendiente :  DataTypes.INTEGER,
    isFavorita:  DataTypes.INTEGER,


  }, {
    
  });
  Pelicula.associate = function(models) {
    // associations can be defined here
    Pelicula.belongsTo(models.User,{
      foreignKey: 'userId'
    });

    /*
    Pelicula.hasOne(models.etiquetas, {
      foreignKey: 'etiquetaId'
    });
    */
  };
  return Pelicula;
};