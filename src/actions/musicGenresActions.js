import { push } from 'react-router-redux';

export function goToGenre(slug) {
  return dispatch => {
    dispatch(push(`/${slug}`));
    dispatch({ type: 'SEARCH_GENRE_UNFOCUS' });
    dispatch({ type: 'SEARCH_GENRE_SUGGESTIONS_RESET' });
  };
}
