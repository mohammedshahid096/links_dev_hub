import { Router } from "express";
import {
  agentChatController,
  createNewChatSessionController,
  getSessionDetailsController,
} from "../controllers/agentChat.controller";

const chatRoutes = Router();

chatRoutes.route("/new-session").post(createNewChatSessionController);

chatRoutes.route("/:sessionId/chat-agent").post(agentChatController);

chatRoutes
  .route("/:sessionId/session-details")
  .get(getSessionDetailsController);

export default chatRoutes;
