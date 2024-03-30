import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    surname: { type: String },
    name: { type: String },
    enterprise: { type: String },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean },
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

export default mongoose.models.user || mongoose.model("user", userSchema);
