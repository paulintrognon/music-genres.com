const defaultState = {
  isLoading: false,
  url: '',
  genre: null,
  track: {
    id: null,
    title: null,
  },
  error: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TRACK_RESET':
      return defaultState;

    case 'ADD_TRACK_LOAD_GENRE':
      return { ...state, genre: { id: action.payload.id, name: action.payload.name } };

    case 'ADD_TRACK_PARSE_URL_FETCHING':
      return { ...state, isLoading: true, url: action.payload, error: false };

    case 'ADD_TRACK_PARSE_URL_FETCHED':
      return { ...state, isLoading: false, track: { id: action.payload.id, title: action.payload.title } };

    case 'ADD_TRACK_PARSE_URL_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'ADD_TRACK_ADD_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
