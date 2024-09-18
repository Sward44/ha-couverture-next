import mongoose, { Schema, models } from 'mongoose';

// delete mongoose.connection.models['images'];

const imageSchema = new Schema({
  id: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: "UserModel" },
  devisId: { type: mongoose.Types.ObjectId, ref: "DevisModel" },
  pictureId: { type: String, unique: true },
  extension: { type: String },
  size: { type: Number},
  type: { type: String },
  name: { type: String },
  preview: { type: String },
  lastModified: { type: Number },
}, { timestamps: true });

const ImageModel = models.images || mongoose.model('images', imageSchema);

export default ImageModel;