module.exports = {
  up:(queryInterface, Sequelize) => queryInterface.bulkInsert('Votings', [{
    view: false,
    voting: 1,
    recipeId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
},{
  view: false,
  recipeId: 1,
  voting: 1,
  userId: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  }]),
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Votings'),
};
