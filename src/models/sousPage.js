import mongoose from "mongoose";

const { Schema } = mongoose;

const sousPageSchema = new Schema([
  {
    index: { type: Number },
    title: { type: String },
    description: { type: String },
    urlWebp: { type: String },
    altWebp: { type: String },
    position: { type: String },
    _pageId: { type: mongoose.Schema.Types.ObjectId, ref: "page" },
  },
]);

export default mongoose.models.souspage ||
  mongoose.model("souspage", sousPageSchema);
