import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    review_title: { type: String, required: true },
    review_text: { type: String, required: true },
    owner_reponse: { type: Boolean },
    owner_answer: { type: String },
    owner_answer_timestamp: {
      type: Date,
      default: Date.now(),
    },
    owner_answer_timestamp_datetime_utc: {
      type: Date,
      default: Date.now(),
    },
    review_rating: { type: Number, required: true },
    review_timestamp: {
      type: Date,
      default: Date.now(),
    },
    review_datetime_utc: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const PostModel = models.post || mongoose.model("post", postSchema);

export default PostModel;
