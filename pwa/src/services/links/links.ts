/**
 * Link to add a video to a given genre
 */
export function addVideoLink(genre: string): string {
  return `/add/video/${genre}`
}

export function genreLink(slug: string): string {
  return `/genre/${slug}`
}
