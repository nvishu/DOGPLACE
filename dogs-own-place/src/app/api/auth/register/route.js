import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { signToken } from '@/lib/auth'

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const { name, email, password, phone, city, address } = body

    // Validate
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Check duplicate
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    // Create user
    const user = await User.create({ name, email, password, phone, city, address })

    // Sign JWT
    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: user.toSafeObject(),
      token,
    }, { status: 201 })

    // Also set as HTTP-only cookie
    response.cookies.set('dop_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
