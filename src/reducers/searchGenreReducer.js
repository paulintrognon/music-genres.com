const defaultState = {
  isActive: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SEARCH_GENRE_FOCUS':
      return { ...state, isFocused: true };

    case 'SEARCH_GENRE_UNFOCUS':
      return { ...state, isFocused: false };

    default:
      return state;
  }
}
