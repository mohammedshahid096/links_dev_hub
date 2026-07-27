import { prisma } from "../src/configs/prismaClient";
import { Provider, Role } from "../generated/prisma/enums";
import slugify from "slugify";

export const seddingCategories = [
  {
    name: "UI Components",
    description:
      "Reusable UI component libraries, templates, and design systems for modern web development.",
  },
  {
    name: "Design Inspiration",
    description:
      "Collections of landing pages, website designs, and UI inspiration for designers and developers.",
  },
  {
    name: "AI Tools",
    description:
      "AI platforms, LLM providers, AI-powered developer tools, and AI directories.",
  },
  {
    name: "Developer Tools",
    description:
      "General utilities, cheat sheets, automation tools, and resources for software developers.",
  },
  {
    name: "CSS Tools",
    description:
      "Generators and utilities for CSS, animations, layouts, and styling.",
  },
  {
    name: "Icons & Logos",
    description:
      "Icon libraries, SVG collections, brand logos, and vector assets.",
  },
  {
    name: "Image Tools",
    description:
      "Image optimization, editing, upscaling, storage, CDN, and media processing tools.",
  },
  {
    name: "Illustrations",
    description:
      "Illustrations, graphics, and visual assets for websites, apps, and presentations.",
  },
  {
    name: "Productivity",
    description:
      "Tools for note-taking, markdown editing, clipboard sharing, and personal productivity.",
  },
  {
    name: "Diagrams",
    description:
      "Tools for creating flowcharts, architecture diagrams, ER diagrams, and database models.",
  },
  {
    name: "Resources",
    description:
      "Curated collections of developer resources, free services, documentation, and learning materials.",
  },
  {
    name: "Utilities",
    description:
      "Helpful online utilities for everyday development and design tasks.",
  },
  {
    name: "Mock Data",
    description:
      "Tools for generating fake users, sample data, and test datasets.",
  },
  {
    name: "Terminal & CLI",
    description:
      "Terminal-inspired UI components, command-line resources, and CLI tools.",
  },
  {
    name: "Animations",
    description:
      "Animation libraries, loading effects, transitions, and interactive UI elements.",
  },
  {
    name: "API Tools",
    description:
      "Tools for API testing, REST/GraphQL clients, WebSocket testing, API documentation, mocking, and development.",
  },
];
class SeedingService {
  constructor() {}

  async userSeed() {
    console.log("User Seed Started...");

    let usersExist = await prisma.user.findFirst();
    if (usersExist) {
      console.log("User Seed Skipped. Users already exist.");
      return;
    }

    let usersSeedJson: {
      name: string;
      email: string;
      role: Role;
      clerkId: string;
      provider: Provider;
      profileUrl?: string;
    }[] = [
      {
        clerkId: "random_clerk_id",
        name: "admin",
        email: "admin@gmail.com",
        role: "admin",
        provider: Provider.GOOGLE,
        profileUrl: "https://random_imgurl",
      },
    ];

    console.log("Inserting users...");

    await prisma.user.createMany({ data: usersSeedJson });

    console.log(
      "User Seed Completed.",
      usersSeedJson.length,
      "users inserted.",
    );
  }

  async categorySeed() {
    console.log("Category Seed Started...");

    let adminUser = await prisma.user.findFirst({
      where: { role: Role.admin },
    });

    let categorySeedJson: {
      name: string;
      description?: string;
      slug: string;
      createdBy: string;
    }[] = seddingCategories.map((category) => {
      const slug = slugify(category.name, { lower: true, strict: true });
      return {
        ...category,
        slug,
        createdBy: adminUser?.id!,
      };
    });

    let addedCount = 0;

    for (let i = 0; i < categorySeedJson?.length; i++) {
      let currentCategory = categorySeedJson[i];
      console.log(i, " processing for the", currentCategory?.name);
      let isCategoryExist = await prisma.category.findUnique({
        where: { slug: currentCategory?.slug },
      });
      if (isCategoryExist) {
        console.log("ignoring already exist");
      } else {
        await prisma.category.create({ data: currentCategory });
        addedCount++;
      }
    }

    console.log(
      "Category Seed Completed. Total : ",
      categorySeedJson.length,
      "categories inserted.",
      addedCount,
    );
  }
}

async function startSeedingServer(): Promise<void> {
  const seedingService = new SeedingService();
  // ----------------------
  // User Seed
  // ----------------------
  await seedingService.userSeed();

  // ----------------------
  // Category Seed
  // ----------------------
  await seedingService.categorySeed();

  console.log("All seeding operations completed.");
  process.exit(0);
}

startSeedingServer();
