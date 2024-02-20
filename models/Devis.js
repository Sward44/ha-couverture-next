import mongoose from "mongoose";

const { Schema } = mongoose;

const devisSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Devis || mongoose.model("Devis", userSchema);
