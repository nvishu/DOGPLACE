import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { requireAuth } from '@/lib/auth'

export async function GET(request) {
  try {
    const { user: decoded, error } = await requireAuth(request)
    if (error) return error

    // Admin has no DB record
    if (decoded.role === 'admin') {
      return NextResponse.json({ user: { _id: 'admin', name: 'Admin', email: decoded.email, role: 'admin', city: 'HQ' } })
    }

    await connectDB()
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { user: decoded, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const body = await request.json()
    const { name, phone, city, address } = body

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { name, phone, city, address },
      { new: true, select: '-password' }
    )
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
