import api from '../services/api';

export function changeFocusAction(focus) {
  if (focus) {
    return { type: 'SEARCH_GENRE_FOCUS' };
  }
  return { type: 'SEARCH_GENRE_UNFOCUS' };
}

export function suggestGenresAction(text) {
  return dispatch => {
    console.log('suggest', text);
    api.get(`/music-genres/search?query=${text}`)
      .then(res => console.log(res));
  };
}
