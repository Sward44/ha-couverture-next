import mongoose, { Schema, models } from "mongoose";

// delete mongoose.connection.models['devis'];

const devisSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    body: { type: String },
    driveFolderId: {type: String},
    done: {type: Boolean, default: false},
  },
  { timestamps: true }
);
const DevisModel = models.devis || mongoose.model("devis", devisSchema);

export default DevisModel;

// 