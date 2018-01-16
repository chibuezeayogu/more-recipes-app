const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [{
      firstName: 'Chibueze',
      lastName: 'Ayogu',
      email: 'chibuezeayogu@hotmail.com',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg',
      password: bcrypt.hashSync('Password1.@'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Ikenna',
      lastName: 'Okoro',
      email: 'okoro@hotmail.com',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg',
      password: bcrypt.hashSync('Password2.@'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]),
  down: queryInterface => queryInterface.dropTable('Users'),
};
