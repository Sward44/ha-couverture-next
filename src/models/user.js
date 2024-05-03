import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String },
    role: { type: String, default: "user" },
    emailVerified: { type: Date, default: false },
    // enterprise: { type: String },
    // done: { type: Boolean, default: false },
    // mobile: { type: String },
    // home: { type: String },
    // adress: { type: String },
    // code_postale: { type: String },
    // ville: { type: String },
    // password: { type: String },
  }
  // { timestamps: true }
);

const UserModel = models.user || mongoose.model("user", userSchema);

export default UserModel;
