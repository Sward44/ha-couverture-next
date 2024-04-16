import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    name: { type: String },
    enterprise: { type: String },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    done: { type: Boolean, default: false },
    mobile: { type: String },
    home: { type: String },
    adress: { type: String },
    code_postale: { type: String },
    ville: { type: String },
    password: { type: String },
    image_logo: { type: String },
  },
  { timestamps: true }
);

const UserModel = models.user || mongoose.model("user", userSchema);

export default UserModel;
