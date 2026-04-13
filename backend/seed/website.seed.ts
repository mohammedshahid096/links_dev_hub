import { prisma } from "../src/configs/prismaClient";
import { Category, User, website } from "../generated/prisma/client";
import slugify from "slugify";
import getMetaData from "metadata-scraper";

const websitesList = [
  {
    title: "Crontab.guru - The cron schedule expression generator",
    url: "https://crontab.guru",
  },
  { title: "BuouUI", url: "https://buouui.com" },
  {
    title: "MynaUI - Made with TailwindCSS, shadcn/ui, Radix UI and Figma.",
    url: "https://mynaui.com",
  },
  { title: "Aceternity UI", url: "https://ui.aceternity.com/" },
  {
    title: "Float UI - Free open source Tailwind UI components & Templates",
    url: "https://floatui.com",
  },
  { title: "Shadcn Marketing Blocks | Tailark", url: "https://tailark.com" },
  { title: "Bytez - open source AI", url: "https://bytez.com" },
  { title: "Easily Ask Your LLM Coding Questions", url: "https://uithub.com" },
  { title: "GroqCloud - Build Fast", url: "https://console.groq.com" },
  { title: "OpenRouter", url: "https://openrouter.ai" },
  { title: "Free for Developers", url: "https://free-for.dev" },
  { title: "21st.dev: The first vibe-crafting tool", url: "https://21st.dev" },
  {
    title: "AIChief - World's Largest AI Tools Directory",
    url: "https://aichief.com/",
  },
  {
    title: "Devsloka UI | Animated React & Next.js Components",
    url: "https://ui.devsloka.in",
  },
  {
    title:
      "Origin UI - Beautiful UI components built with Tailwind CSS and React",
    url: "https://originui.com",
  },
  {
    title: "The Best Landing Page Design Inspiration, Templates and More",
    url: "https://www.landingfolio.com",
  },
  { title: "React Bits", url: "https://reactbits.dev" },
  { title: "Magic UI", url: "https://magicui.design" },
  { title: "Mamba UI", url: "https://mambaui.com" },
  {
    title: "Image and Video Upload, Storage, Optimization and CDN",
    url: "https://cloudinary.com/",
  },
  {
    title: "Fancy Border Radius Generator",
    url: "https://9elements.github.io/fancy-border-radius/",
  },
  { title: "SVG Viewer", url: "https://www.svgviewer.dev/" },
  {
    title: "Worldvectorlogo: Brand logos free to download",
    url: "https://worldvectorlogo.com",
  },
  {
    title: "OverAPI.com | Collecting all the cheat sheets",
    url: "https://overapi.com/",
  },
  {
    title: "Random User Generator | Photos",
    url: "https://randomuser.me/photos",
  },
  { title: "draw.io", url: "https://www.drawio.com/" },
  {
    title: "drawDB | Online database diagram editor and SQL generator",
    url: "https://drawdb.vercel.app/",
  },
  {
    title: "QuickDatabaseDiagrams.com",
    url: "https://www.quickdatabasediagrams.com",
  },
  { title: "cl1p.net - The internet clipboard", url: "https://cl1p.net" },
  { title: "Notion (German)", url: "https://www.notion.so/de-de" },
  { title: "Online Markdown Editor - Dillinger", url: "https://dillinger.io/" },
  {
    title: "Storyset | Customize, animate and download illustration for free",
    url: "https://storyset.com/",
  },
  {
    title: "Bigjpg - AI Super-Resolution image enlarger",
    url: "https://bigjpg.com",
  },
  { title: "Watermark Remover", url: "https://www.watermarkremover.io/upload" },
  {
    title: "CSS Portal - Generators, Resources, Tools",
    url: "https://www.cssportal.com/",
  },
  { title: "Shape Divider App", url: "https://shapedivider.app/" },
  {
    title: "CSS Loader Generator",
    url: "https://10015.io/tools/css-loader-generator",
  },
  { title: "Shortcuts.design", url: "http://shortcuts.design" },
  { title: "Magic UI", url: "https://magicui.design/" },
  { title: "React Icons", url: "https://react-icons.github.io/react-icons/" },
];
class WebsiteSeedingService {
  constructor() {}

  async fetchFirstCategory(): Promise<Category | null> {
    console.log("-------- started fetching the first category --------");
    const data = await prisma.category.findFirst();

    if (data) {
      console.log("category found, Id:", data.id, data.name);
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

  async websiteSeed(userId: string, categoryId: string) {
    const processedData: website[] = [];

    for (let index = 0; index < websitesList.length; index++) {
      const element = websitesList[index];
      const { url, title } = element;
      console.log(index, "processing for the ", url);

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
        } catch (error) {
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

  await websiteSeedingService.websiteSeed(userDetail.id, categoryDetail.id);

  console.log("All seeding operations completed.");
  process.exit(0);
}

startSeedingServer();
