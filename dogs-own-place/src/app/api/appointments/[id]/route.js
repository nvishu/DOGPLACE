import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'
import { requireAuth } from '@/lib/auth'

export async function GET(request, { params }) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error
    await connectDB()
    const appt = await Appointment.findOne({ _id: params.id, user: user.id })
      .populate('dog', 'name breed image')
    if (!appt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ appointment: appt })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function PATCH(request, { params }) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error
    await connectDB()
    const body = await request.json()
    const allowedFields = user.role === 'admin'
      ? body
      : { status: 'cancelled', cancelReason: body.cancelReason || '' }
    const appt = await Appointment.findOneAndUpdate(
      { _id: params.id, user: user.id },
      allowedFields,
      { new: true }
    )
    if (!appt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, appointment: appt })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
