/**
 * Shared connection helper for standalone scripts in src/scripts/.
 * Loads .env, forces the database name to dailytopnews-db, connects,
 * and HARD-FAILS if the connection lands on any other database.
 */
import { config } from "dotenv";
import { resolve } from "path";
import dns from "dns";
import mongoose from "mongoose";
import { forceDbUri, DB_NAME } from "@/lib/mongoUri";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local") });

// Local DNS on 127.0.0.1 often dies (VPN/proxy). Fall back to public DNS
// so mongodb+srv SRV lookups don't fail with ECONNREFUSED.
try {
  const current = dns.getServers();
  const looksBroken =
    current.length === 0 ||
    current.every((s) => s === "127.0.0.1" || s === "::1");
  if (looksBroken) {
    dns.setServers(["8.8.8.8", "1.1.1.1", "192.168.1.1"]);
    console.log("[_db] local DNS was dead/empty — using 8.8.8.8, 1.1.1.1");
  }
} catch {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export { forceDbUri, DB_NAME };

export async function connectScript(label = "script"): Promise<typeof mongoose> {
  const uri = forceDbUri(process.env.MONGO_URI);
  console.log(`[${label}] connecting to database: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
  const name = mongoose.connection.db?.databaseName;
  if (name !== DB_NAME) {
    console.error(`[${label}] FATAL: connected to "${name}" — expected "${DB_NAME}"`);
    process.exit(1);
  }
  console.log(`[${label}] connected to: ${name}`);
  return mongoose;
}
