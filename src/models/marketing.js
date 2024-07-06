import mongoose, { Schema, models } from "mongoose";

const marketingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    marketing: { type: Boolean },
  }
);

const MarketingModel = models.marketing || mongoose.model("marketing", marketingSchema);

export default MarketingModel;
