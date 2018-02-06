import { push } from 'react-router-redux';

export function resetAllAction() {
  return {type: 'FULL_RESET'};
}

export function goToHomePage() {
  return push('/');
}

export function goToMusicGenre(slug) {
  return push(`/${slug}`);
}

export function search(query) {
  return push(`/search/${query}`);
}

export function goToRandomPage() {
  return push('/random-musical-genre');
}

export function goToAddVideo() {
  return push(`/add/video`);
}

export function goToAddVideoToGenre(genreSlug, lockGenre) {
  return push(`/add/video/${genreSlug}` + (lockGenre ? '/lock' : ''));
}
