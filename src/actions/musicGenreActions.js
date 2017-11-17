import { fetchMusicGenre, upvoteTrack, downvoteTrack } from '../services/api';

export function fetchMusicGenreAction(slug) {
  return dispatch => {
    dispatch({ type: 'MUSIC_GENRE_FETCH_START' })
    fetchMusicGenre(slug)
      .then(res => {
        if (!res.data.error) {
          dispatch({ type: 'MUSIC_GENRE_FETCH_FULFILLED', payload: res.data.result });
        } else {
          dispatch({ type: 'MUSIC_GENRE_FETCH_ERROR', payload: res.data.error });
        }
      });
  };
}

export function voteForTrackAction(track, musicGenreId) {
  return dispatch => {
    dispatch({ type: 'TOGGLE_VOTE_TRACK', payload: track.id });
    if (track.hasUpvoted) {
      downvoteTrack(track.id, musicGenreId);
    } else {
      upvoteTrack(track.id, musicGenreId);
    }
  };
}

export function downvoteTrackAction(trackId, musicGenreId) {
  return dispatch => {
    dispatch({ type: 'TOGGLE_VOTE_TRACK', payload: trackId });
    downvoteTrack(trackId, musicGenreId);
  };
}
