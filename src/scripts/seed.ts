import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/auth/password";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@Dailytopnews.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";
  const name = process.env.SEED_ADMIN_NAME ?? "Primary Administrator";

  await connectDB();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed] admin exists: ${email}`);
    return;
  }
  const passwordHash = await hashPassword(password);
  await User.create({
    name,
    email,
    passwordHash,
    roles: ["super_admin"],
    isActive: true,
  });
  console.log(`[seed] created admin: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

