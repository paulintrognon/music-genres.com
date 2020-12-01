module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      len: [3, 30],
    },
    playerTrackId: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      len: [1, 255],
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      len: [1, 100],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: false,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  })

  Track.associate = (models) => {
    Track.belongsToMany(models.MusicGenre, { through: models.MusicGenreTrack })
    Track.hasMany(models.Vote)
  }

  return Track
}
