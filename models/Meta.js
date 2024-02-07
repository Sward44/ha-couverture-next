import mongoose from "mongoose";

const { Schema } = mongoose;

const metaSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icons: {
      icon: { type: String, required: true },
      shortcut: { type: String, required: true },
      android: { type: String, required: true },
      apple: { type: String, required: true },
    },
    openGraph: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String },
      type: { type: String, required: true },
      images: {
        url: { type: String },
        alt: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    },
    manifest: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Meta || mongoose.model("Meta", metaSchema);
