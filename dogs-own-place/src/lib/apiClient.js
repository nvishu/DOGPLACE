/**
 * Central API client for Dog's Own Place
 * Automatically attaches the JWT token to every request.
 * Used by every page and component — no more localStorage data calls.
 */

const BASE = ''

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('dop_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  }
  const res = await fetch(BASE + path, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ── Auth ──────────────────────────────────────────────────────────────────

export async function apiRegister(body) {
  const data = await request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) })
  if (data.token) {
    localStorage.setItem('dop_token', data.token)
    localStorage.setItem('dop_user', JSON.stringify(data.user))
  }
  return data
}

export async function apiLogin(body) {
  const data = await request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) })
  if (data.token) {
    localStorage.setItem('dop_token', data.token)
    localStorage.setItem('dop_user', JSON.stringify(data.user))
  }
  return data
}

export function apiLogout() {
  localStorage.removeItem('dop_token')
  localStorage.removeItem('dop_user')
}

export async function apiGetMe() {
  return request('/api/auth/me')
}

// ── Dogs ─────────────────────────────────────────────────────────────────

export async function apiGetDogs() {
  return request('/api/dogs')
}

export async function apiGetDog(id) {
  return request(`/api/dogs/${id}`)
}

export async function apiCreateDog(body) {
  return request('/api/dogs', { method: 'POST', body: JSON.stringify(body) })
}

export async function apiUpdateDog(id, body) {
  return request(`/api/dogs/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
}

export async function apiDeleteDog(id) {
  return request(`/api/dogs/${id}`, { method: 'DELETE' })
}

// ── Appointments ─────────────────────────────────────────────────────────

export async function apiGetAppointments() {
  return request('/api/appointments')
}

export async function apiCreateAppointment(body) {
  return request('/api/appointments', { method: 'POST', body: JSON.stringify(body) })
}

export async function apiCancelAppointment(id, cancelReason = '') {
  return request(`/api/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'cancelled', cancelReason }),
  })
}

// ── Payments ─────────────────────────────────────────────────────────────

export async function apiGetPayments() {
  return request('/api/payments')
}

export async function apiCreatePayment(body) {
  return request('/api/payments', { method: 'POST', body: JSON.stringify(body) })
}

// ── Admin ────────────────────────────────────────────────────────────────

export async function apiAdminStats() {
  return request('/api/admin/stats')
}

export async function apiAdminUsers(search = '') {
  return request(`/api/admin/users${search ? `?search=${search}` : ''}`)
}

export async function apiAdminToggleUser(userId, isActive) {
  return request('/api/admin/users', { method: 'PATCH', body: JSON.stringify({ userId, isActive }) })
}

export async function apiAdminDeleteUser(userId) {
  return request('/api/admin/users', { method: 'DELETE', body: JSON.stringify({ userId }) })
}

export async function apiAdminBookings(status = 'all') {
  return request(`/api/admin/bookings?status=${status}`)
}

export async function apiAdminUpdateBooking(bookingId, status) {
  return request('/api/admin/bookings', { method: 'PATCH', body: JSON.stringify({ bookingId, status }) })
}
