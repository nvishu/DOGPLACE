import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { requireAdmin } from '@/lib/auth'

export async function PATCH(request, { params }) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const body = await request.json()
    const user = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ success: true, user })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    await User.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
