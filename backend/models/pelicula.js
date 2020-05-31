'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelicula = sequelize.define('Pelicula', {
    idApi: DataTypes.INTEGER,
    calificacion: DataTypes.FLOAT,
    etiquetaId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER


  }, {
    
  });
  Pelicula.associate = function(models) {
    // associations can be defined here
    Pelicula.belongsTo(models.Etiqueta,{
      foreignKey: 'etiquetaId'
    });

    /*
    Pelicula.hasOne(models.etiquetas, {
      foreignKey: 'etiquetaId'
    });
    */
  };
  return Pelicula;
};