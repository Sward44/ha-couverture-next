import mongoose, { Schema, models } from "mongoose";

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    devisId: { type: Schema.Types.ObjectId, ref: "devis" },
    address: { type: String }, 
    code_postal: { type: String },
    ville: { type: String },
  }
);

const AddressModel = models.address || mongoose.model("address", addressSchema);

export default AddressModel;
