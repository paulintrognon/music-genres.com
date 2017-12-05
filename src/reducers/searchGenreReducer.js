const defaultState = {
  text: null,
  isFocused: false,
  suggestions: [],
  selectedSuggestion: -1,
  results: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SEARCH_GENRE_TYPE':
      return { ...state, text: action.payload };

    case 'SEARCH_GENRE_RESET':
      return { ...state, isFocused: false, suggestions: [], selectedSuggestion: -1, results: null };

    case 'SEARCH_GENRE_FOCUS':
      return { ...state, isFocused: true };

    case 'SEARCH_GENRE_UNFOCUS':
      return { ...state, isFocused: false };

    case 'SEARCH_GENRE_SUGGESTIONS_SET':
      return { ...state, suggestions: action.payload };

    case 'SEARCH_GENRE_SUGGESTIONS_RESET':
      return { ...state, suggestions: [], selectedSuggestion: -1 };

    case 'SEARCH_GENRE_SUGGESTIONS_SELECT': {
      let newSuggestionSelected;
      if (action.payload === 'up') {
        newSuggestionSelected = state.selectedSuggestion - 1;
      } else if (action.payload === 'down') {
        newSuggestionSelected = state.selectedSuggestion + 1;
      }
      if (newSuggestionSelected > state.suggestions.length - 1) {
        return { ...state, selectedSuggestion: 0 };
      }
      else if (newSuggestionSelected < 0) {
        return { ...state, selectedSuggestion: state.suggestions.length - 1 };
      }
      return { ...state, selectedSuggestion: newSuggestionSelected };
    }

    case 'SEARCH_RESULTS_FULFILLED': {
      return { ...state, results: action.payload };
    }

    default:
      return state;
  }
}
