module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipedata', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      procedures: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      upvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      downvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Userdata',
          key: 'id',
          as: 'userId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /*, Sequelize*/) => queryInterface.dropTable('Recipedata'),
};