const _ = require('lodash');
const bluebird = require('bluebird');
const db = require('../../db/db');

const trackManager = require('./trackManager');

module.exports = {
  create,
  getAll,
  getOrFail,
  getSomeRandom,
  getWithTracks,
  search,
};

async function create(data) {
  const slug = _.kebabCase(data.name);
  const { parents, musicGenre } = await bluebird.props({
    parents: bluebird.map(data.parentIds || [], checkMusicGenreExistance),
    musicGenre: db.MusicGenre.findOne({ where: { slug } }),
  });
  if (musicGenre) {
    return musicGenre;
  }
  const newMusicGenre = await db.MusicGenre.create({
    name: data.name,
    slug: _.kebabCase(data.name),
  });
  return addParents(newMusicGenre, parents);
}

function getAll() {
  return db.MusicGenre.findAll({
    attributes: ['id', 'name', 'slug'],
    order: ['name'],
  });
}

async function getOrFail(id) {
  const musicGenre = await db.MusicGenre.findById(id);
  if (!musicGenre) {
    return bluebird.reject({
      status: 404,
      code: 'music-genre-not-found',
      message: `The music genre with id ${id} does not exist.`,
      payload: { id },
    });
  }
  return musicGenre;
}

async function getSomeRandom(limit = 5) {
  return db.MusicGenre.findAll({
    limit,
    attributes: ['id', 'name', 'slug'],
    order: [db.Sequelize.fn('RAND')],
  });
}

async function getWithTracks(slug) {
  const musicGenre = (await db.MusicGenre.findOne({
    where: { slug },
    attributes: ['id', 'name', 'slug'],
    include: [
      {
        model: db.Track,
        attributes: ['id', 'title', 'playerName', 'playerTrackId'],
      },
    ],
    plain: true,
  })).get({ plain: true });
  if (!musicGenre) {
    return bluebird.reject({
      status: 404,
      code: 'music-genre-not-found',
      message: `The music genre with slug ${slug} does not exist.`,
      payload: { slug },
    });
  }

  musicGenre.tracks = trackManager.formatWithUpvotes(musicGenre.Tracks);
  return musicGenre;
}

function search(query, limit) {
  const sqlQuery = {
    attributes: ['name', 'slug'],
    where: {
      name: {
        $like: `%${query}%`,
      },
    },
  };
  if (limit) {
    sqlQuery.limit = limit;
  }
  return db.MusicGenre.findAll(sqlQuery);
}

function addParents(musicGenre, parents) {
  return bluebird
    .map(parents, parent => musicGenre.addParent(parent))
    .return(musicGenre);
}

function checkMusicGenreExistance(musicGenreId) {
  return db.MusicGenre.findById(musicGenreId).then(musicGenre => {
    if (musicGenre) {
      return musicGenre;
    }
    return bluebird.reject({
      status: 404,
      code: 'music-genre-not-found',
      message: `Music genre with ID ${musicGenreId} not found`,
      payload: { musicGenreId },
    });
  });
}
