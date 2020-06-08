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
      peliculaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      isVista: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
        
      },
      isPendiente: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
        
      },
      isFavorita: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
        
      },
      calificacion: {
        type: Sequelize.FLOAT
      },

      peliculaOserie: {
        type: Sequelize.INTEGER,
        allowNull: true        
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
