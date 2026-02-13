import { Request, Response, NextFunction } from "express";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import httpErrors from "http-errors";
import config from "../configs/index.config";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/backend";
// create category controller
export const clerkWebhookEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("controller - clerk.controller - clerkEventController - start");

    console.log(req.body);

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

    const payload = req.body.toString();
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
      const { email_addresses, first_name, last_name, image_url } = evt.data;
      const email = email_addresses[0].email_address;

      console.log(`Syncing User ${id} to database...`);
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
