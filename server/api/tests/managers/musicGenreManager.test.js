'use strict';

const bluebird = require('bluebird');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const should = require('should');

const MusicGenreStub = {};
const TrackStub = {};
const model = proxyquire('../../managers/musicGenreManager.js', {
  '../../database/models/MusicGenre': MusicGenreStub,
  '../../database/models/Track': TrackStub,
});

describe('musicGenreManager', () => {
  describe('.create', createSuite);
});

function createSuite() {
  it('should call the model with an added slug', test);

  function test(done) {
    const data = {
      name: 'Super weird Style.genre~lol^^',
    };
    const modelResult = {};
    MusicGenreStub.create = sinon.stub().returns(bluebird.resolve(modelResult));

    model.create(data)
      .then(res => {
        should(MusicGenreStub.create.callCount).equal(1);
        should(MusicGenreStub.create.firstCall.args).eql([
          {
            name: data.name,
            slug: 'super-weird-style-genre-lol',
          },
        ]);
        should(res).equal(modelResult);
      })
      .then(done, done);
  }
}
