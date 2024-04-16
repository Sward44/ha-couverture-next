import mongoose, { Schema, models } from "mongoose";

const homePageSchema = new Schema(
  [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      urlWebp: { type: String, required: true },
      position: { type: String },
      altWebp: { type: String, required: true },
      urlSvg: { type: String, required: true },
      altSvg: { type: String, required: true },
      height: { type: Number, required: true },
      width: { type: Number, required: true },
      url: { type: String, required: true },
    },
  ],
  { timestamps: true }
);

const HomePageModel =
  models.homepage || mongoose.model("homepage", homePageSchema);

export default HomePageModel;
