import { prisma } from "../src/configs/prismaClient";
import { Category, User, website } from "../generated/prisma/client";
import slugify from "slugify";
import getMetaData from "metadata-scraper";
import websiteJson from "./websites.json";

const websitesList: {
  title: string;
  url: string;
  order: number;
  category: string;
}[] = websiteJson;
class WebsiteSeedingService {
  categoryList: Category[];
  constructor() {
    this.categoryList = [];
  }

  async fetchFirstCategory(): Promise<Category[]> {
    console.log("-------- started fetching the  category list --------");
    const data = await prisma.category.findMany();
    this.categoryList = data;

    if (data?.length > 0) {
      console.log("category found, total:", data.length);
    } else {
      console.log("category not found");
      console.log("process is exiting");
      process.exit(0);
    }
    return data;
  }

  async fetchFirstAdminUser(): Promise<User> {
    console.log("-------- started fetching the first admin user role --------");
    const data = await prisma.user.findFirst({ where: { role: "admin" } });
    if (data) {
      console.log("admin user found, Id:", data.id, data.name);
    } else {
      console.log("admin user not found");
      console.log("process is exiting");
      process.exit(0);
    }
    return data;
  }

  async websiteSeed(userId: string) {
    const processedData: website[] = [];

    for (let index = 0; index < websitesList.length; index++) {
      const element = websitesList[index];
      const { url, category } = element;

      let categoryId = this.categoryList.find(
        (cat) => cat.name === category,
      )?.id;
      if (!categoryId) {
        console.log("category not found for the website:", url);
        continue;
      }
      console.log(index, "processing for the ", url, "category", category);

      let slug = url.replace(/https?:\/\//, "");
      slug = slugify(slug, { lower: true, strict: true });

      const isdWebsiteExist = await prisma.website.findFirst({
        where: { OR: [{ url }, { slug }] },
      });

      if (isdWebsiteExist) {
        console.log("ignoring already exist", slug);
      } else {
        try {
          const metadata = await getMetaData(url);
          const details = {
            scrapedData: metadata,
            title: metadata?.title || "",
            slug: slug,
            url: metadata?.url || url,
            description: metadata?.description || "",
            isActive: true,
            sourceType: metadata?.type || "website",
            keywords: metadata?.keywords || [],
            imageUrl: metadata?.image || "",
            iconUrl: metadata?.icon || "",
            categoryId,
            created_by: userId,
          };

          const addedWebsiteDetails = await prisma.website.create({
            data: details,
          });

          processedData.push(addedWebsiteDetails);
        } catch (error: any) {
          console.log(error);
        }
      }
    }

    console.log(
      "Website Seed Completed.",
      processedData.length,
      "Website inserted.",
    );
  }
}

async function startSeedingServer(): Promise<void> {
  const websiteSeedingService = new WebsiteSeedingService();

  const categoryDetail = await websiteSeedingService.fetchFirstCategory();
  const userDetail = await websiteSeedingService.fetchFirstAdminUser();

  if (!categoryDetail || !userDetail) {
    console.log("category or admin user not found");
    return;
  }

  await websiteSeedingService.websiteSeed(userDetail.id);

  console.log("All seeding operations completed.");
  process.exit(0);
}

startSeedingServer();
