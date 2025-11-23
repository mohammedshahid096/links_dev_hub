// lib/userHelpers.js
"use server";
import userModel from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import connectDB from "../config/mongodb.config";

// Get current user from database using Clerk auth
export async function getCurrentUser() {
  try {
    const details = await auth();
    // console.log(details);
    const userId = details?.userId;

    if (!userId) {
      return null;
    }

    await connectDB();
    const user = await userModel.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

// Get user by Clerk ID
export async function getUserByClerkId(clerkId) {
  try {
    await connectDB();
    const user = await userModel.findOne({ clerkId });
    return user;
  } catch (error) {
    console.error("Error fetching user by Clerk ID:", error);
    return null;
  }
}

// Get user by email
export async function getUserByEmail(email) {
  try {
    await connectDB();
    const user = await userModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

// Update user role
export async function updateUserRole(clerkId, role) {
  try {
    await connectDB();
    const user = await userModel.findOneAndUpdate(
      { clerkId },
      { role },
      { new: true }
    );
    return user;
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
}
