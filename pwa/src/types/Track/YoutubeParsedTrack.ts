export type YoutubeParsedTrack = {
  playerName: 'youtube'
  playerTrackId: string
  title: string
  description: string
  tags: string[]
  owner: { name: string; id: string }
}
