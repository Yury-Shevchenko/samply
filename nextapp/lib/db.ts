import mongoose from "mongoose";

const uri = process.env.DATABASE!;

// Reuse the connection across hot-reloads in development.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) return mongoose;
  if (global._mongooseConn) return global._mongooseConn;

  global._mongooseConn = mongoose.connect(uri);
  return global._mongooseConn;
}

export default connectDB;
