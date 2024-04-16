import mongoose, { Schema, models } from "mongoose";

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

const PageModel = models.page || mongoose.model("page", pageSchema);

export default PageModel;
