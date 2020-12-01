module.exports = (sequelize, DataTypes) => {
  const MusicGenreTrack = sequelize.define(
    'MusicGenreTrack',
    {
      upvotes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      deletedAt: false,
      paranoid: false,
    }
  )

  return MusicGenreTrack
}
