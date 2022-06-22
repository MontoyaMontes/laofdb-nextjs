import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    console.log("---Intentando conexión...");

    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    console.log("---Conexión éxitosa a base de datos LAOF---");
    return cached.conn;
  } catch (error) {
    console.log("Error en conexión", error);
  }
}

export default dbConnect;
