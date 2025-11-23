import { categories, webUrls } from "@/constants/model.constants";
import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    planType: { type: String, enum: ["free", "paid", "both"], default: "free" },
    github: {
      stars: { type: Number, default: null },
      url: { type: String, default: null },
    },
    sourceType: { type: String, enum: ["website", "npm"], default: "website" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: categories }],
    keywords: [{ type: String }],
    scrappedData: {},
    urlImage: { type: String, default: "" },
    urlIcon: { type: String, default: "" },
  },
  { timestamps: true }
);

const urlModel =
  mongoose.models?.[webUrls] || mongoose.model(webUrls, ModelSchema);

export default urlModel;
