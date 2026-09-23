import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { User } from "../lib/models/User";
import path from "path";
import { forceDbUri, DB_NAME } from "./_db";

// Load environment variables from .env.local or .env
config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

async function createAdmin() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  const email = process.argv[2] || "admin@Dailytopnews.com";
  const password = process.argv[3] || "Admin123!";
  const name = process.argv[4] || "Primary Administrator";

  try {
    console.log(`⏳ Connecting to database (${DB_NAME})...`);
    await mongoose.connect(forceDbUri(uri));
    console.log(`✅ Connected to: ${mongoose.connection.db?.databaseName}`);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`⚠️ User with email ${email} already exists.`);
      
      if (!existing.roles.includes("admin")) {
        console.log(`⏳ Promoting existing user to admin...`);
        existing.roles.push("admin");
        await existing.save();
        console.log(`✅ User promoted successfully.`);
      } else {
        console.log(`ℹ️ User is already an administrator.`);
      }
      
      process.exit(0);
    }

    console.log(`⏳ Hashing password...`);
    const passwordHash = await bcrypt.hash(password, 12);

    console.log(`⏳ Creating admin user...`);
    await User.create({
      name,
      email,
      passwordHash,
      roles: ["admin"],
      isActive: true
    });

    console.log(`
✅ SUCCESS: Administrative user created!
---------------------------------------
Email: ${email}
Password: ${password}
---------------------------------------
Please login at /auth/signin and change your password immediately.
    `);

  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
