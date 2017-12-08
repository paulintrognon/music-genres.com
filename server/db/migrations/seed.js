const _ = require('lodash');
const list = require('music-genres-list');
const bluebird = require('bluebird');

require('../db').connect()
  .then(() => {
    const MusicGenre = require('../models/MusicGenre');
    const trackService = require('../../api/services/trackService');
    return bluebird.each(list, genreToAdd => {
      const slug = _.kebabCase(genreToAdd.name);
      return MusicGenre.findOne({ where: { slug } })
        .then(musicGenre => {
          if (musicGenre) {
            return bluebird.resolve();
          }
          return MusicGenre.create({
            name: genreToAdd.name,
            slug,
          })
            .then(createdMusicGenre => addExamplesToGenre(createdMusicGenre, genreToAdd.examples));
        });
    });

    function addExamplesToGenre(musicGenre, examples) {
      if (!examples) {
        return bluebird.resolve();
      }
      return bluebird.each(examples, example => {
        return trackService.addToGenre({
          musicGenreId: musicGenre.id,
          track: {
            url: example,
          },
        }).catch(err => {
          console.error(err.message, JSON.stringify(err.payload));
        });
      });
    }
  })
  .then(() => {
    console.log('Done!');
  }, err => {
    console.error(err.message, JSON.stringify(err.payload));
  });
