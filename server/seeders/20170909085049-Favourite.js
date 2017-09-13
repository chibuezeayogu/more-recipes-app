module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Favourites', [{
    recipeId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
},{
  recipeId: 2,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  }]),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Favourites'),
};
