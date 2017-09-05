'use strict';

const axios = require('axios');
const config = require('../../../config').playerServices.youtube;

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
      });
  }
}
