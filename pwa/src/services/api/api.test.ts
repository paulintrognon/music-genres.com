import { get, post } from './api'
import fetchMock from 'jest-fetch-mock'

beforeEach(() => {
  fetchMock.resetMocks()
})

/**
 * .get() suite
 */
describe('get()', () => {
  it('should use fetch and return result', async () => {
    const url = '/foo/bar/get'
    fetchMock.mockResponseOnce('{"result":{ "foo": "bar" }}')
    const response = await get(url)
    expect(fetchMock.mock.calls).toEqual([['localhost:3001/foo/bar/get']])
    expect(response.ok).toEqual(true)
    expect(response.parsedBody).toEqual({ foo: 'bar' })
  })

  it('should return an error if an error status code is returned', async () => {
    const url = '/foo/bar/get'
    fetchMock.mockOnce('{ "foo": "bar" }', { status: 404 })
    const response = await get(url)
    expect(fetchMock.mock.calls).toEqual([['localhost:3001/foo/bar/get']])
    expect(response.ok).toEqual(false)
    expect(response.parsedBody).toEqual({ foo: 'bar' })
  })

  it('should return an error if an internal error occurred', async () => {
    const url = '/foo/bar/get'
    const errorMessage = 'this is a test error message'
    fetchMock.mockReject(new Error(errorMessage))
    const response = await get(url)
    expect(fetchMock.mock.calls).toEqual([['localhost:3001/foo/bar/get']])
    expect(response.ok).toEqual(false)
    expect(response.parsedBody).toEqual({
      error: true,
      code: 'internal-error',
      message: errorMessage,
    })
  })
})

/**
 * .post() suite
 */
describe('post()', () => {
  it('should use fetch and return result', async () => {
    const url = '/foo/bar/post'
    const data = { fiz: 'biz' }
    fetchMock.mockResponseOnce('{"result":{ "foo": "bar" }}')
    const response = await post(url, data)
    expect(fetchMock.mock.calls).toEqual([
      [
        'localhost:3001/foo/bar/post',
        {
          body: '{"fiz":"biz"}',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'post',
        },
      ],
    ])
    expect(response.ok).toEqual(true)
    expect(response.parsedBody).toEqual({ foo: 'bar' })
  })

  it('should return an error if an error status code is returned', async () => {
    const url = '/foo/bar/get'
    const data = { fiz: 'biz' }
    fetchMock.mockOnce('{ "foo": "bar" }', { status: 404 })
    const response = await post(url, data)
    expect(response.ok).toEqual(false)
    expect(response.parsedBody).toEqual({ foo: 'bar' })
  })

  it('should return an error if an internal error occurred', async () => {
    const url = '/foo/bar/get'
    const data = { fiz: 'biz' }
    const errorMessage = 'this is a test error message'
    fetchMock.mockReject(new Error(errorMessage))
    const response = await post(url, data)
    expect(response.ok).toEqual(false)
    expect(response.parsedBody).toEqual({
      error: true,
      code: 'internal-error',
      message: errorMessage,
    })
  })
})
