
module.exports = (sequelize, DataTypes)  => {
  const Recipedata = sequelize.define('Recipedata', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ingredients: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    procedures: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    upvotes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downvotes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }); 
  Recipedata.associate = (models) => {
    Recipedata.belongsTo(models.Userdata, {
      foreignKey: 'userId',
    });
    Recipedata.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
    Recipedata.hasMany(models.Favourite, {
      foreignKey: 'recipeId',
      as: 'favourites',
    });
    Recipedata.hasMany(models.Voting, {
      foreignKey: 'recipeId',
      as: 'votings',
    });
  };
  return Recipedata;
};