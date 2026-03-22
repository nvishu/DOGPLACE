import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { requireAdmin } from '@/lib/auth'

export async function GET(request) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const query = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : {}
    const users = await User.find(query).select('-password').sort({ createdAt: -1 })
    return NextResponse.json({ users })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function PATCH(request) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const { userId, isActive } = await request.json()
    const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true }).select('-password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ success: true, user })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function DELETE(request) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const { userId } = await request.json()
    await User.findByIdAndDelete(userId)
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
