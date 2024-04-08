import mongoose from "mongoose";

const { Schema } = mongoose;

const pageSchema = new Schema([
  {
    title: { type: String },
    urlWebp: { type: String },
    position: { type: String },
    altWebp: { type: String },
    urlSvg: { type: String },
    altSvg: { type: String },
    width: { type: String },
    height: { type: String },
  },
]);

export default mongoose.models.page || mongoose.model("page", pageSchema);
