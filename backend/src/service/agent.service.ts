import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";
import {
  HumanMessage,
  AIMessage,
  BaseMessage,
  ChatMessage,
} from "@langchain/core/messages";
import { StructuredTool } from "@langchain/core/tools";
import { gemini_model_names } from "../constants/gemini.constant";
import {
  ChatMessage as PrismaChatMessage,
  ChatSession,
} from "../../generated/prisma/client";
import fetchWebsitesTool from "../tools/fetchWebsitesTool.tool";

interface AgentServiceConfig {
  maxOutputTokens?: number;
  temperature?: number;
  sessionId?: string | null;
  historyCount?: number;
}

interface ProcessRequestResponse {
  output: string;
  messages: BaseMessage[];
}

class AgentService {
  private maxOutputTokens: number;
  private temperature: number;
  private sessionId: string | null;
  private historyCount: number;
  private systemPrompt: string;
  private googleModel: ChatGoogleGenerativeAI;
  private agentTools: StructuredTool[];

  constructor({
    maxOutputTokens = 500,
    temperature = 0.7,
    sessionId = null,
    historyCount = 6,
  }: AgentServiceConfig = {}) {
    this.maxOutputTokens = maxOutputTokens;
    this.temperature = temperature;
    this.sessionId = sessionId;
    this.historyCount = historyCount;
    this.systemPrompt = `You are DevLinks Assistant, a smart and developer-friendly AI agent for the DevLinks platform.

  DevLinks is a curated resource hub for developers — it provides categorized links to useful websites, tools, libraries, UI component libraries, design systems, documentation, APIs, developer utilities, and more.

  Your primary role is to help developers find the right resources and links based on their needs.

  ## Your Capabilities
  - Understand what kind of resource the developer is looking for (e.g., "UI components", "CSS frameworks", "icon libraries", "API testing tools", "backend frameworks", etc.)
  - Use available tools to search and fetch relevant links from the DevLinks database
  - Present fetched links in a clean, readable format with a brief description of each resource
  - Suggest categories or alternatives if an exact match isn't found
  - Answer general questions about the platform (how to use DevLinks, how to save links, navigation, account, etc.)

  ## Behavior Guidelines
  - Always try to use the available tools to fetch real links from the database before responding
  - If a user's query is vague (e.g., "give me some tools"), ask a clarifying question to narrow down their need (e.g., "Are you looking for frontend component libraries, backend tools, or something else?")
  - Present links in a structured format:
    - 🔗 **Resource Name** — Brief one-line description — [Visit](url)
  - If no relevant links are found in the database, let the user know and suggest they browse a related category on DevLinks
  - Keep responses concise, scannable, and developer-friendly
  - Avoid unnecessary filler text — developers appreciate directness

  ## Examples of queries you handle
  - "I need a React component library"
  - "Show me tools for API testing"
  - "Any good CSS animation libraries?"
  - "Where can I find free developer icons?"
  - "I need a database ORM for Node.js"

If a query is outside the scope of DevLinks (e.g., personal coding help, debugging code), politely clarify your role and redirect them to the right resource.`;

    this.googleModel = new ChatGoogleGenerativeAI({
      model: gemini_model_names["gemini-2.5-flash-lite"],
      maxOutputTokens: this.maxOutputTokens,
      temperature: this.temperature,
    });

    this.agentTools = [fetchWebsitesTool];
  }

  private buildMessageHistory(
    history: PrismaChatMessage[] = [],
  ): BaseMessage[] {
    const recentHistory = history.slice(-this.historyCount);

    return recentHistory.map((message) => {
      if (message?.role === "user") {
        return new HumanMessage(message.content ?? "");
      }
      return new AIMessage(message.content ?? "");
    });
  }

  async processRequest(
    input: string = "",
    sessionData: ChatSession & { messages: PrismaChatMessage[] },
    context: string = "",
  ): Promise<ProcessRequestResponse> {
    try {
      const systemPromptWithContext = context
        ? `${this.systemPrompt}
      ---
      Here is the relevant context from the website to help answer the user's query:
      ${context}
      ---
      Use this context to provide accurate, website-specific answers. If the context doesn't contain the answer, rely on your general knowledge.`
        : this.systemPrompt;

      const agent = createAgent({
        model: this.googleModel,
        tools: this.agentTools,
        systemPrompt: systemPromptWithContext,
      });

      const messageHistory = this.buildMessageHistory(sessionData?.messages);

      const response = await agent.invoke({
        messages: [...messageHistory, new HumanMessage(input)],
      });

      const lastMessage = response.messages[response.messages.length - 1];

      return {
        output: lastMessage?.content as string,
        messages: response.messages,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AgentService;
