/**
 * Base API Url, set in .env
 */
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'localhost:3001'

/**
 * Error Body Type
 */
export type HttpErrorBody = {
  error: true
  message: string
  code: string
}

/**
 * HTTP Response Type can be either successful or not.
 * If successful, the body type is given as parameter.
 * If not successful, the body type is always of type HttpErrorBody.
 */
export type HttpResponse<BodyType> = Response &
  (
    | {
        ok: true
        parsedBody: BodyType
      }
    | {
        ok: false
        parsedBody: HttpErrorBody
      }
  )

/**
 * GET request to the api.
 * If success, returns
 *   Promise<{ ok: true, status: <statusCode>, parsedBody: <body> }>
 * If error, returns:
 *   Promise<{ ok: false, status: <statusCode>, parsedBody: <body> }>
 */
export async function get<BodyType>(path: string): Promise<HttpResponse<BodyType>> {
  try {
    const response = await fetch(`${BASE_API_URL}${path}`)
    return toResponse(response)
  } catch (err) {
    return toErrorResponse(err)
  }
}

/**
 * POST request to the api.
 * If success, returns
 *   Promise<{ ok: true, status: <statusCode>, parsedBody: <body> }>
 * If error, returns:
 *   Promise<{ ok: false, status: <statusCode>, parsedBody: <body> }>
 */
export async function post<BodyType>(
  path: string,
  payload: unknown
): Promise<HttpResponse<BodyType>> {
  try {
    const response = await fetch(`${BASE_API_URL}${path}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return toResponse(response)
  } catch (err) {
    return toErrorResponse(err)
  }
}

/**
 * Parse the body to json, and return the Response object
 */
async function toResponse<BodyType>(response: Response): Promise<HttpResponse<BodyType>> {
  const jsonBody = await response.json()
  if (response.ok) {
    return {
      ...response,
      ok: true,
      parsedBody: jsonBody.result as BodyType,
    }
  }
  return {
    ...response,
    ok: false,
    parsedBody: jsonBody as HttpErrorBody,
  }
}

/**
 * Format internal errors into a HttpErrorResponse
 */
function toErrorResponse<BodyType>(error: Error): HttpResponse<BodyType> {
  return {
    ...new Response(undefined, { status: 500, statusText: error.message }),
    ok: false,
    parsedBody: { error: true, code: 'internal-error', message: error.message },
  }
}
