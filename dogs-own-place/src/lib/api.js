// ─── Central API utility ────────────────────────────────────────────────────
// All calls go through here so token handling is consistent everywhere.

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('dop_token')
}

async function apiFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Something went wrong')
  return data
}

// ── Auth ─────────────────────────────────────────────────────────────────────
export async function apiRegister(payload) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (data.token) localStorage.setItem('dop_token', data.token)
  if (data.user)  localStorage.setItem('dop_user', JSON.stringify(data.user))
  return data
}

export async function apiLogin(email, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  if (data.token) localStorage.setItem('dop_token', data.token)
  if (data.user)  localStorage.setItem('dop_user', JSON.stringify(data.user))
  return data
}

export function apiLogout() {
  localStorage.removeItem('dop_token')
  localStorage.removeItem('dop_user')
}

export async function apiGetMe() {
  return apiFetch('/api/auth/me')
}

// ── Dogs ─────────────────────────────────────────────────────────────────────
export async function apiGetDogs() {
  return apiFetch('/api/dogs')
}

export async function apiCreateDog(payload) {
  return apiFetch('/api/dogs', { method: 'POST', body: JSON.stringify(payload) })
}

export async function apiUpdateDog(id, payload) {
  return apiFetch(`/api/dogs/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
}

export async function apiDeleteDog(id) {
  return apiFetch(`/api/dogs/${id}`, { method: 'DELETE' })
}

// ── Appointments ─────────────────────────────────────────────────────────────
export async function apiGetAppointments() {
  return apiFetch('/api/appointments')
}

export async function apiCreateAppointment(payload) {
  return apiFetch('/api/appointments', { method: 'POST', body: JSON.stringify(payload) })
}

export async function apiUpdateAppointment(id, payload) {
  return apiFetch(`/api/appointments/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
}

// ── Payments ─────────────────────────────────────────────────────────────────
export async function apiCreatePayment(payload) {
  return apiFetch('/api/payments', { method: 'POST', body: JSON.stringify(payload) })
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export async function apiAdminStats() {
  return apiFetch('/api/admin/stats')
}

export async function apiAdminUsers() {
  return apiFetch('/api/admin/users')
}

export async function apiAdminBookings() {
  return apiFetch('/api/admin/bookings')
}

export async function apiAdminUpdateUser(id, payload) {
  return apiFetch(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
}
