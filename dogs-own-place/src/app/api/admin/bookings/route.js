import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'
import Payment from '@/models/Payment'
import { requireAdmin } from '@/lib/auth'

export async function GET(request) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const query = status && status !== 'all' ? { status } : {}
    const [bookings, payments] = await Promise.all([
      Appointment.find(query)
        .populate('user', 'name email city phone')
        .populate('dog', 'name breed')
        .sort({ createdAt: -1 })
        .limit(100),
      Payment.find({ status: 'success' }).select('appointment amount txnId paidAt method'),
    ])
    const paymentMap = {}
    payments.forEach(p => { paymentMap[p.appointment?.toString()] = p })
    const enriched = bookings.map(b => ({
      ...b.toObject(),
      payment: paymentMap[b._id.toString()] || null,
    }))
    return NextResponse.json({ bookings: enriched })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

export async function PATCH(request) {
  try {
    const { error } = await requireAdmin(request)
    if (error) return error
    await connectDB()
    const { bookingId, status } = await request.json()
    const appt = await Appointment.findByIdAndUpdate(bookingId, { status }, { new: true })
    if (!appt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, appointment: appt })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
