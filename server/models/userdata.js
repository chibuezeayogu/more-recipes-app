import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Userdata = sequelize.define('Userdata', {
     firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  });
  Userdata.associate = (models) => {
    Userdata.hasMany(models.Recipedata, {
      foreignKey: 'addedBy',
      as: 'recipedatas',
    });
    Userdata.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    Userdata.hasMany(models.Favourite, {
      foreignKey: 'userId',
      as: 'favourites',
    });
    Userdata.hasMany(models.Voting, {
      foreignKey: 'userId',
      as: 'votings',
    });
  };
  Userdata.beforeCreate((userdata) => {
    userdata.password = bcrypt.hashSync(userdata.password);
  });
  return Userdata;
};
