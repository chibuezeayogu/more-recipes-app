import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    imageUrl: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'addedBy',
      as: 'recipes',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    User.hasMany(models.Favourite, {
      foreignKey: 'userId',
      as: 'favourites',
    });
    User.hasMany(models.Voting, {
      foreignKey: 'userId',
      as: 'votings',
    });
  };
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password);
  });
  return User;
};
