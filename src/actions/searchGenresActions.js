export function changeFocusAction(focus) {
  if (focus) {
    return { type: 'SEARCH_GENRE_FOCUS' };
  }
  return { type: 'SEARCH_GENRE_UNFOCUS' };
}

export function suggestGenresAction(text) {
  return dispatch => {
    console.log('suggest', text);
  };
}
