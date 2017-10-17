import { push } from 'react-router-redux';

export function goToGenre(slug) {
  return dispatch => {
    dispatch(push(`/${slug}`));
  };
}
