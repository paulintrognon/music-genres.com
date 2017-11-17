export function playTrackAction(track, genre) {
  return { type: 'PLAYER_PLAY_TRACK', payload: { track, genre } };
}

export function closePlayerAction() {
  return { type: 'PLAYER_CLOSE' };
}
