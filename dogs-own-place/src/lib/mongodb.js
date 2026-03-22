import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local')

let cached = global.mongoose
if (!cached) cached = global.mongoose = { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).then(m => { console.log('✅ MongoDB connected:', m.connection.host); return m })
  }
  try { cached.conn = await cached.promise }
  catch (e) { cached.promise = null; throw e }
  return cached.conn
}

export default connectDB
