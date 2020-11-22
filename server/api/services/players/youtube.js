const axios = require('axios');
const bluebird = require('bluebird');
const config = require('../../../config').playerServices.youtube;

module.exports = {
  getTrackPropertiesFromId,
};

async function getTrackPropertiesFromId(id) {
  try {
    const res = await axios(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${config.api.key}`
    );
    if (!res.data.items[0]) {
      return bluebird.reject({
        code: 'item-not-found',
        message: 'Video not found when getting video info',
        payload: {
          id,
        },
      });
    }
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
  } catch (error) {
    return bluebird.reject({
      status: error.response.status,
      code: 'call-to-youtube-api-failed',
      message: 'Error while calling Youtube API',
      payload: error.response.data,
    });
  }
}
