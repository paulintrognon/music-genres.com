import { addVideoLink } from './links'

describe('addVideoLink()', () => {
  it('should generate the link', () => {
    expect(addVideoLink('super-genre')).toEqual('/add/video/super-genre')
  })
})
