import { createHashPassword } from "./../src/utils/bycrypt.util";
import { prisma } from "../src/configs/prismaClient";
import { Provider, Role } from "../generated/prisma/enums";
import slugify from "slugify";

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

    let categoryExist = await prisma.category.findFirst();
    if (categoryExist) {
      console.log("Category Seed Skipped. Categories already exist.");
      return;
    }

    let adminUser = await prisma.user.findFirst({
      where: { role: Role.admin },
    });

    let categorySeedJson: {
      name: string;
      description?: string;
      slug: string;
      createdBy: string;
    }[] = [
      { name: "React JS", slug: "", createdBy: adminUser?.id! },
      { name: "Node Js", slug: "", createdBy: adminUser?.id! },
    ];

    for (let i = 0; i < categorySeedJson.length; i++) {
      let name = categorySeedJson[i]?.name;
      const slug = slugify(name, { lower: true, strict: true, trim: true });
      categorySeedJson[i].slug = slug;
    }

    await prisma.category.createMany({ data: categorySeedJson! });

    console.log(
      "Category Seed Completed.",
      categorySeedJson.length,
      "categories inserted.",
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
