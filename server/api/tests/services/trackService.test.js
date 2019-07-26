const bluebird = require('bluebird');
const proxyquire = require('proxyquire').noCallThru();
const should = require('should');
const sinon = require('sinon');

const trackPlayerService = {};
const musicGenreManagerStub = {};
const trackManagerStub = {};
const TrackStub = {};
const service = proxyquire('../../services/trackService.js', {
  './trackPlayerService': trackPlayerService,
  '../managers/musicGenreManager': musicGenreManagerStub,
  '../managers/trackManager': trackManagerStub,
  '../../db/models/Track': TrackStub,
});

describe('track service', () => {
  describe(
    '.checkIfUserHasUpvotedTheTracks',
    checkIfUserHasUpvotedTheTracksSuite
  );
});

function checkIfUserHasUpvotedTheTracksSuite() {
  it('should add hasUpvoted property', test);

  function test(done) {
    const tracks = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const userHash = 'super-user-hash';

    trackManagerStub.hasUserUpvotedTheTrack = sinon.stub();
    trackManagerStub.hasUserUpvotedTheTrack
      .onFirstCall()
      .returns(bluebird.resolve(true));
    trackManagerStub.hasUserUpvotedTheTrack
      .onSecondCall()
      .returns(bluebird.resolve(false));
    trackManagerStub.hasUserUpvotedTheTrack
      .onThirdCall()
      .returns(bluebird.resolve(false));

    service
      .checkIfUserHasUpvotedTheTracks(tracks, userHash)
      .then(res => {
        should(trackManagerStub.hasUserUpvotedTheTrack.callCount).equal(3);
        should(trackManagerStub.hasUserUpvotedTheTrack.firstCall.args).eql([
          tracks[0].id,
          userHash,
        ]);
        should(trackManagerStub.hasUserUpvotedTheTrack.secondCall.args).eql([
          tracks[1].id,
          userHash,
        ]);
        should(trackManagerStub.hasUserUpvotedTheTrack.thirdCall.args).eql([
          tracks[2].id,
          userHash,
        ]);
        should(res).eql([
          { id: 1, hasUpvoted: true },
          { id: 2, hasUpvoted: false },
          { id: 3, hasUpvoted: false },
        ]);
      })
      .then(done, done);
  }
}
