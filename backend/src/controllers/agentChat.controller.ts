import { Request, Response, NextFunction } from "express";
import errorHandling, { AppError } from "../utils/errorHandling.util";
import responseHandlingUtil from "../utils/responseHandling.util";
import { prisma } from "../configs/prismaClient";
import logger from "../configs/logger.config";

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

// export const agentChatController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { sessionId } = req.params;
//     const { inputMessage } = req.body;

//     const chatDetails = await agentChatModel.findById(sessionId).lean();

//     if (!chatDetails) {
//       return next(httpError.NotFound("Session Details not found"));
//     }

//     const userTimestamp = new Date();

//     const agentService = new AgentService({
//       sessionId: chatDetails._id.toString(),
//     });

//     const embeddings = new GoogleGenerativeAIEmbeddings({
//       model: embeddings_model_names["gemini-embedding-001"], // 768 dimensions
//       apiVersion: "v1",
//     } as any);

//     const chromaService = new ChromaService({
//       collectionName: WEB_COLLECTION_NAME,
//       embeddings,
//     });

//     const chromaQueryData = await chromaService.query(inputMessage);
//     const context = chromaQueryData.map((doc) => doc.pageContent).join("\n\n");

//     const aiResponse = await agentService.processRequest(
//       inputMessage,
//       chatDetails,
//       context,
//     );
//     const tokenUsage = aiResponse.messages?.[aiResponse.messages.length - 1]
//       ?.response_metadata?.tokenUsage as any;

//     const newMessageData: IMessage[] = [
//       {
//         content: inputMessage || "",
//         role: "human",
//         timestamp: userTimestamp,
//       },
//       {
//         content: aiResponse.output || "",
//         role: "ai",
//         timestamp: new Date(),
//         tokenUsage: {
//           input_tokens: tokenUsage?.promptTokens || 0,
//           output_tokens: tokenUsage?.completionTokens || 0,
//           total_tokens: tokenUsage?.totalTokens || 0,
//         },
//       },
//     ];

//     const updatedDetails = await agentChatModel.findByIdAndUpdate(
//       sessionId,
//       { $push: { messages: newMessageData } },
//       { new: true },
//     );

//     responseHandlingUtil.successResponseStandard(res, {
//       data: updatedDetails,
//       otherData: { aiResponse, aiMessage: aiResponse.output },
//     });
//   } catch (error) {
//     errorHandling.handlingControllersError(error as AppError, next);
//   }
// };
