import { fetchMusicGenre, parseTrackUrl } from '../services/api';

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
    parseTrackUrl(url)
      .then(res => {
        dispatch({ type: 'ADD_TRACK_PARSE_URL_FETCHED', payload: { id: res.data.result.playerTrackId, title: res.data.result.title } });
      }, () => {
        dispatch({ type: 'ADD_TRACK_PARSE_URL_ERROR' });
      });
  };
}
