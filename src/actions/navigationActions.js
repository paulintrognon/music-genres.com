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
  const encodedGenre = encodeURIComponent(genreSlug);
  return push(`/add/video/${encodedGenre}` + (lockGenre ? '/lock' : ''));
}
