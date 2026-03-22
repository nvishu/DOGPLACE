import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Dog from '@/models/Dog'
import { requireAuth } from '@/lib/auth'

// GET /api/dogs/[id]
export async function GET(request, { params }) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const dog = await Dog.findOne({ _id: params.id, owner: user.id })
    if (!dog) return NextResponse.json({ error: 'Dog not found' }, { status: 404 })

    return NextResponse.json({ dog })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH /api/dogs/[id]
export async function PATCH(request, { params }) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const body = await request.json()

    const dog = await Dog.findOneAndUpdate(
      { _id: params.id, owner: user.id },
      body,
      { new: true }
    )
    if (!dog) return NextResponse.json({ error: 'Dog not found' }, { status: 404 })

    return NextResponse.json({ success: true, dog })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE /api/dogs/[id]
export async function DELETE(request, { params }) {
  try {
    const { user, error } = await requireAuth(request)
    if (error) return error

    await connectDB()
    const dog = await Dog.findOneAndDelete({ _id: params.id, owner: user.id })
    if (!dog) return NextResponse.json({ error: 'Dog not found' }, { status: 404 })

    return NextResponse.json({ success: true, message: 'Dog profile deleted' })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
