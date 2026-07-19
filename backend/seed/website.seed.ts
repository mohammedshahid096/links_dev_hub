import { prisma } from "../src/configs/prismaClient";
import { Category, User, website } from "../generated/prisma/client";
import slugify from "slugify";
import getMetaData from "metadata-scraper";

const websitesList: {
  title: string;
  url: string;
  order: number;
  category: string;
}[] = [
  {
    title: "Crontab.guru - The cron schedule expression generator",
    url: "https://crontab.guru",
    order: 1,
    category: "Developer Tools",
  },
  {
    title: "BuouUI",
    url: "https://buouui.com",
    order: 2,
    category: "UI Components",
  },
  {
    title: "MynaUI - Made with TailwindCSS, shadcn/ui, Radix UI and Figma.",
    url: "https://mynaui.com",
    order: 3,
    category: "UI Components",
  },
  {
    title: "Aceternity UI",
    url: "https://ui.aceternity.com/",
    order: 4,
    category: "UI Components",
  },
  {
    title: "Float UI - Free open source Tailwind UI components & Templates",
    url: "https://floatui.com",
    order: 5,
    category: "UI Components",
  },
  {
    title: "Shadcn Marketing Blocks | Tailark",
    url: "https://tailark.com",
    order: 6,
    category: "UI Components",
  },
  {
    title: "Bytez - open source AI",
    url: "https://bytez.com",
    order: 7,
    category: "AI Tools",
  },
  {
    title: "Easily Ask Your LLM Coding Questions",
    url: "https://uithub.com",
    order: 8,
    category: "AI Tools",
  },
  {
    title: "GroqCloud - Build Fast",
    url: "https://console.groq.com",
    order: 9,
    category: "AI Tools",
  },
  {
    title: "OpenRouter",
    url: "https://openrouter.ai",
    order: 10,
    category: "AI Tools",
  },
  {
    title: "Free for Developers",
    url: "https://free-for.dev",
    order: 11,
    category: "Resources",
  },
  {
    title: "21st.dev: The first vibe-crafting tool",
    url: "https://21st.dev",
    order: 12,
    category: "Design Inspiration",
  },
  {
    title: "AIChief - World's Largest AI Tools Directory",
    url: "https://aichief.com/",
    order: 13,
    category: "AI Tools",
  },
  {
    title: "Devsloka UI | Animated React & Next.js Components",
    url: "https://ui.devsloka.in",
    order: 14,
    category: "UI Components",
  },
  {
    title:
      "Origin UI - Beautiful UI components built with Tailwind CSS and React",
    url: "https://originui.com",
    order: 15,
    category: "UI Components",
  },
  {
    title: "The Best Landing Page Design Inspiration, Templates and More",
    url: "https://www.landingfolio.com",
    order: 16,
    category: "Design Inspiration",
  },
  {
    title: "React Bits",
    url: "https://reactbits.dev",
    order: 17,
    category: "UI Components",
  },
  {
    title: "Magic UI",
    url: "https://magicui.design",
    order: 18,
    category: "UI Components",
  },
  {
    title: "Mamba UI",
    url: "https://mambaui.com",
    order: 19,
    category: "UI Components",
  },
  {
    title: "Image and Video Upload, Storage, Optimization and CDN",
    url: "https://cloudinary.com/",
    order: 20,
    category: "Image Tools",
  },
  {
    title: "Fancy Border Radius Generator",
    url: "https://9elements.github.io/fancy-border-radius/",
    order: 21,
    category: "CSS Tools",
  },
  {
    title: "SVG Viewer",
    url: "https://www.svgviewer.dev/",
    order: 22,
    category: "Icons & Logos",
  },
  {
    title: "Worldvectorlogo: Brand logos free to download",
    url: "https://worldvectorlogo.com",
    order: 23,
    category: "Icons & Logos",
  },
  {
    title: "OverAPI.com | Collecting all the cheat sheets",
    url: "https://overapi.com/",
    order: 24,
    category: "Developer Tools",
  },
  {
    title: "Random User Generator | Photos",
    url: "https://randomuser.me/photos",
    order: 25,
    category: "Mock Data",
  },
  {
    title: "draw.io",
    url: "https://www.drawio.com/",
    order: 26,
    category: "Diagrams",
  },
  {
    title: "drawDB | Online database diagram editor and SQL generator",
    url: "https://drawdb.vercel.app/",
    order: 27,
    category: "Diagrams",
  },
  {
    title: "QuickDatabaseDiagrams.com",
    url: "https://www.quickdatabasediagrams.com",
    order: 28,
    category: "Diagrams",
  },
  {
    title: "cl1p.net - The internet clipboard",
    url: "https://cl1p.net",
    order: 29,
    category: "Productivity",
  },
  {
    title: "Notion (German)",
    url: "https://www.notion.so/de-de",
    order: 30,
    category: "Productivity",
  },
  {
    title: "Online Markdown Editor - Dillinger",
    url: "https://dillinger.io/",
    order: 31,
    category: "Productivity",
  },
  {
    title: "Storyset | Customize, animate and download illustration for free",
    url: "https://storyset.com/",
    order: 32,
    category: "Illustrations",
  },
  {
    title: "Bigjpg - AI Super-Resolution image enlarger",
    url: "https://bigjpg.com",
    order: 33,
    category: "Image Tools",
  },
  {
    title: "Watermark Remover",
    url: "https://www.watermarkremover.io/upload",
    order: 34,
    category: "Image Tools",
  },
  {
    title: "CSS Portal - Generators, Resources, Tools",
    url: "https://www.cssportal.com/",
    order: 35,
    category: "CSS Tools",
  },
  {
    title: "Shape Divider App",
    url: "https://shapedivider.app/",
    order: 36,
    category: "CSS Tools",
  },
  {
    title: "CSS Loader Generator",
    url: "https://10015.io/tools/css-loader-generator",
    order: 37,
    category: "CSS Tools",
  },
  {
    title: "Shortcuts.design",
    url: "http://shortcuts.design",
    order: 38,
    category: "Developer Tools",
  },
  {
    title: "React Icons",
    url: "https://react-icons.github.io/react-icons/",
    order: 39,
    category: "Icons & Logos",
  },
  {
    title: "AWESOME DESIGN.md",
    url: "https://getdesign.md",
    order: 40,
    category: "Resources",
  },
  {
    title: "Terminal UI's",
    url: "https://www.termcn.dev",
    order: 41,
    category: "Terminal & CLI",
  },
  {
    title: "SVGL",
    url: "https://svgl.app/",
    order: 42,
    category: "Icons & Logos",
  },
  {
    title: "Papepr Draw",
    url: "https://paperdraw.dev/",
    order: 43,
    category: "Illustrations",
  },
  {
    title: "It Tools",
    url: "https://it-tools.tech/",
    order: 44,
    category: "Utilities",
  },
  {
    title: "Dot Matrix Loaders",
    url: "https://dotmatrix.zzzzshawn.cloud/",
    order: 45,
    category: "Animations",
  },
];
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

  await websiteSeedingService.websiteSeed(userDetail.id);

  console.log("All seeding operations completed.");
  process.exit(0);
}

startSeedingServer();
