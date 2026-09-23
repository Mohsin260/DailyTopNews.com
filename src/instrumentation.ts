/**
 * Runs once when the Next.js server starts (Node runtime).
 * Local DNS is often 127.0.0.1 (dead) which breaks mongodb+srv SRV lookups.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  await import("./instrumentation.node");
}
