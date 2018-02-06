import { getRandomTrack } from '../services/api';

export function playTrackAction(trackIndex, genre) {
  return (dispatch, getState) => {
    const tracks = getState().musicGenre.musicGenre.tracks;
    dispatch({ type: 'PLAYER_PLAY_TRACK', payload: {
      inGenre: true,
      trackIndex,
      genre,
      track: tracks[trackIndex],
      hasPreviousTrack: tracks[trackIndex-1] !== undefined,
      hasNextTrack: tracks[trackIndex+1] !== undefined,
    } });
  };
}

export function playRandomTrackAction() {
  return (dispatch) => {
    getRandomTrack()
      .then(res => {
        dispatch({ type: 'PLAYER_PLAY_TRACK', payload: {
          inGenre: false,
          track: res.data.result.track,
          genre: res.data.result.musicGenre,
        } });
      });
  };
}

export function closePlayerAction() {
  return { type: 'PLAYER_CLOSE' };
}
