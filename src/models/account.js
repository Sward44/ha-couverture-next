import mongoose, { Schema, models } from "mongoose";

const AccountSchema = new Schema({
  id: { type: Schema.ObjectId },
  provider: { type: String, default: "Ha-Couverture" },
  type: { type: String, default: "credentials" },
  providerAccountId: { type: String, default: "782389209ej" },
  access_token: { type: String, default: "ehdhjdiuuiweuie" },
  scope: { type: String, default: "all" },
  userId: { type: Schema.ObjectId, ref: "user" },
});

const AccountModel = models.account || mongoose.model("account", AccountSchema);

export default AccountModel;
