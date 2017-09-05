'use strict';

const bluebird = require('bluebird');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const should = require('should');

const musicGenreManagerStub = {};
const controller = proxyquire('../../controllers/musicGenreController', {
  '../managers/musicGenreManager': musicGenreManagerStub,
});

describe('musicGenreController', () => {
  describe('.createMusicGenre', createMusicGenreSuite);
});

function createMusicGenreSuite() {
  it('should call musicGenreManager.create', callManagerTest);
  it('should make work no parentId', testParentIds(
    {},
    []));
  it('should make work with parentId singular', testParentIds(
    { parentId: 1 },
    [1]));
  it('should make work with a mix of parentId and parentIds', testParentIds(
    { parentIds: [1, 2], parentId: 3 },
    [1, 2, 3]));
  it('should make parentIds uniq', testParentIds(
    { parentIds: [1, 2, 2], parentId: 1 },
    [1, 2]));
  it('should work with singular parentIds', testParentIds(
    { parentIds: 1 },
    [1]));
  it('should work with several parentId', testParentIds(
    { parentId: [1, 2, 3] },
    [1, 2, 3]));

  function callManagerTest(done) {
    const req = {
      body: {
        name: 'Métal',
        parentIds: [1, 2, 3],
      },
    };
    const res = {};
    musicGenreManagerStub.create = sinon.stub().returns(bluebird.resolve(res));

    controller.createMusicGenre(req)
      .then(result => {
        should(musicGenreManagerStub.create.callCount).equal(1);
        should(musicGenreManagerStub.create.firstCall.args[0]).eql({
          name: req.body.name,
          parentIds: req.body.parentIds,
        });
        should(result).equal(res);
      })
      .then(done, done);
  }

  function testParentIds(body, expectedParentIds) {
    return done => {
      const req = { body };
      musicGenreManagerStub.create = sinon.stub().returns(bluebird.resolve());

      controller.createMusicGenre(req)
        .then(() => {
          should(musicGenreManagerStub.create.firstCall.args[0].parentIds).eql(expectedParentIds);
        })
        .then(done, done);
    };
  }
}
