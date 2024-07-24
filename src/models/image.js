import mongoose, { Schema, models } from 'mongoose';

const imageSchema = new Schema({
  id: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: "UserModel" },
  devisId: { type: mongoose.Types.ObjectId, ref: "DevisModel" },
  pictureId: { type: String, unique: true },
  size: { type: Number},
  type: { type: String },
  name: { type: String },
  preview: { type: String },
  lastModified: { type: Number },
}, { timestamps: true });

const ImageModel = models.images || mongoose.model('images', imageSchema);

export default ImageModel;