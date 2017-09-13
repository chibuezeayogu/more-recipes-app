
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    view: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Recipedata, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Userdata, {
      foreignKey: 'userId',
    });
  };
  return Review;
};
