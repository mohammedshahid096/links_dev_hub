import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { prisma } from "../configs/prismaClient";

const fetchWebsitesSchema = z.object({
  query: z
    .string()
    .describe(
      "Search query to find relevant websites. Will be matched against title, keywords, and tags.",
    ),
  limit: z
    .number()
    .optional()
    .default(10)
    .describe("Maximum number of results to return. Defaults to 10."),
});

type FetchWebsitesInput = z.infer<typeof fetchWebsitesSchema>;

const fetchWebsitesTool = new DynamicStructuredTool({
  name: "fetchWebsitesTool",
  description:
    "Use this tool to search and fetch relevant developer websites, tools, libraries, and resources from the DevLinks database. Search is performed across title, keywords, and tags.",

  schema: fetchWebsitesSchema,

  func: async ({ query, limit = 10 }: FetchWebsitesInput): Promise<string> => {
    try {
      const searchTerms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0);

      const websites = await prisma.website.findMany({
        where: {
          isActive: true,
          OR: [
            // Title search — partial match on each term
            ...searchTerms.map((term) => ({
              title: {
                contains: term,
                mode: "insensitive" as const,
              },
            })),
            // Keywords array search — check if any keyword matches any term
            ...searchTerms.map((term) => ({
              keywords: {
                hasSome: [term],
              },
            })),
            // Tags array search — check if any tag matches any term
            ...searchTerms.map((term) => ({
              tags: {
                hasSome: [term],
              },
            })),
          ],
        },
        select: {
          title: true,
          description: true,
          url: true,
          imageUrl: true,
          category: {
            select: {
              id: true,
              name: true, // adjust to your actual Category field name
            },
          },
        },
        take: limit,
        orderBy: {
          created_at: "desc",
        },
      });

      if (websites.length === 0) {
        return JSON.stringify({
          success: true,
          message: `No websites found for query: "${query}". Try broader search terms or browse by category.`,
          data: [],
          count: 0,
        });
      }

      return JSON.stringify({
        success: true,
        message: `Found ${websites.length} website(s) for query: "${query}"`,
        data: websites,
        count: websites.length,
      });
    } catch (error: any) {
      return JSON.stringify({
        success: false,
        message: "Failed to fetch websites from the database",
        error: error.message,
        data: [],
        count: 0,
      });
    }
  },
});

export default fetchWebsitesTool;
