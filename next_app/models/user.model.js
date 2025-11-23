import { users } from "@/constants/model.constants";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ModelSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "moderator"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const userModel =
  mongoose.models?.[users] || mongoose.model(users, ModelSchema);

export default userModel;
