const defaultState = {
  isActive: false,
  track: null,
  genre: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case 'PLAYER_PLAY_TRACK':
      return {
        ...state,
        isActive: true,
        track: action.payload.track,
        genre: action.payload.genre,
      };

    case 'PLAYER_CLOSE':
      return {
        ...state,
        isActive: false,
      };

    default:
      return state;
  }
}
