const bcrypt = require('bcrypt-nodejs');
module.exports = {
  up: (queryInterface, Sequelize) => 
   queryInterface.bulkInsert('Userdata', [{
     firstname: 'Chibueze',
     lastname: 'Ayogu',
     email: 'chibuezeayogu@hotmail.com',
     password: bcrypt.hashSync('computer'),
     createdAt: new Date(),
     updatedAt: new Date(),
   },{
    firstname: 'Ikenna',
    lastname: 'Okoro',
    email: 'okoro@hotmail.com',
    password: bcrypt.hashSync('ikenna'),
    createdAt: new Date(),
    updatedAt: new Date(),
   }]),
 down: (queryInterface /* , Sequelize*/) => queryInterface.dropTable('Userdata'),
};