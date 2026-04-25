import httpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";
import AgentService from "../service/agent.service";

export const createNewChatSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info(
      "controller - agentChat.controller - createNewChatSessionController - start",
    );

    const newSession = await prisma.chatSession.create({
      data: {},
      include: { messages: true },
    });

    logger.info(
      "controller - agentChat.controller - createNewChatSessionController - end",
    );

    responseHandlingUtil.successResponseStandard(res, {
      statusCode: 200,
      message: "session details fetched successfully",
      data: newSession,
    });
  } catch (error) {
    logger.error(
      "controller - agentChat.controller - createNewChatSessionController - error",
      error,
    );
    errorHandling.handlingControllersError(error as AppError, next);
  }
};

export const agentChatController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sessionId } = req.params;
    const { inputMessage } = req.body;

    // fetch session with message history
    const chatDetails = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: true },
    });

    if (!chatDetails) {
      return next(httpError.NotFound("Session Details not found"));
    }

    const userTimestamp = new Date();

    // process the request through agent
    const agentService = new AgentService({
      sessionId: chatDetails.id,
    });

    const aiResponse = await agentService.processRequest(
      inputMessage,
      chatDetails,
    );

    const lastMessage = aiResponse.messages?.[aiResponse.messages.length - 1];
    const tokenUsage = (lastMessage?.response_metadata as any)?.tokenUsage;

    // save user message + assistant message in one transaction
    const [userMessage, assistantMessage] = await prisma.$transaction([
      prisma.chatMessage.create({
        data: {
          content: inputMessage || "",
          role: "user",
          timestamp: userTimestamp,
          sessionId,
        },
      }),
      prisma.chatMessage.create({
        data: {
          content: aiResponse.output || "",
          role: "assistant",
          timestamp: new Date(),
          inputTokens: tokenUsage?.promptTokens || 0,
          outputTokens: tokenUsage?.completionTokens || 0,
          totalTokens: tokenUsage?.totalTokens || 0,
          sessionId,
        },
      }),
    ]);

    // update session updatedAt so sidebar can sort by latest activity
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updated_at: new Date() },
    });

    return responseHandlingUtil.successResponseStandard(res, {
      data: {
        userMessage,
        assistantMessage,
      },
      otherData: {
        aiResponse,
        aiMessage: aiResponse.output,
      },
    });
  } catch (error) {
    errorHandling.handlingControllersError(error as AppError, next);
  }
};
