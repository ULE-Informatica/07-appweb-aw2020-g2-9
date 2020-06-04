'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    indexes: [
      // Create a unique index
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  User.associate = function(models) {
    User.hasOne(models.Datospersonales); 
    User.hasMany(models.Lista); 
    User.hasMany(models.Pelicula); 
  };
  return User;
};