import { push } from 'react-router-redux';

export function goToMusicGenre(slug) {
  return push(`/${slug}`);
}

export function search(query) {
  return push(`/search/${query}`);
}

export function goToAddVideo() {
  return push(`/add/video`);
}

export function goToAddVideoToGenre(genreSlug) {
  return push(`/add/${genreSlug}/video`);
}
