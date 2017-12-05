import { searchMusicGenres } from '../services/api';
import { goToMusicGenre, search } from './navigationActions';

export function typeAction(text) {
  return { type: 'SEARCH_GENRE_TYPE', payload: text };
}

export function changeFocusAction(focus) {
  if (focus) {
    return { type: 'SEARCH_GENRE_FOCUS' };
  }
  return { type: 'SEARCH_GENRE_UNFOCUS' };
}

export function suggestGenresAction(text) {
  return dispatch => {
    searchMusicGenres(text, 5)
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

export function selectSuggestionAction(direction) {
  return {
    type: 'SEARCH_GENRE_SUGGESTIONS_SELECT',
    payload: direction,
  };
}

export function validSuggestionAction(slug) {
  return dispatch => {
    dispatch({ type: 'SEARCH_GENRE_RESET' });
    dispatch(goToMusicGenre(slug));
  };
}

export function goToSearchResultsAction(query) {
  return dispatch => {
    dispatch({ type: 'SEARCH_GENRE_RESET' });
    dispatch(search(query));
  };
}

export function fetchSearchResultsAction(query) {
  return dispatch => {
    dispatch({ type: 'SEARCH_RESULTS_FETCH' });
    searchMusicGenres(query)
      .then(res => {
        if (!res.data.error) {
          dispatch({ type: 'SEARCH_RESULTS_FULFILLED', payload: res.data.result });
        }
      })
  };
}
