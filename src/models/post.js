import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    review_title: { type: String, required: true },
    review_text: { type: String, required: true },
    owner_reponse: { type: Boolean },
    owner_answer: { type: String },
    owner_answer_timestamp: {
      type: Date,
      default: Date.now($$CLUSTER_TIME),
    },
    owner_answer_timestamp_datetime_utc: {
      type: Date,
      default: Date.now($ISODate),
    },
    review_rating: { type: Number, required: true },
    review_timestamp: {
      type: Date,
      default: Date.now($$CLUSTER_TIME),
    },
    review_datetime_utc: {
      type: Date,
      default: Date.now($ISODate),
    },
  },
  { timestamps: true }
);

export default mongoose.models.post || mongoose.model("post", postSchema);
