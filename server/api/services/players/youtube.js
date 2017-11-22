'use strict';

const axios = require('axios');
const bluebird = require('bluebird');
const config = require('config/api').playerServices.youtube;

module.exports = createService();

function createService() {
  const service = {};

  service.getTrackPropertiesFromId = getTrackPropertiesFromId;

  return service;

  // ------------------------------------------------------

  function getTrackPropertiesFromId(id) {
    return axios(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${config.api.key}`)
      .then(res => {
        const videoProperies = res.data.items[0].snippet;
        return {
          title: videoProperies.title,
          description: videoProperies.description,
          tags: videoProperies.tags,
          owner: {
            name: videoProperies.channelTitle,
            id: videoProperies.channelId,
          },
        };
      }, error => {
        return bluebird.reject({
          status: error.response.status,
          code: 'call-to-youtube-api-failed',
          message: 'Error while calling Youtube API',
          payload: error.response.data,
        });
      });
  }
}
