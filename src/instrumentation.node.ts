import dns from "node:dns";

// Local DNS is often 127.0.0.1 (dead) — mongodb+srv SRV then fails with ECONNREFUSED.
export function applyPublicDns() {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "192.168.1.1"]);
    if (process.env.NODE_ENV !== "production") {
      console.log("[instrumentation] DNS servers →", dns.getServers());
    }
  } catch (err) {
    console.warn("[instrumentation] failed to set DNS servers:", err);
  }
}

applyPublicDns();
