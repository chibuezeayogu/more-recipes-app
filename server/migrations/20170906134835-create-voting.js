module.exports = {
  up:(queryInterface, Sequelize) => queryInterface.createTable('Votings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      view: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      voting: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipedata',
          key: 'id',
          as: 'recipeId',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Userdata',
          key: 'id',
          as: 'userId',
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
    }),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Votings'),
};