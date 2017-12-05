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

export function downvoteTrack(trackId, musicGenreId) {
  return api.post(`/tracks/downvote`, { trackId, musicGenreId });
}

export function getRandomTrack() {
  return api.get(`/tracks/random`);
}

export function parseTrackUrl(trackUrl) {
  return api.post(`/tracks/parseUrl`, { trackUrl });
}

export function createGenre(name) {
  return api.post(`/music-genres/create`, { name });
}

export function addTrackToGenre(url, musicGenreId) {
  return api.post(`/tracks/add`, {
    url,
    musicGenreId,
  });
}
