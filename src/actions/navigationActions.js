import { push } from 'react-router-redux';

export function goToMusicGenre(slug) {
  return push(`/${slug}`);
}

export function search(query) {
  return push(`/search/${query}`);
}
