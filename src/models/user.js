import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true}, 
    name: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    enterprise: { type: String },
    image: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    emailVerified: { type: Date, default: null },
    // done: { type: Boolean, default: false },,
    // home: { type: String },
    // adress: { type: String },
    // code_postale: { type: String },
    // ville: { type: String },
  }
  // { timestamps: true }
);

const UserModel = models.user || mongoose.model("user", userSchema);

export default UserModel;
