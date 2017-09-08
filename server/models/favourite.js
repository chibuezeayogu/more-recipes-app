module.exports = (sequelize, DataTypes) => {
  const favourite = sequelize.define('Favourite', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.Recipedata, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favourite.belongsTo(models.Userdata, {
      foreignKey: 'userId',
    });
  };
  return favourite;
};

module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.Recipedata, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favourite.belongsTo(models.Userdata, {
      foreignKey: 'userId',
    });
  };
  return Favourite;
};