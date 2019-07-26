module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    'Vote',
    {
      userHash: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        len: 100,
      },
    },
    {
      deletedAt: false,
      paranoid: false,
    }
  );

  Vote.associate = models => {
    Vote.belongsTo(models.Track);
    Vote.belongsTo(models.MusicGenre);
  };

  return Vote;
};
