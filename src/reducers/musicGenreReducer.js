const defaultState = {
  isFetched: false,
  isFetching: false,
  musicGenre: null,
  error: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'FULL_RESET':
      return defaultState;

    case 'MUSIC_GENRE_FETCH_START':
      return { ...state, isFetched: false, isFetching: true };

    case 'MUSIC_GENRE_FETCH_FULFILLED':
      return { ...state, isFetched: true, isFetching: false, musicGenre: action.payload, error: null };

    case 'MUSIC_GENRE_FETCH_ERROR':
      return { ...state, isFetched: true, isFetching: false, musicGenre: null, error: action.payload };

    case 'TOGGLE_VOTE_TRACK':
      return { ...state, musicGenre: {
        ...state.musicGenre,
        tracks: state.musicGenre.tracks.map(track => {
          if (track.id !== action.payload) {
            return track;
          }
          if (track.hasUpvoted) {
            return { ...track, hasUpvoted: false, upvotes: track.upvotes-1 };
          }
          return { ...track, hasUpvoted: true, upvotes: track.upvotes+1 };
        }),
      } };

    default:
      return state;
  }
}
