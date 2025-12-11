import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  console.log("Mongo URI:", uri); // debug

  if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");

  try {
    await mongoose.connect(uri); // ✅ no options needed in Mongoose 7+
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
