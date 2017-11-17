const defaultState = {
  isActive: false,
  track: null,
  genre: null,
  trackIndex: null,
  hasPreviousTrack: false,
  hasNextTrack: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case 'PLAYER_PLAY_TRACK':
      return {
        ...state,
        isActive: true,
        track: action.payload.track,
        genre: action.payload.genre,
        trackIndex: action.payload.trackIndex,
        hasPreviousTrack: action.payload.hasPreviousTrack,
        hasNextTrack: action.payload.hasNextTrack,
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
