import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

export function verifyToken(token) {
  try { return jwt.verify(token, JWT_SECRET) }
  catch { return null }
}

export function getTokenFromRequest(request) {
  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  const cookie = request.cookies?.get('dop_token')?.value
  return cookie || null
}

export async function requireAuth(request) {
  const token = getTokenFromRequest(request)
  if (!token) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const decoded = verifyToken(token)
  if (!decoded) return { error: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }) }
  return { user: decoded }
}

export async function requireAdmin(request) {
  const { user, error } = await requireAuth(request)
  if (error) return { error }
  if (user.role !== 'admin') return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  return { user }
}
