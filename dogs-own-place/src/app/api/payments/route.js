import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Payment from '@/models/Payment'
import Appointment from '@/models/Appointment'
import { requireAuth } from '@/lib/auth'

// GET /api/payments — user's payment history
export async function GET(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error
    await connectDB()
    const payments = await Payment.find({ user: user.id })
      .populate('appointment', 'serviceName date time plan')
      .sort({ createdAt: -1 })
    return NextResponse.json({ payments })
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}

// POST /api/payments — create a mock/demo payment & mark appointment paid
export async function POST(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error
    await connectDB()
    const { appointmentId, amount, method } = await request.json()

    if (!appointmentId || !amount) {
      return NextResponse.json({ error: 'appointmentId and amount required' }, { status: 400 })
    }

    // Verify appointment belongs to user
    const appt = await Appointment.findOne({ _id: appointmentId, user: user.id })
    if (!appt) return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })

    // Create payment record
    const txnId = 'TXN' + Date.now().toString(36).toUpperCase()
    const payment = await Payment.create({
      user: user.id,
      appointment: appointmentId,
      amount,
      method: method || 'mock',
      status: 'success',
      txnId,
      paidAt: new Date(),
    })

    // Mark appointment as paid
    await Appointment.findByIdAndUpdate(appointmentId, {
      paymentStatus: 'paid',
      paymentId: payment._id,
    })

    return NextResponse.json({ success: true, payment, txnId }, { status: 201 })
  } catch (err) {
    console.error('POST /api/payments:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
