
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reviews', [{
      view: false,
      comment: 'Nice recipe',
      recipeId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  },{
    view: false,
    comment: 'good recipe',
    recipeId: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    }]),
  down:(queryInterface/*, Sequelize*/) => queryInterface.dropTable('Reviews'),
};
