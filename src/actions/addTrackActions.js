import { goToMusicGenre } from './navigationActions';
import { addTrackToGenre, createGenre, fetchMusicGenre, parseTrackUrl } from '../services/api';

export function addTrackToGenreAction(url, genre) {
  return dispatch => {
    addTrack()
      .then(res => {
        dispatch(goToMusicGenre(res.data.result.musicGenre.slug));
      });
  };

  function addTrack() {
    if (genre.id) {
      return addTrackToGenre(url, genre.id);
    }
    return createGenre(genre.name)
      .then(res => {
        return addTrackToGenre(url, res.data.result.id);
      });
  }
}


export function loadGenreAction(genre) {
  return dispatch => {
    fetchMusicGenre(genre)
      .then(res => {
        dispatch({type: 'ADD_TRACK_LOAD_GENRE', payload: { id: res.data.result.id, name: res.data.result.name }});
      }, () => {
        dispatch({type: 'ADD_TRACK_LOAD_GENRE', payload: { name: genre }});
      });
  }
}

export function parseTrackUrlAction(url) {
  return dispatch => {
    dispatch({ type: 'ADD_TRACK_PARSE_URL_FETCHING', payload: url })
    if (!url) {
      return;
    }
    parseTrackUrl(url)
      .then(res => {
        dispatch({ type: 'ADD_TRACK_PARSE_URL_FETCHED', payload: { id: res.data.result.playerTrackId, title: res.data.result.title } });
      }, () => {
        dispatch({ type: 'ADD_TRACK_PARSE_URL_ERROR' });
      });
  };
}
