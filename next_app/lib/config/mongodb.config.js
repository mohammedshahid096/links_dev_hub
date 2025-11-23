import mongoose from "mongoose";

let cached = global?.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  try {
    console.log("MongoDB connected successfully");
    if (cached.conn) return cached.conn;
    const url =
      process.env.MODE === "development"
        ? process.env.DB_DEV_URL
        : process.env.DB_URL;
    cached.promise = cached.promise || mongoose.connect(url);
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.log(error, "connection db Error");
  }
};

export default connectDB;
