export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL

export type HttpErrorResponse = {
  error: true
  message: string
  code: string
}

export type HttpResponse<BodyType> = Response &
  (
    | {
        ok: true
        parsedBody: BodyType
      }
    | {
        ok: false
        parsedBody: HttpErrorResponse
      }
  )

export async function get<BodyType>(path: string): Promise<HttpResponse<BodyType>> {
  try {
    const response = await fetch(`${BASE_API_URL}${path}`)
    return toResponse(response)
  } catch (err) {
    return toErrorResponse(err)
  }
}

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
    parsedBody: jsonBody as HttpErrorResponse,
  }
}

function toErrorResponse<BodyType>(error: Error): HttpResponse<BodyType> {
  return {
    ...new Response(undefined, { status: 500, statusText: error.message }),
    ok: false,
    parsedBody: { error: true, code: 'internal-error', message: error.message },
  }
}
