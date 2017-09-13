module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Recipedata', [{
      
      title: 'orange recipe',
      description: 'Nice recipe',
      ingredients:'orenage lemon',
      procedures: 'wash',
      upvotes: 0,
      downvotes: 0,
      addedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
  },{
    title: 'Apple recipe',
    description: 'Nice recipe',
    ingredients:'Apple flavour',
    procedures: 'wash',
    upvotes: 0,
    downvotes: 0,
    addedBy: 2,
    createdAt: new Date(),
    updatedAt: new Date(),

    }]),
  down: (queryInterface /*, Sequelize*/) => queryInterface.dropTable('Recipedata'),
};