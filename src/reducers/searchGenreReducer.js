const defaultState = {
  isActive: false,
  suggestions: [],
  suggestionSelected: -1,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SEARCH_GENRE_FOCUS':
      return { ...state, isFocused: true };

    case 'SEARCH_GENRE_UNFOCUS':
      return { ...state, isFocused: false };

    case 'SEARCH_GENRE_SUGGESTIONS_SET':
      return { ...state, suggestions: action.payload };

    case 'SEARCH_GENRE_SUGGESTIONS_RESET':
      return { ...state, suggestions: [], suggestionSelected: -1 };

    case 'SEARCH_GENRE_SUGGESTIONS_SELECT': {
      let newSuggestionSelected;
      if (action.payload === 'up') {
        newSuggestionSelected = state.suggestionSelected - 1;
      } else if (action.payload === 'down') {
        newSuggestionSelected = state.suggestionSelected + 1;
      }
      console.log(newSuggestionSelected);
      if (newSuggestionSelected > state.suggestions.length - 1) {
        return { ...state, suggestionSelected: 0 };
      }
      else if (newSuggestionSelected < 0) {
        return { ...state, suggestionSelected: state.suggestions.length - 1 };
      }
      return { ...state, suggestionSelected: newSuggestionSelected };
    }

    default:
      return state;
  }
}
