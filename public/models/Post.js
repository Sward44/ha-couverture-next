import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
