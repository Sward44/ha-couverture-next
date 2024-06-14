import mongoose, { Schema, models } from "mongoose";

const AccountSchema = new Schema({
  id: { type: Schema.ObjectId },
  userId: { type: Schema.ObjectId, ref: "user" },
  provider: { type: String, default: "hacouverture" },
  type: { type: String, default: "credentials" },
  providerAccountId: { type: String },
  access_token: { type: String },
  expire_at: { type: Date },
  scope: { type: String, default: "all" },
  id_token: { type: String },
},{ timestamps: true });

const AccountModel = models.account || mongoose.model("account", AccountSchema);

export default AccountModel;
