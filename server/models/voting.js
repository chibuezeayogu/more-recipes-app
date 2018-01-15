
module.exports = (sequelize, DataTypes) => {
  const Voting = sequelize.define('Voting', {
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    voting: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Voting.associate = (models) => {
    Voting.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
    Voting.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Voting;
};
