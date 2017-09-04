'use strict';

const proxyquire = require('proxyquire').noCallThru();
const should = require('should');

const service = proxyquire('../../services/musicPlayer.js', {});

describe('musicPlayer service', () => {
  describe('.parseTrackUrl', parseTrackUrlSuite);
});

function parseTrackUrlSuite() {
  describe('youtube', youtubeTests);

  function youtubeTests() {
    const expectedResult = {
      name: 'youtube',
      trackId: 'DwpedKWwS3w',
    };
    const urls = [
      'https://www.youtube.com/watch?v=DwpedKWwS3w',
      'http://www.youtube.com/watch?v=DwpedKWwS3w&t=50',
      'https://youtu.be/DwpedKWwS3w',
      'http://youtu.be/DwpedKWwS3w&t=50',
      'youtube.com/watch?v=DwpedKWwS3w',
      'youtu.be/DwpedKWwS3w&t=50',
    ];

    test(urls, expectedResult);
  }

  function test(urls, expectedResult) {
    urls.forEach(url => {
      it(`should detect ${JSON.stringify(expectedResult)} from ${url}`, () => {
        const result = service.parseTrackUrl(url);
        should(result).eql(expectedResult);
      });
    });
  }
}
