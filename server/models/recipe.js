
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ingredients: {
      allowNull: false,
      type: DataTypes.STRING
    },
    procedures: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    upvotes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    views: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    addedBy: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'addedBy'
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    Recipe.hasMany(models.Favourite, {
      foreignKey: 'recipeId',
      as: 'favourites'
    });
    Recipe.hasMany(models.Voting, {
      foreignKey: 'recipeId',
      as: 'votings'
    });
  };
  return Recipe;
};
