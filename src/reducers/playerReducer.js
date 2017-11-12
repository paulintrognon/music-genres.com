const defaultState = {
  isFetched: true,
  isFetching: false,
  track: {
    "id": 2,
    "playerName": "youtube",
    "playerTrackId": "fRgWBN8yt_E",
    "title": "Ray Charles - Georgia On My Mind (The Orginal Song From The Albom)"
  },
  genre: {
    name: 'Jazz',
    upvotes: 17
  },
  error: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'PLAYER_TRACK_FETCH_START':
      return { ...state, isFetched: false, isFetching: true };

    case 'PLAYER_TRACK_FETCH_PLAY':
      return { ...state, isFetched: true, isFetching: false, track: action.payload.track, genre: action.payload.genre, error: null };

    case 'PLAYER_TRACK_FETCH_ERROR':
      return { ...state, isFetched: true, isFetching: false, track: null, error: action.payload };

    default:
      return state;
  }
}
