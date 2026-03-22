import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // ── Check hardcoded admin first (no DB hit needed) ──────
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email.toLowerCase() === adminEmail?.toLowerCase()) {
      if (password !== adminPassword) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
      }
      const token = signToken({ id: 'admin', email: adminEmail, name: 'Admin', role: 'admin' })
      const adminUser = { _id: 'admin', name: 'Admin', email: adminEmail, role: 'admin', city: 'HQ' }

      const response = NextResponse.json({ success: true, user: adminUser, token })
      response.cookies.set('dop_token', token, {
        httpOnly: true, secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
      })
      return response
    }

    // ── Regular user login ───────────────────────────────────
    await connectDB()
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    if (!user.isActive) {
      return NextResponse.json({ error: 'Account is deactivated. Contact support.' }, { status: 403 })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      user: user.toSafeObject(),
      token,
    })

    response.cookies.set('dop_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
