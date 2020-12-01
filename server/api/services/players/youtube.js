const axios = require('axios')
const bluebird = require('bluebird')
const config = require('../../../config').playerServices.youtube

module.exports = {
  getTrackPropertiesFromId,
}

async function getTrackPropertiesFromId(id) {
  try {
    const res = await axios(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${config.api.key}`
    )
    if (!res.data.items[0]) {
      return bluebird.reject({
        code: 'item-not-found',
        message: 'Video not found when getting video info',
        payload: {
          id,
        },
      })
    }
    const videoProperties = res.data.items[0].snippet
    return {
      title: videoProperties.title,
      description: videoProperties.description,
      tags: videoProperties.tags,
      owner: {
        name: videoProperties.channelTitle,
        id: videoProperties.channelId,
      },
    }
  } catch (error) {
    return bluebird.reject({
      status: error.response.status,
      code: 'call-to-youtube-api-failed',
      message: 'Error while calling Youtube API',
      payload: error.response.data,
    })
  }
}
