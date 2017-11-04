import { fetchMusicGenre } from '../services/api';

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
