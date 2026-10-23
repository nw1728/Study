// Everything the admin says to the server, in one place.
//
// Nothing here throws on a refusal the admin expects (not logged in, invalid
// content): those come back as values the page can show. Only a real network
// failure throws.

async function send(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    ...options,
  })
  return response
}

export async function getMe() {
  const response = await send('/api/me')
  if (!response.ok) return { user: null, authMode: null }
  return await response.json()
}

export async function getContent(typeId) {
  const response = await send(`/api/content/${typeId}`)
  if (!response.ok) throw new Error(`Could not load ${typeId}`)
  return await response.json()
}

export async function getMeta(typeId) {
  const response = await send(`/api/content/${typeId}/meta`)
  if (!response.ok) return { savedAt: null, savedBy: null }
  return await response.json()
}

export async function putContent(typeId, value) {
  const response = await send(`/api/content/${typeId}`, {
    method: 'PUT',
    body: JSON.stringify(value),
  })

  if (response.status === 422) {
    return { ok: false, errors: (await response.json()).errors }
  }
  if (response.status === 401) {
    return { ok: false, errors: [{ index: null, field: null, message: 'Your login has expired. Reload the page and sign in again.' }] }
  }
  if (!response.ok) {
    return { ok: false, errors: [{ index: null, field: null, message: `The server refused the save (${response.status}).` }] }
  }

  return { ok: true, ...(await response.json()) }
}

export async function logout() {
  await send('/auth/logout', { method: 'POST' })
}
