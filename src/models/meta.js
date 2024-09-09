import mongoose, { Schema, models } from "mongoose";

const metaSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icons: {
      icon: { type: String },
      shortcut: { type: String },
      android: { type: String },
      apple: { type: String },
    },
    openGraph: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String },
      type: { type: String },
      images: {
        url: { type: String },
        alt: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    },
    manifest: { type: String },
  },
  { timestamps: true }
);

const MetaModel = models.meta || mongoose.model("meta", metaSchema);

export default MetaModel;
