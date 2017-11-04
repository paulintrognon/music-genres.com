import axios from 'axios';
import config from 'config';

export const api = axios.create({
  baseURL: `${config.api.baseUrl}:${config.api.port}/api`,
});

export function searchMusicGenres(query, limit) {
  return api.get(`/music-genres/search?query=${query}&limit=${limit}`)
}

export function fetchMusicGenre(slug) {
  return api.get(`/music-genres/${slug}/with-tracks`);
}

export function upvoteTrack(trackId, musicGenreId) {
  return api.post(`/tracks/upvote`, { trackId, musicGenreId });
}
