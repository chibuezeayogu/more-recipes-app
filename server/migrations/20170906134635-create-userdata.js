module.exports = {
  up: (queryInterface, Sequelize) => 
   queryInterface.createTable('Userdata', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
     firstname: {
       allowNull: false,
       type: Sequelize.STRING,
     },
     lastname: {
       allowNull: false,
       type: Sequelize.STRING,
     },
     email: {
       allowNull: false,
       type: Sequelize.STRING,
       unique: true,
       isEmail: true,
     },
     password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    imageUrl: {
      allowNull: false,
      type: Sequelize.STRING,
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
 down: (queryInterface /* , Sequelize*/) => queryInterface.dropTable('Userdata'),
};