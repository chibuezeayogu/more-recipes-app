const bcrypt = require('bcrypt-nodejs');
module.exports = {
  up: (queryInterface, Sequelize) => 
   queryInterface.bulkInsert('Userdata', [{
     firstname: 'Chibueze',
     lastname: 'Ayogu',
     email: 'chibuezeayogu@hotmail.com',
     imageUrl: 'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg',
     password: bcrypt.hashSync('computer123'),
     createdAt: new Date(),
     updatedAt: new Date(),
   },{
    firstname: 'Ikenna',
    lastname: 'Okoro',
    email: 'okoro@hotmail.com',
    imageUrl: 'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg',
    password: bcrypt.hashSync('ikenna123'),
    createdAt: new Date(),
    updatedAt: new Date(),
   }]),
 down: (queryInterface /* , Sequelize*/) => queryInterface.dropTable('Userdata'),
};