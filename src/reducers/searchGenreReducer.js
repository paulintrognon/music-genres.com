const defaultState = {
  isActive: false,
  suggestions: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SEARCH_GENRE_FOCUS':
      return { ...state, isFocused: true };

    case 'SEARCH_GENRE_UNFOCUS':
      return { ...state, isFocused: false };

    case 'SEARCH_GENRE_SUGGESTIONS_FETCHED':
      return { ...state, suggestions: action.payload };

    default:
      return state;
  }
}
