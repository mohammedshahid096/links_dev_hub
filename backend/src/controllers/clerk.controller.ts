import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import config from "../configs/index.config";
import { Webhook } from "svix";
import { UserJSON, WebhookEvent } from "@clerk/backend";
import { User } from "../../generated/prisma/client";
// create category controller
export const clerkWebhookEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("controller - clerk.controller - clerkEventController - start");

    const WEBHOOK_SECRET = config.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      return next(httpErrors.Conflict("Missing webhook secret"));
    }

    // Get the headers from Clerk/Svix
    const svix_id = req.headers["svix-id"] as string;
    const svix_timestamp = req.headers["svix-timestamp"] as string;
    const svix_signature = req.headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing svix headers" });
    }

    let payload = req.body.toString("utf8");
    // Before (broken — req.body is already parsed JSON or Buffer)

    // After (handles both Buffer from express.raw and string fallbacks)
    payload = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body);
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    // Verify the payload
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    // Handle the event
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      console.log(evt);
      const {
        email_addresses,
        primary_email_address_id,
        first_name,
        last_name,
        image_url,
        id,
      } = evt.data as UserJSON;

      // ✅ Find email using primary_email_address_id (more reliable than [0])
      const primaryEmail = email_addresses.find(
        (e) => e.id === primary_email_address_id,
      );

      // Fallback to first email if primary not found
      const email =
        primaryEmail?.email_address ??
        email_addresses[0]?.email_address ??
        null;

      console.log(`Syncing User ${id} to database...`);

      const isUserExist = await prisma.user.findUnique({ where: { email } });

      if (!isUserExist) {
        // const newUser :User = {
        //   name : first_name +" "+ last_name,
        //   email,
        //   profileUrl :
        // }
      }
    }

    logger.info(
      "controller - category.controller - clerkEventController - end",
    );
    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
    });
  } catch (error) {
    logger.error(
      "controller - clerk.controller - clerkEventController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
