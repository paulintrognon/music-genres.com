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

    case 'TOGGLE_VOTE_TRACK':
      if (!state.track) {
        return state;
      }
      return {
        ...state,
        track: {
          ...state.track,
          hasUpvoted: !state.track.hasUpvoted,
          upvotes: state.track.hasUpvoted ? state.track.upvotes-1 : state.track.upvotes+1,
        },
      };

    default:
      return state;
  }
}
