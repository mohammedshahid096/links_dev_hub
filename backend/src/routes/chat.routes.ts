import { Router } from "express";
import { createNewChatSessionController } from "../controllers/agentChat.controller";

const chatRoutes = Router();

chatRoutes.route("/new-session").post(createNewChatSessionController);

// chatRoutes.route("/:sessionId/chat-agent").post(agentChatController);

// chatRoutes
//   .route("/:sessionId/session-details")
//   .get();

export default chatRoutes;
