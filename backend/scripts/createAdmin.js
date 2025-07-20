import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ENV_VARS } from "../config/envVars.js";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";


await connectDB();

async function createAdminIfNotExists() {
  const existingAdmin = await User.findOne({ email: "admin@rmd.ac.in" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin@123", 10);
    const adminUser = new User({
      username: "admin",
      email: "admin@rmd.ac.in",
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
}

createAdminIfNotExists();