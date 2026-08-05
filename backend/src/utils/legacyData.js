import bcrypt from "bcryptjs";
import Note from "../models/Note.js";
import User from "../models/User.js";

const LEGACY_USERNAME = process.env.LEGACY_USERNAME || "legacy-user";
const LEGACY_PASSWORD = process.env.LEGACY_PASSWORD || "legacy-user-password";

export async function ensureLegacyUserAndNotes() {
  let legacyUser = await User.findOne({ username: LEGACY_USERNAME });

  if (!legacyUser) {
    const hashedPassword = await bcrypt.hash(LEGACY_PASSWORD, 10);
    legacyUser = await User.create({
      username: LEGACY_USERNAME,
      password: hashedPassword,
    });
  }

  await Note.updateMany(
    {
      $or: [{ userId: { $exists: false } }, { userId: null }],
    },
    {
      $set: { userId: legacyUser._id },
    }
  );

  return legacyUser;
}