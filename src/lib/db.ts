import mongoose from "mongoose";
import dns from "node:dns";
import { getEnv } from "@/lib/env";
import { forceDbUri } from "@/lib/mongoUri";

// Local DNS is often 127.0.0.1 (dead) — mongodb+srv SRV then fails with
// ECONNREFUSED. Always force public DNS before connecting (idempotent).
const PUBLIC_DNS = ["8.8.8.8", "1.1.1.1", "192.168.1.1"];

function ensurePublicDns() {
  try {
    // Unconditional set — system/config can flip back to localhost
    dns.setServers(PUBLIC_DNS);
  } catch {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {
      // ignore
    }
  }
}

ensurePublicDns();

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // Persists the connection across HMR re-executions in dev mode
  var _mongoose: Cached | undefined;
}

// Reuse the existing connection object across module re-imports (connection pooling)
const cached: Cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB() {
  const { MONGO_URI, USE_DATABASE } = getEnv();

  // USE_DATABASE=false lets the app boot without a DB (e.g., for UI-only dev work)
  if (USE_DATABASE === "false") {
    return null;
  }

  // Return existing connection if it's still alive
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  ensurePublicDns();

  // Initiate connection only once; subsequent callers await the same promise
  if (!cached.promise) {
    // Always force the database name to dailytopnews-db — strips any other name
    const uri = forceDbUri(MONGO_URI);

    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false, // Fail fast instead of queuing commands when not connected
        serverSelectionTimeoutMS: 10000,
      })
      .catch((err) => {
        // Clear failed promise so the next request can retry (e.g. after DNS blip)
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
