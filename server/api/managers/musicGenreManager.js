const _ = require('lodash');
const bluebird = require('bluebird');
const Sequelize = require('sequelize');

const MusicGenre = require('../../db/models/MusicGenre');
const trackManager = require('./trackManager');
const Track = require('../../db/models/Track');

module.exports = createManager();

function createManager() {
  const manager = {};

  manager.create = create;
  manager.getAll = getAll;
  manager.getOrFail = getOrFail;
  manager.getSomeRandom = getSomeRandom;
  manager.getWithTracks = getWithTracks;
  manager.search = search;

  return manager;

  // ------------------------------------------------------

  function create(data) {
    const slug = _.kebabCase(data.name);
    return bluebird
      .props({
        parents: bluebird.map(data.parentIds || [], checkMusicGenreExistance),
        musicGenre: MusicGenre.findOne({ where: { slug } }),
      })
      .then(res => {
        if (res.musicGenre) {
          return res.musicGenre;
        }
        return MusicGenre.create({
          name: data.name,
          slug: _.kebabCase(data.name),
        }).then(musicGenre => addParents(musicGenre, res.parents));
      });
  }

  function getAll() {
    return MusicGenre.findAll({
      attributes: ['id', 'name', 'slug'],
      order: ['name'],
    });
  }

  function getOrFail(id) {
    return MusicGenre.findById(id).then(musicGenre => {
      if (musicGenre) {
        return musicGenre;
      }
      return bluebird.reject({
        status: 404,
        code: 'music-genre-not-found',
        message: `The music genre with id ${id} does not exist.`,
        payload: { id },
      });
    });
  }

  function getSomeRandom(limit = 5) {
    return MusicGenre.findAll({
      limit,
      attributes: ['id', 'name', 'slug'],
      order: [Sequelize.fn('RAND')],
    });
  }

  function getWithTracks(slug) {
    return MusicGenre.findOne({
      where: { slug },
      attributes: ['id', 'name', 'slug'],
      include: [
        {
          model: Track,
          attributes: ['id', 'title', 'playerName', 'playerTrackId'],
        },
      ],
    })
      .then(res => {
        if (!res) {
          return bluebird.reject({
            status: 404,
            code: 'music-genre-not-found',
            message: `The music genre with slug ${slug} does not exist.`,
            payload: { slug },
          });
        }
        return res;
      })
      .then(res => res.get({ plain: true }))
      .then(res => {
        res.tracks = trackManager.formatWithUpvotes(res.tracks);
        return res;
      });
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
    return MusicGenre.findAll(sqlQuery);
  }

  // ------------------------------------------------------

  function addParents(musicGenre, parents) {
    return bluebird
      .map(parents, parent => musicGenre.addParent(parent))
      .return(musicGenre);
  }

  function checkMusicGenreExistance(musicGenreId) {
    return MusicGenre.findById(musicGenreId).then(musicGenre => {
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
}
