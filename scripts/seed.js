/* Usage:
 *   npm run seed            -> creates/updates the admin user from .env.local
 */
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env.local first.");
  }
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const now = new Date();

  await db.collection("admins").updateOne(
    { email: ADMIN_EMAIL.toLowerCase().trim() },
    {
      $set: { passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12), updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  console.log("Admin ready:", ADMIN_EMAIL);
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e.message); process.exit(1); });
