import * as dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import { hashPassword } from "../lib/auth/password";
import { connectScript } from "./_db";

async function forceResetPassword() {
  try {
    await connectScript("force-admin-password");
    const db = mongoose.connection.db!;
    const email = "admin@Dailytopnews.com"; // Change to your locked-out user's email if different
    const newPassword = "Password123!"; // Temporary password to login with
    
    console.log(`Looking up user: ${email}...`);
    // Use native driver to bypass Mongoose lowercase coercion
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      console.error(`User ${email} not found!`);
      process.exit(1);
    }

    console.log(`Found user: ${user.email} (${user.name})`);
    console.log(`Hashing new password...`);
    const hashed = await hashPassword(newPassword);
    
    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { passwordHash: hashed } }
    );
    
    console.log(`✅ Success! Password for ${email} has been reset to: ${newPassword}`);
    console.log(`You can now log in at /auth/signin`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error resetting password:", error);
    process.exit(1);
  }
}

forceResetPassword();
