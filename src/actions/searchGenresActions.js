import api from '../services/api';
import { goToMusicGenre, search } from './navigationActions';

export function changeFocusAction(focus) {
  if (focus) {
    return { type: 'SEARCH_GENRE_FOCUS' };
  }
  return { type: 'SEARCH_GENRE_UNFOCUS' };
}

export function suggestGenresAction(text) {
  return dispatch => {
    api.get(`/music-genres/search?query=${text}`)
      .then(res => {
        if (!res.data.error) {
          dispatch({ type: 'SEARCH_GENRE_SUGGESTIONS_SET', payload: res.data.result });
        }
      });
  };
}

export function resetGenresSuggestionsAction() {
  return { type: 'SEARCH_GENRE_SUGGESTIONS_RESET' };
}

export function selectSuggestion(direction) {
  return {
    type: 'SEARCH_GENRE_SUGGESTIONS_SELECT',
    payload: direction,
  };
}

export function validSuggestion(slug) {
  return dispatch => {
    dispatch(goToMusicGenre(slug));
    dispatch({ type: 'SEARCH_GENRE_RESET' });
  };
}

export function searchGenre(query) {
  return dispatch => {
    dispatch(search(query));
    dispatch({ type: 'SEARCH_GENRE_RESET' });
  };
}
