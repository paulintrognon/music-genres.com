export function playTrackAction(trackIndex, genre) {
  return (dispatch, getState) => {
    const tracks = getState().musicGenre.musicGenre.tracks;
    dispatch({ type: 'PLAYER_PLAY_TRACK', payload: {
      trackIndex,
      genre,
      track: tracks[trackIndex],
      hasPreviousTrack: tracks[trackIndex-1] !== undefined,
      hasNextTrack: tracks[trackIndex+1] !== undefined,
    } });
  };
}

export function closePlayerAction() {
  return { type: 'PLAYER_CLOSE' };
}
