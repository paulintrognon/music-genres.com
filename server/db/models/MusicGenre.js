module.exports = (sequelize, DataTypes) => {
  const MusicGenre = sequelize.define(
    'MusicGenre',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        len: [2, 100],
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        len: [2, 100],
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  )

  MusicGenre.associate = (models) => {
    MusicGenre.hasMany(models.MusicGenreTrack)
    MusicGenre.hasMany(models.Vote)
    MusicGenre.belongsToMany(models.Track, { through: models.MusicGenreTrack })
    MusicGenre.belongsToMany(MusicGenre, {
      as: 'Parents',
      through: 'MusicGenreParents',
    })
  }

  return MusicGenre
}
