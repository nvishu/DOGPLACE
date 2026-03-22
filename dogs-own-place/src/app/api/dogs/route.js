import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Dog from '@/models/Dog'
import { requireAuth } from '@/lib/auth'

// GET /api/dogs — get all dogs for logged-in user
export async function GET(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const dogs = await Dog.find({ owner: user.id }).sort({ createdAt: -1 })
    return NextResponse.json({ dogs })
  } catch (err) {
    console.error('GET /api/dogs:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/dogs — create a new dog profile
export async function POST(request) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const body = await request.json()
    const { name, breed, age, weight, gender, color, microchip, healthNotes, image } = body

    if (!name || !breed) {
      return NextResponse.json({ error: 'Dog name and breed are required' }, { status: 400 })
    }

    const dog = await Dog.create({
      owner: user.id,
      name, breed, age, weight, gender,
      color, microchip, healthNotes, image,
    })

    return NextResponse.json({ success: true, dog }, { status: 201 })
  } catch (err) {
    console.error('POST /api/dogs:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
