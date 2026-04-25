import {
  ChatSession,
  ChatMessage as PrismaChatMessage,
} from "../../generated/prisma/client";

export interface ChatSessionWithMessages extends ChatSession {
  messages: PrismaChatMessage;
}
