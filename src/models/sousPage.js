import mongoose, { Schema, models } from "mongoose";

// delete mongoose.connection.models['souspage'];

const sousPageSchema = new Schema([
  {
    index: { type: Number },
    title: { type: String },
    description: { type: String },
    urlWebp: { type: String },
    altWebp: { type: String },
    position: { type: String },
    _pageId: { type: mongoose.Schema.Types.ObjectId, ref: "page" },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
  },
]);

const SousPage = models.souspage || mongoose.model("souspage", sousPageSchema);

export default SousPage;
