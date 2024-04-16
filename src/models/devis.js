import mongoose, { Schema, models } from "mongoose";

const devisSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
const devisModel = models.devis || mongoose.model("devis", devisSchema);

export default devisModel;
