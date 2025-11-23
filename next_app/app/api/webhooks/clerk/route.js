// app/api/webhooks/clerk/route.js (for App Router)
// OR pages/api/webhooks/clerk.js (for Pages Router)

import { Webhook } from "svix";
import { headers } from "next/headers";
import userModel from "@/models/user.model";
import connectDB from "@/lib/config/mongodb.config";

const webhookSecret = process.env.WEBHOOK_SECRET;

// export async function POST(req) {
//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occurred -- no svix headers", {
//       status: 400,
//     });
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new Svix instance with your secret
//   const wh = new Webhook(webhookSecret);

//   let evt;

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occurred", {
//       status: 400,
//     });
//   }

//   // Connect to database
//   await connectDB();

//   const { id } = evt.data;
//   const eventType = evt.type;

//   console.log(`Webhook with ID of ${id} and type of ${eventType}`);

//   if (eventType === "user.created") {
//     try {
//       // Create new user in MongoDB
//       const newUser = new userModel({
//         clerkId: evt.data.id,
//         email: evt.data.email_addresses[0]?.email_address,
//         firstName: evt.data.first_name,
//         lastName: evt.data.last_name,
//         username: evt.data.username,
//         imageUrl: evt.data.image_url || "",
//       });

//       await newUser.save();

//       console.log("User created in MongoDB:", newUser._id);

//       return new Response("User created successfully", { status: 200 });
//     } catch (error) {
//       console.error("Error creating user in MongoDB:", error);

//       // Handle duplicate key error (user already exists)
//       if (error.code === 11000) {
//         return new Response("User already exists", { status: 200 });
//       }

//       return new Response("Error creating user", { status: 500 });
//     }
//   }

//   if (eventType === "user.updated") {
//     try {
//       const updatedUser = await userModel.findOneAndUpdate(
//         { clerkId: evt.data.id },
//         {
//           email: evt.data.email_addresses[0]?.email_address,
//           firstName: evt.data.first_name,
//           lastName: evt.data.last_name,
//           username: evt.data.username,
//           imageUrl: evt.data.image_url || "",
//         },
//         { new: true } // return updated document
//       );

//       if (!updatedUser) {
//         console.log("User not found for update, creating new user...");
//         // If user doesn't exist, create them
//         const newUser = new userModel({
//           clerkId: evt.data.id,
//           email: evt.data.email_addresses[0]?.email_address,
//           firstName: evt.data.first_name,
//           lastName: evt.data.last_name,
//           username: evt.data.username,
//           imageUrl: evt.data.image_url || "",
//         });
//         await newUser.save();
//       }

//       console.log("User updated in MongoDB");
//       return new Response("User updated successfully", { status: 200 });
//     } catch (error) {
//       console.error("Error updating user in MongoDB:", error);
//       return new Response("Error updating user", { status: 500 });
//     }
//   }

//   if (eventType === "user.deleted") {
//     try {
//       const deletedUser = await userModel.findOneAndDelete({
//         clerkId: evt.data.id,
//       });

//       if (deletedUser) {
//         console.log("User deleted from MongoDB:", deletedUser._id);
//       } else {
//         console.log("User not found for deletion");
//       }

//       return new Response("User deleted successfully", { status: 200 });
//     } catch (error) {
//       console.error("Error deleting user from MongoDB:", error);
//       return new Response("Error deleting user", { status: 500 });
//     }
//   }

//   return new Response("Webhook received", { status: 200 });
// }

import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    await connectDB();

    if (eventType === "user.created") {
      try {
        // Create new user in MongoDB
        const newUser = new userModel({
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0]?.email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          username: evt.data.username,
          imageUrl: evt.data.image_url || "",
        });

        await newUser.save();

        console.log("User created in MongoDB:", newUser._id);

        return new Response("User created successfully", { status: 200 });
      } catch (error) {
        console.error("Error creating user in MongoDB:", error);

        // Handle duplicate key error (user already exists)
        if (error.code === 11000) {
          return new Response("User already exists", { status: 200 });
        }

        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      try {
        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            email: evt.data.email_addresses[0]?.email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            username: evt.data.username,
            imageUrl: evt.data.image_url || "",
          },
          { new: true } // return updated document
        );

        if (!updatedUser) {
          console.log("User not found for update, creating new user...");
          // If user doesn't exist, create them
          const newUser = new userModel({
            clerkId: evt.data.id,
            email: evt.data.email_addresses[0]?.email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            username: evt.data.username,
            imageUrl: evt.data.image_url || "",
          });
          await newUser.save();
        }

        console.log("User updated in MongoDB");
        return new Response("User updated successfully", { status: 200 });
      } catch (error) {
        console.error("Error updating user in MongoDB:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    if (eventType === "user.deleted") {
      try {
        const deletedUser = await userModel.findOneAndDelete({
          clerkId: evt.data.id,
        });

        if (deletedUser) {
          console.log("User deleted from MongoDB:", deletedUser._id);
        } else {
          console.log("User not found for deletion");
        }

        return new Response("User deleted successfully", { status: 200 });
      } catch (error) {
        console.error("Error deleting user from MongoDB:", error);
        return new Response("Error deleting user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
