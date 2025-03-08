import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  console.log("No DB Found");
}

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI,{keepAlive:true});
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
