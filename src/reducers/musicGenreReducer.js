const defaultState = {
  isFetched: false,
  isFetching: false,
  musicGenre: null,
  error: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'MUSIC_GENRE_FETCH_START':
      return { ...state, isFetched: false, isFetching: true };

    case 'MUSIC_GENRE_FETCH_FULFILLED':
      return { ...state, isFetched: true, isFetching: false, musicGenre: action.payload, error: null };

    case 'MUSIC_GENRE_FETCH_ERROR':
      return { ...state, isFetched: true, isFetching: false, musicGenre: null, error: action.payload };

    default:
      return state;
  }
}
