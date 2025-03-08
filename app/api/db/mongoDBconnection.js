import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  console.log("No DB Found");
}

// let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  // if (cached.conn) {
  //   return cached.conn;
  // }

  // if (!cached.promise) {
  //   cached.promise = mongoose.connect(MONGODB_URI);
  // }
  // cached.conn = await cached.promise;
  // return cached.conn;
  mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));
}

export default dbConnect;
