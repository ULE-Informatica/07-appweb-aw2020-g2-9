'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Peliculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idApi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      calificacion: {
        type: Sequelize.FLOAT
      },
      
      etiquetaId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Etiqueta'
          },
          key:'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users'
          },
          key:'id'
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Peliculas');
  }
};