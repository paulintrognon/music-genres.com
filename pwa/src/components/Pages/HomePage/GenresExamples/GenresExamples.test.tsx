import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import GenresExamples from './GenresExamples'

const renderer = createRenderer()

// Mocking getPost
import useSWR from 'swr'
jest.mock('swr')
const useSWRMock = useSWR as jest.Mock

beforeEach(() => {
  jest.resetAllMocks()
})

it('should render examples after fetch', async () => {
  const examplesResult = [
    { name: 'Genre 1', slug: 'genre-1' },
    { name: 'Genre 2', slug: 'genre-2' },
    { name: 'Genre 3', slug: 'genre-3' },
  ]
  useSWRMock.mockReturnValueOnce({ data: { result: examplesResult } })
  const component = renderer.render(<GenresExamples />)
  expect(component).toMatchSnapshot()

  expect(useSWRMock).toHaveBeenCalledTimes(1)
  expect(useSWRMock.mock.calls[0]).toEqual(['/api/music-genres/random'])
})

it('should render with loaders if loading', async () => {
  useSWRMock.mockReturnValueOnce({ isValidating: true, data: {} })

  expect(renderer.render(<GenresExamples />)).toMatchSnapshot()
})

it('should return null if no data', async () => {
  useSWRMock.mockReturnValueOnce({ data: null })

  expect(renderer.render(<GenresExamples />)).toBeNull()
})
