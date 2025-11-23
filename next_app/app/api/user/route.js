import connectDB from "@/lib/config/mongodb.config";
import { getCurrentUser } from "@/lib/helpers/user.helper";
import userModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, statusCode: 404, message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ user });
}

export async function POST(request) {
  await connectDB();
  const newUser = new userModel({
    clerkId: "user_3133CZQbVFBG0mUiT1HdCckOfAD",
    email: "www.mohdshahid303@gmail.com",
    firstName: "",
    lastName: "",
    username: "",
    imageUrl:
      "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18zMGxXdW90b1FyUDFCTjBwRm1SOWxHSVJaREciLCJyaWQiOiJ1c2VyXzMxMzNDWlFiVkZCRzBtVWlUMUhkQ2NrT2ZBRCJ9",
    role: "admin",
  });

  // await newUser.save();

  return NextResponse.json({ user: newUser });
}
