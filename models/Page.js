import mongoose from "mongoose";

const { Schema } = mongoose;

const pageSchema = new Schema(
  [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
      alt: { type: String, required: true },
      position: { type: Number, required: true },
    },
  ],
  { timestamps: true }
);

export default mongoose.models.page || mongoose.model("page", pageSchema);
