import { push } from 'react-router-redux';

export function goToMusicGenre(slug) {
  return push(`/${slug}`);
}
