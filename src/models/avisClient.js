import mongoose, { Schema, models } from "mongoose";

const avisClientSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: Number, required: true },
    date_review: { type: Date, default: Date.now }, 
  }
);

const AvisClientModel = models.avisClient || mongoose.model("avisClient", avisClientSchema);

export default AvisClientModel;
