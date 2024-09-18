import mongoose, { Schema, models } from "mongoose";

// delete mongoose.connection.models['addresses'];

const addressSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    // devisId: { type: mongoose.Types.ObjectId, ref: "DevisModel" },
    address: { type: String }, 
    code_postal: { type: String },
    ville: { type: String },
  }, 
  { strict: false }
);

const AddressModel = models.address || mongoose.model("address", addressSchema);

export default AddressModel;
