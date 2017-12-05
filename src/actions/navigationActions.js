import { push } from 'react-router-redux';

export function resetAllAction() {
  return {type: 'FULL_RESET'};
}

export function goToMusicGenre(slug) {
  return push(`/${slug}`);
}

export function search(query) {
  return push(`/search/${query}`);
}

export function goToAddVideo() {
  return push(`/add/video`);
}

export function goToAddVideoToGenre(genreSlug, lockGenre) {
  return push(`/add/video/${genreSlug}` + (lockGenre ? '/lock' : ''));
}
