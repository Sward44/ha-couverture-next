import mongoose, { Schema, models } from "mongoose";

delete mongoose.connection.models['blog'];

const blogSchema = new Schema(
  {
    title: { type: String },
    description: {type: String},
    urlWebp: {type: String },
    altWebp: {type: String },
    url: {type: String},
  },
    { timestamps: true }
);

const BlogModel = models.blog || mongoose.model("blog", blogSchema);

export default BlogModel;