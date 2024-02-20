import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    surname: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
