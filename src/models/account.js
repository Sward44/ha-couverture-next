import mongoose, { Schema, models } from "mongoose";

const AccountSchema = new Schema(
  {
    id: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    provider: { type: String, default: "hacouverture" },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expire_at: { type: Number },
    token_type: { type: String, default: "Bearer" },
    scope: { type: String, default: "all" },
    id_token: { type: String },
    session_state: { type: String },
  },
  { timestamps: true }
);

const AccountModel = models.account || mongoose.model("account", AccountSchema);

export default AccountModel;
