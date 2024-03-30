import mongoose from "mongoose";

const { Schema } = mongoose;

const pageSchema = new Schema(
  [
    {
      _id: { type: String, unique: true, required: true },
      title: { type: String, required: true },
      description: [
        {
          _id: { type: String, unique: true, required: true },
          index: { type: Number, required: true, unique: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          urlWebp: { type: String, required: true },
          altWebp: { type: String, required: true },
          position: { type: String, required: true },
        },
      ],
      urlWebp: { type: String, required: true },
      position: { type: String, required: true },
      altWebp: { type: String, required: true },
      urlSvg: { type: String, required: true },
      altSvg: { type: String, required: true },
      width: { type: String, required: true },
      height: { type: String, required: true },
    },
  ],
  { timestamps: true }
);

export default mongoose.models.page || mongoose.model("page", pageSchema);
