import { prisma } from "../src/configs/prismaClient";
import { Provider, Role } from "../generated/prisma/enums";
import slugify from "slugify";
import categoryJson from "./category.json";

export const seddingCategories = categoryJson;
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
