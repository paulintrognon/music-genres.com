import { getRandomTrack } from '../services/api';
import { goToMusicGenrePlayTrack } from './navigationActions';

export function playTrackAction(trackIndex, genre) {
  return (dispatch, getState) => {
    const tracks = getState().musicGenre.musicGenre.tracks;
    const track = tracks[trackIndex];
    dispatch(goToMusicGenrePlayTrack(genre, track));
    dispatch({ type: 'PLAYER_PLAY_TRACK', payload: {
      inGenre: true,
      trackIndex,
      genre,
      track,
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
