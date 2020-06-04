'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListaPelicula', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      listaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Listas', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE'
      },
      peliculaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE'
        
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
    return queryInterface.dropTable('ListaPelicula');
  }
};