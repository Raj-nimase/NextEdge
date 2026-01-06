import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./src/Admin/admin.model.js";
import readline from "readline";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Get admin details from user
    const username = await question("Enter username: ");
    const email = await question("Enter email: ");
    const password = await question("Enter password: ");

    if (!username || !email || !password) {
      console.log("❌ All fields are required!");
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      console.log("❌ Admin with this username or email already exists!");
      console.log("Existing username:", existingAdmin.username);
      console.log("Existing email:", existingAdmin.email);
      process.exit(1);
    }

    // Create new admin
    const admin = await Admin.create({
      username,
      email,
      password, // Will be hashed automatically by the model
    });

    console.log("\n✅ Admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Username:", admin.username);
    console.log("Email:", admin.email);
    console.log("Password:", password, "(use this to login)");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
