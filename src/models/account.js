import mongoose, { Schema, models } from "mongoose";

const AccountSchema = new Schema({
  id: { type: Schema.ObjectId },
  userId: { type: Schema.ObjectId, ref: "user" },
  provider: { type: String, default: "hacouverture" },
  type: { type: String, default: "credentials" },
  providerAccountId: { type: String },
  access_token: { type: String },
  scope: { type: String, default: "all" },
});

const AccountModel = models.account || mongoose.model("account", AccountSchema);

export default AccountModel;
