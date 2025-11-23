import { users, categories } from "@/constants/model.constants";
import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    name: { type: String, lowercase: true, required: true },
    description: { type: String, default: null },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
      required: true,
    },
  },
  { timestamps: true }
);

const categoryModel =
  mongoose.models?.[categories] || mongoose.model(categories, ModelSchema);

export default categoryModel;
