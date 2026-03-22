import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'
import Dog from '@/models/Dog'
import { requireAuth } from '@/lib/auth'

// GET /api/appointments
export async function GET(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const appointments = await Appointment
      .find({ user: user.id })
      .populate('dog', 'name breed image')
      .sort({ createdAt: -1 })

    return NextResponse.json({ appointments })
  } catch (err) {
    console.error('GET /api/appointments:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/appointments — book a new appointment
export async function POST(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const body = await request.json()
    const {
      serviceId, serviceName, dogId, plan,
      date, time, notes, address, homeVisit, price
    } = body

    if (!serviceId || !date || !time || !price) {
      return NextResponse.json({ error: 'Service, date, time and price are required' }, { status: 400 })
    }

    // Get dog name if dogId provided
    let dogName = ''
    if (dogId) {
      const dog = await Dog.findOne({ _id: dogId, owner: user.id })
      dogName = dog?.name || ''
    }

    const appointment = await Appointment.create({
      user: user.id,
      dog: dogId || undefined,
      dogName,
      serviceId, serviceName, plan,
      date, time, notes, address,
      homeVisit: homeVisit || false,
      price,
      status: 'confirmed',
      paymentStatus: 'unpaid',
    })

    return NextResponse.json({ success: true, appointment }, { status: 201 })
  } catch (err) {
    console.error('POST /api/appointments:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
